exports.Presenter = function (view, questionPaperRepo) {
    this.view = view;
    this.repo = questionPaperRepo;
};

exports.Presenter.prototype = {
    onDocumentReady : function(){
        var questionPaper = {
            id:1,
            questions: [{id:111,note:"ppppp"}],
            header:{title:"arraytest",marks:100,duration:"1 minute"}
        };
        var view = this.view;
        var onComplete = function(err, questionPapers){
            err && console.log("Error while showing all question papers: ",err);
            view.showQuestionPapers(questionPapers);
        };
        this.repo.fetchQuestionPapers(onComplete);
    }
};