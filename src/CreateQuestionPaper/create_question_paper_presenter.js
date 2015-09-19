exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
    this.questionPaper =[];
}

exports.Presenter.prototype = {
    onDocumentReady:function(){
        var presenter =  this
        var onComplete = function(err,questions){
            presenter.all_questions = questions;
            presenter.view.showQuestions(questions)
        }
        this.repo.getAllQuestions(onComplete)
    },

    onAddClick : function(){
        function isSelectedQuestion(question){
            return selectedIds.indexOf(question.id.toString())>=0;
        }
        function isNotSelectedQuestion(question){
            return !isSelectedQuestion(question)
        }
        var selectedIds = this.view.getSelectedQuestions();
        var questionsToAddInPaper =this.all_questions.filter(isSelectedQuestion);
        this.questionPaper = this.questionPaper.concat(questionsToAddInPaper);
        var remainingQuestions = this.all_questions.filter(isNotSelectedQuestion)
        this.view.showQuestions(remainingQuestions)
        this.view.addToQuestionPaper(this.questionPaper);
    },

    onSaveClick : function() {
        var view = this.view;
        var onComplete = function (err) {
            if (err == null) {
                view.showSuccessMessage();
            }
            else {
                view.showErrorMessage();
            }
        }
        var questionPaperName = this.view.getQuestionPaperTitle();
        var questionPaperId = this.repo.saveQuestionPaper(questionPaperName, onComplete, this.questionPaper);
    },
    onPreviewClick:function(){
        this.view.openPreview(this.questionPaper)
    }



}
