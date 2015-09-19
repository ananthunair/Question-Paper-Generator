exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {
    onDocumentReady:function(){
        var presenter =  this
        var onComplete = function(err, questionPapers){

            presenter.view.showQuestionPapers(questionPapers)
        }
        this.repo.getAllQuestionPapers(onComplete)
    }
}