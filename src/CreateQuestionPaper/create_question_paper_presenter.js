var lodash  = require('lodash');

exports.Presenter = function (view, questions_repo,paper_repo) {
    this.view = view;
    this.repo = questions_repo;
    this.paper_repo = paper_repo;
    this.questionPaper =[];
    this.notes  = {};
    this.paperId = {};
}


exports.Presenter.prototype = {


    onDocumentReady:function(extraArgs){
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            presenter.view.showQuestions(questions);
        };
        this.repo.fetchQuestions(onComplete);
        if(Object.keys(extraArgs).length){
            this.loadPaperInEditMode(extraArgs);
        }
    },

    loadPaperInEditMode : function(paperContents){
        this.questionPaper = paperContents.questions.map(extractQuestion);
        this.notes = paperContents.notes ? paperContents.notes : {};
        this.view.addToQuestionPaper(this.questionPaper,this.notes);
        this.view.setPaperTitle(paperContents.title);
        this.paperId = paperContents.paperId;
        this.view.showEditMode();
    },

    generateQuestionPaper : function(questionPaper,view) {
        return {
            notes : this.notes,
            questions: questionPaper.map(extractId),
            header: {title: view.getQuestionPaperTitle(), marks: "", duration: ""}
        };
    },

    onAddOrRemoveTag :  function(tags){
            var presenter =  this;
            var onComplete = function(err,questions){
                presenter.all_questions = difference(presenter.questionPaper,questions);

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
    }
};


var difference = function(questionInPaper,allQuestion){

    var questionInPaperId = questionInPaper.map(extractId);
   return allQuestion.filter(function(question){
       return questionInPaperId.indexOf(question.id.toString())<0;
   })
};

var extractId =function(question){
    return question.id.toString();
};
var extractQuestion = function(questionObject){
    return {'id':questionObject._doc._id,'question':questionObject._doc.question};
};