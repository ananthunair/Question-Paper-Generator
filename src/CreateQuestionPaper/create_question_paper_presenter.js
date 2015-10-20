var lodash  = require('lodash');

exports.Presenter = function (view, questions_repo,paper_repo) {
    this.view = view;
    this.repo = questions_repo;
    this.paper_repo = paper_repo;
    this.questionPaper =[];
    this.notes  = {};
}

var generateQuestionPaper = function(questionPaper,view) {
    return {
        questions: questionPaper.map(getQuestionIdAndNote),
        header: {title: view.getQuestionPaperTitle(), marks: "", duration: ""}
    };
}
exports.Presenter.prototype = {


    onDocumentReady:function(){
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            presenter.view.showQuestions(questions);
        };
        this.repo.fetchQuestions(onComplete);
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
        view.deleteSelectedQuestions();
        view.addToQuestionPaper(this.questionPaper,this.notes);
        view.showTotalNumberOfQuestion(this.questionPaper.length)
    },

    onSaveClick : function() {
        var view = this.view;
        if(view.title()){
            var onComplete = function (err,paper) {
                view.renderDashbord(paper.id);
            };
            var questionPaper = generateQuestionPaper(this.questionPaper,view);
            this.paper_repo.saveQuestionPaper(questionPaper,onComplete);
        }else
            view.showError("questionPaperTitle");
    },

    onPreviewClick:function(){
        var view = this.view;
        this.view.openPreview(this.questionPaper,view.getQuestionPaperTitle());
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
        var questionsToShow = lodash.difference(this.all_questions,this.questionPaper);
        this.view.showQuestions(questionsToShow);
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
        this.notes[id]="";
    }
    ,
    onSaveNotes:function(id,note) {
        this.notes[id] =note;
    }
};

var getQuestionIdAndNote = function(question){
       return {id:question.id,note : question.note};
};
var difference = function(questionInPaper,allQuestion){

    var questionInPaperId = questionInPaper.map(extractId);
   return allQuestion.filter(function(question){
       return questionInPaperId.indexOf(question.id.toString())<0;
   })
};

var extractId =function(question){
    return question.id.toString();
}