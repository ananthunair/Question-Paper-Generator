var lodash  = require('lodash');

exports.Presenter = function (view, questions_repo,paper_repo) {
    this.view = view;
    this.repo = questions_repo;
    this.paper_repo = paper_repo;
    this.questionPaper =[];
}


var formatQuestion = function(question){
        return [question.id, question.question];
};

exports.Presenter.prototype = {
    questionPaper : [],

    onDocumentReady:function(){
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            var formattedQuestions = questions.map(formatQuestion);
            presenter.view.showQuestions(formattedQuestions);
            presenter.view.addQuestionSelectionListener();
        };
        this.repo.fetchQuestions(onComplete);
    },

    onAddOrRemoveTag :  function(tags){
            var presenter =  this;
            var onComplete = function(err,questions){

                presenter.all_questions = difference(presenter.questionPaper,questions);

                var formattedQuestions = presenter.all_questions.map(function(question){
                    return [question.id, question.question]
                });
                presenter.view.showQuestions(formattedQuestions);
                presenter.view.addQuestionSelectionListener();
            };
            this.repo.fetchQuestionsOfSpecificTags(tags,onComplete);
        },

    onAddClick : function(){
        var view = this.view;
        function isSelected(question){
            var selectedIds = view.getSelectedQuestions();
            return selectedIds.indexOf(question.id)>=0;
        }
        var questionsToAddInPaper = this.all_questions.filter(isSelected);
        this.questionPaper = this.questionPaper.concat(questionsToAddInPaper);
        view.deleteSelectedRows();
        view.addToQuestionPaper(this.questionPaper);
        view.showTotalNumberOfQuestion(this.questionPaper.length)
    },

    onSaveClick : function() {
        var view = this.view;
        var onComplete = function (err) {
            err ? view.showErrorMessage() : view.showSuccessMessage();
        };
        var questionPaper = {
            questions : getQuestionIds(this.questionPaper),
            header : {title:this.view.getQuestionPaperTitle() , marks : "" ,duration : ""}
        };
        this.paper_repo.saveQuestionPaper(questionPaper,onComplete);
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
        console.log(id);
        this.questionPaper = this.questionPaper.filter(function(question){
            return question.id != id;
        });

        this.view.addToQuestionPaper(this.questionPaper);
        var filteredQuestion = lodash.find(this.all_questions,function (q) {
            return q.id == id;
        });

        var removedQuestion = formatQuestion(filteredQuestion);
        this.view.addRemovedQuestionToAllQuestions(removedQuestion);
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