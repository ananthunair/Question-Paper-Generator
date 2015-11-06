exports.Presenter = function (view, questionPaperRepo,question_repo) {
    this.view = view;
    this.repo = questionPaperRepo;
    this.question_repo = question_repo;
};
exports.Presenter.prototype = {
    onDocumentReady: function () {
        var presenter = this;
        var view = this.view;
        var onComplete = function (err, questionPapers) {
            err && console.log("Error while showing all question papers: ", err);
            presenter.all_questionPapers = questionPapers;
            view.showQuestionPapers(questionPapers);
            presenter.setAutosuggetions()
        };
        this.repo.fetchQuestionPapers(onComplete);
    },
    setAutosuggetions: function () {
        var view = this.view;
        this.question_repo.getUniqueTags(function (err, tags) {
            if (!err)
                view.setupTagBoxData(tags);
        });
    },
    onAddOrRemoveTag: function (tags) {
        var view = this.view;
        var onComplete = function (err, filteredQuestionPapers) {
            view.showFilterResult(filteredQuestionPapers);
        };
        this.repo.fetchPapersOfSpecificTag(tags, onComplete);
    }
};

