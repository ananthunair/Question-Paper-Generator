
exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {
    onDocumentReady:function(){
        var view = this.view
        var onComplete = function(err,questions){
           view.showQuestions(questions)
        }
        this.repo.getAllQuestions(onComplete)
    }

}