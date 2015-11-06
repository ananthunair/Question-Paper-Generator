exports.Presenter = function (view, questionPaperRepo,question_repo) {
    this.view = view;
    this.repo = questionPaperRepo;
    this.question_repo = question_repo;
};
var filteredQuestionPapers =[];
exports.Presenter.prototype = {
    onDocumentReady : function(){
        var presenter = this;
        var view = this.view;
        var onComplete = function(err, questionPapers){
            err && console.log("Error while showing all question papers: ",err);
            presenter.all_questionPapers = questionPapers;
            view.showQuestionPapers(questionPapers);
            presenter.setAutosuggetions()
        };
        this.repo.fetchQuestionPapers(onComplete);
    },
    setAutosuggetions : function(){
    var view = this.view;
    this.question_repo.getUniqueTags(function (err,tags) {
        if(!err)
            view.setupTagBoxData(tags);
    });
    },
    onAddOrRemoveTag :  function(tags){
        var presenter = this;
        var view = this.view;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            var questionIds = getQuestionIds(presenter.all_questions);
            filteredQuestionPapers = getFilteredQuestionPapers(presenter.all_questionPapers, questionIds);
            view.showFilterResult(filteredQuestionPapers);
        };
        this.question_repo.fetchQuestionsHavingAnyOfTags(tags,onComplete);
    }
};

var getQuestionIds = function(arrayOfQuestions){
    return arrayOfQuestions.map(function(question){
        return question.id.toString();
    })
}

var getFilteredQuestionPapers = function(questionPapers, questions){
    var filteredQuestionPapers = [];
    for(var qpIndex = 0; qpIndex < questionPapers.length; qpIndex++){
        for(var qIndex = 0; qIndex < questions.length; qIndex++){
            if(questionPapers[qpIndex].questions.indexOf(questions[qIndex]) > -1){
                filteredQuestionPapers.push(questionPapers[qpIndex]);
                break;
            }
        }
    }
    return filteredQuestionPapers;
}