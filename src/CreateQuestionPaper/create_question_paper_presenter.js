exports.Presenter = function (view, questions_repo,paper_repo) {
    this.view = view;
    this.repo = questions_repo;
    this.paper_repo = paper_repo;
    this.questionPaper =[];
}


exports.Presenter.prototype = {


    onDocumentReady:function(){
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            var formattedQuestions = questions.map(function(question){
                return [question.id, question.question]
            });
            presenter.view.showQuestions(formattedQuestions);
            presenter.view.addQuestionSelectionListener();
        }
        this.repo.getAllQuestions(onComplete);
        setAutosuggetions(this.repo, this.view)
    },

    onAddClick : function(){
        var view = this.view;
        function isSelected(question){
            var selectedIds = view.getSelectedQuestions();
            return selectedIds.indexOf(question.id)>=0;
        }
        var questionsToAddInPaper =this.all_questions.filter(isSelected);
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
        var questionPaperName = this.view.getQuestionPaperTitle();
        this.paper_repo.saveQuestionPaper(questionPaperName, onComplete, this.questionPaper);
    },

    onPreviewClick:function(){
        var title = this.view.getQuestionPaperTitle();
        this.view.openPreview(this.questionPaper,title)
    },

    onFilterClick :  function(){
        var tags = this.view.getTags();
        var presenter =  this;
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            var formattedQuestions = questions.map(function(question){
                return [question.id, question.question]
            });
            presenter.view.showQuestions(formattedQuestions);
            presenter.view.addQuestionSelectionListener();
        }
        this.repo.fetchQuestionIds(tags,onComplete);
    }
}

var setAutosuggetions = function (repo, view) {
    repo.getUniqueTags(function (tags) {
        view.setupTagBox(tags);
    });
}
