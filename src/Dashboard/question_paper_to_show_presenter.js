exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {

    getAllQuestionsFromPaper:function(id){
        var presenter = this;
        var repo = this.repo;
        var view = this.view;

        onComplete = function(err, questionIds) {
            var questions = questionIds.map(function (questionId) {
                return questionId.questionId;
            })

            onCompleteForQuestion = function (err1, setOfQuestions){
                view.getAllQuestionsFromPaper(setOfQuestions);
            }

            repo.getAllQuestionsOfPaper(onCompleteForQuestion,questions);
        }

        repo.getQuestionIds(onComplete, id);
    }
}