var lodash  = require('lodash');


exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {
    onDocumentReady:function(){
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            presenter.view.showAllQuestions(questions);
        };
        this.repo.fetchQuestions(onComplete);
    },
    setAutosuggetions : function(){
        var view = this.view;
        this.repo.getUniqueTags(function (err,tags) {
            if(!err)
                view.setupTagBoxData(tags);
        });
    },
    onAddOrRemoveTag :  function(tags){
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.view.showAllQuestions(questions);
            presenter.view.addQuestionSelectionListener();
        };
        this.repo.fetchQuestionsOfSpecificTags(tags,onComplete);
    },
    onNewQuestionAdded:function(){
        var presenter =this;
        this.onAddOrRemoveTag(this.view.getTags())
        this.repo.getUniqueTags(function(err,tags){
            presenter.view.addSuggetions(tags)
        });
    }
}