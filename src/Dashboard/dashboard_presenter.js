exports.Presenter = function (view, questionPaperRepo) {
    this.view = view;
    this.repo = questionPaperRepo;
};

exports.Presenter.prototype = {
    onDocumentReady : function(){

        var view = this.view;
        var onComplete = function(err, questionPapers){
            err && console.log("Error while showing all question papers: ",err);
            view.showQuestionPapers(questionPapers);
        };
        this.repo.fetchQuestionPapers(onComplete);
    }
};