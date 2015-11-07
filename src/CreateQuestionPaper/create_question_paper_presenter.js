var lodash=require('lodash');
exports.Presenter = function (view, questions_repo,paper_repo) {
    this.view = view;
    this.repo = questions_repo;
    this.paper_repo = paper_repo;
    this.questionPaper =[];
    this.notes  = {};
    this.paperId = {};
}


exports.Presenter.prototype = {
    onDocumentReady:function(paperId){
        var presenter =  this;
        var onCompleteOfFetchPaper = function(err,paper){
            presenter.showQuestions(paper);
        }
        if(paperId){
            this.paperId = paperId;
            this.paper_repo.getPaper(paperId,onCompleteOfFetchPaper);
        }
        else
            presenter.showQuestions({});

    },
    showQuestions : function(paper){
        var presenter =  this;
        var onComplete = function(err,questions,paper){
            presenter.all_questions = questions;
            if(Object.keys(paper).length){
                presenter.all_questions = difference(paper.questions,questions);
                var questionsOfPaper = getQuestionsOfPaper(paper.questions,questions);
                presenter.loadPaperInEditMode(paper,questionsOfPaper);
            }
            presenter.view.showQuestions(presenter.all_questions);
        };
        this.repo.fetchQuestions(onComplete,paper);
    },

    loadPaperInEditMode : function(paperContents,questionOfPaper){
        this.questionPaper = questionOfPaper;
        this.notes = paperContents.notes ? paperContents.notes : {};
        this.view.addToQuestionPaper(this.questionPaper,this.notes);
        this.view.setPaperTitle(paperContents.header.title);
        this.view.showEditMode();
        this.view.showTotalNumberOfQuestion(this.questionPaper.length);
    },

    generateQuestionPaper : function(questionPaper,view) {
        return {
            notes : this.notes,
            questions: questionPaper.map(extractId),
            tags:getTagsForPaper(questionPaper),
            header: {title: view.getQuestionPaperTitle(), marks: "", duration: ""}
        };
    },

    onAddOrRemoveTag :  function(tags){
            var presenter =  this;
            var onComplete = function(err,questions){
                var questionPaperIds = presenter.questionPaper.map(extractId);
                presenter.all_questions = difference(questionPaperIds,questions);

                presenter.view.showQuestions(presenter.all_questions);
            };
            this.repo.fetchQuestionsOfSpecificTags(tags,onComplete);
        },

    onAddClick : function(){
        var view = this.view;
        var selectedIds = view.getSelectedQuestions();

        function isSelected(question){
            return selectedIds.indexOf(question.id.toString()) != -1;
        }
        var questionsToAddInPaper = this.all_questions.filter(isSelected);
        this.questionPaper = this.questionPaper.concat(questionsToAddInPaper);
        view.addToQuestionPaper(this.questionPaper,this.notes);
        view.showTotalNumberOfQuestion(this.questionPaper.length);
        this.onAddOrRemoveTag(this.view.getTags());
    },

    onSaveClick : function() {
        var view = this.view;
        if(view.title()){
            var onComplete = function (err,paper) {
                view.renderDashbord(paper.id);
            };
            var questionPaper = this.generateQuestionPaper(this.questionPaper,view);
            this.paper_repo.saveQuestionPaper(questionPaper,onComplete);
        }else
            view.showError("questionPaperTitle");
    },

    onUpdateClick : function(){
        var view = this.view;
        if(view.title()){
            var onComplete = function (err,paper) {
                view.renderDashbord(paper.id);
            };
            var questionPaper = this.generateQuestionPaper(this.questionPaper,view);

            this.paper_repo.updateQuestionPaper(this.paperId,questionPaper,onComplete);
        }else
            view.showError("questionPaperTitle");
    },

    onPreviewClick:function(){
        var view = this.view;
        this.view.openPreview(this.questionPaper,this.notes,view.getQuestionPaperTitle());
    },

    setAutosuggetions : function(){
        var view = this.view;
        this.repo.getUniqueTags(function (err,tags) {
            if(!err)
                view.setupTagBoxData(tags);
        });
    },

    onRemoveQuestion : function(id){
        this.questionPaper = this.questionPaper.filter(function(question){
            return question.id != id;
        });
        this.view.addToQuestionPaper(this.questionPaper,this.notes);
        this.onAddOrRemoveTag(this.view.getTags());
        this.view.showTotalNumberOfQuestion(this.questionPaper.length);
    },
    onNewQuestionAdded:function(){
        var presenter =this;
            this.onAddOrRemoveTag(this.view.getTags())
        this.repo.getUniqueTags(function(err,tags){
            presenter.view.addSuggetions(tags)
        });
    },
    onRemoveNotes:function(id){
       delete this.notes[id];
    }
    ,
    onSaveNotes:function(id,note) {
        this.notes[id] =note;
    },

    OnUpQuestions : function(questionIds,indexToMove){
        var questionsOfPaper = this.questionPaper;
        firstIndexOfThirdPart = indexToMove ? indexToMove :questionIds[0]-1;
        var firstPart = questionsOfPaper.slice(0,firstIndexOfThirdPart);
        var secondPart = questionIds.map(function(index) {return questionsOfPaper[index]});
        var thirdPart = this.questionPaper.filter(function(question){
            return firstPart.indexOf(question)<0 && secondPart.indexOf(question)<0
        });
        this.questionPaper = firstPart.concat(secondPart).concat(thirdPart);
        this.view.addToQuestionPaper(this.questionPaper,this.notes);
    },

    OnDownQuestions : function(questionIds,indexToMove){
        var questionsOfPaper = this.questionPaper;
        var lastQuestion = (indexToMove==(this.questionPaper.length-1) && questionIds.length>1);

        firstIndexOfThirdPart = indexToMove ? indexToMove+1 : questionIds[questionIds.length-1]+2;
        var thirdPart = questionsOfPaper.slice(firstIndexOfThirdPart);
        var secondPart = questionIds.map(function(index) {return questionsOfPaper[index]});
        var firstPart = this.questionPaper.filter(function(question){
            return thirdPart.indexOf(question)<0 && secondPart.indexOf(question)<0
        });
        this.questionPaper = lastQuestion ? firstPart.concat(secondPart) : firstPart.concat(secondPart).concat(thirdPart);
        this.view.addToQuestionPaper(this.questionPaper,this.notes);
    },

    onMoveQuestion : function(questionIds){
        var movingPosition = this.view.getDestinationPosition();
        if(movingPosition>questionIds[0]){
            this.OnDownQuestions(questionIds,movingPosition)
        }
        else{
            this.OnUpQuestions(questionIds,movingPosition);
        }
    }

};


var difference = function(questionsId,allQuestion){

   return allQuestion.filter(function(question){
       return questionsId.indexOf(question.id.toString())<0;
   })
};

var getQuestionsOfPaper = function(questionsId,allQuestion){

    return allQuestion.filter(function(question){
        return questionsId.indexOf(question.id.toString())>=0;
    })
};
var getTagsForPaper=function(questionPaper){
    var alltags= questionPaper.reduce(function(tags,question){
        return lodash.union(tags,question.tags)
    },[]);
    return alltags;
}


var extractId =function(question){
    return question.id.toString();
};
