exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {

    getAllQuestionsFromPaper:function(id){
        var presenter = this;
        onComplete = function(err, questionPaperIds){
            presenter.view.showQuestionPaper(questionPaperIds)
        }
        this.repo.getQuestionPaper(onComplete, id);
    }
}