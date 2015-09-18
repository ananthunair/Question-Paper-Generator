
exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
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
        var selectedIds = this.view.getSelectedQuestions();

        this.questionPaper = this.all_questions.filter(function(question){
            return selectedIds.indexOf(question.id.toString())>=0
        });
        this.view.addToQuestionPaper(this.questionPaper);
    }

}