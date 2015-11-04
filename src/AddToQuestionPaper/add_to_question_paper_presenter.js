exports.Presenter = function (view,paper_repo) {
    console.log("in presenter")
    this.view = view;
    this.repo = paper_repo;
}


exports.Presenter.prototype = {
    onDocumentReady : function(){
        var view = this.view;
        var onComplete = function(err, questionPapers){
            err && console.log("Error while showing all question papers: ",err);
            view.showQuestionPapers(questionPapers);
        };
        this.repo.fetchQuestionPapers(onComplete);
    }

}