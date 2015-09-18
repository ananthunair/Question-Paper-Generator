

function isSelectedQuestion(question){
    return selectedIds.indexOf(question.id.toString())>=0;
}
function isNotSelectedQuestion(question){
    return !isSelectedQuestion(question)
}


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
        var selectedIds = this.view.getSelectedQuestions();
        var questionsToAddInPaper =this.all_questions.filter(isSelectedQuestion);
        this.questionPaper = this.questionPaper.concat(questionsToAddInPaper);
        var remainingQuestions = this.all_questions.filter(isNotSelectedQuestion)
        this.view.showQuestions(remainingQuestions)
        this.view.addToQuestionPaper(this.questionPaper);
    }



}