var lodash  = require('lodash');

exports.Presenter = function (view, questions_repo,paper_repo) {
    this.view = view;
    this.repo = questions_repo;
    this.paper_repo = paper_repo;
    this.questionPaper =[];
}

exports.Presenter.prototype = {


    onDocumentReady:function(){
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            presenter.view.showQuestions(questions);
            //presenter.view.addQuestionSelectionListener();
        };
        this.repo.fetchQuestions(onComplete);
    },

    onAddOrRemoveTag :  function(tags){
            var presenter =  this;
            var onComplete = function(err,questions){
                presenter.all_questions = difference(presenter.questionPaper,questions);

                presenter.view.showQuestions(presenter.all_questions);
                presenter.view.addQuestionSelectionListener();
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
        view.addToQuestionPaper(this.questionPaper);
        view.showTotalNumberOfQuestion(this.questionPaper.length)
    },

    onSaveClick : function() {
        var view = this.view;
        console.log("title is",view.title);
        if(view.title()){
            var onComplete = function (err) {
                err ? view.showErrorMessage() : view.showSuccessMessage();
            };
            var questionPaper = {
                questions : getQuestionIds(this.questionPaper),
                header : {title:this.view.getQuestionPaperTitle() , marks : "" ,duration : ""}
            };
            this.paper_repo.saveQuestionPaper(questionPaper,onComplete);
        }else
            view.showError("questionPaperTitle");
    },

    onPreviewClick:function(){
        var title = this.view.getQuestionPaperTitle();
        this.view.openPreview(this.questionPaper,title)
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
        this.view.addToQuestionPaper(this.questionPaper);
        var questionsToShow = lodash.difference(this.all_questions,this.questionPaper);
        this.view.showQuestions(questionsToShow);
        this.view.showTotalNumberOfQuestion(this.questionPaper.length);
    }
};
var getQuestionIds = function(questions){
    return questions.map(function(question){
       return {id:question.id,
       note : ""}
    });
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