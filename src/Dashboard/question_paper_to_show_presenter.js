exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {

    getAllQuestionsFromPaper:function(id){
        var presenter = this;
        var repo = this.repo;
        var view = this.view;

        var onComplete = function(err, questionIds) {
            var questions = questionIds.map(function (questionId) {
                return questionId.questionId;
            })

            var onCompleteForQuestion = function (err1, setOfQuestions){
                var onCompleteForTitle = function(err2, title){
                    var questionPaper = {};
                    questionPaper.que = setOfQuestions;
                    questionPaper.title = title.questionPaperName;
                    view.getAllQuestionsFromPaper(questionPaper)
                }
                repo.getTitle(onCompleteForTitle,id);
            }

            repo.getAllQuestionsOfPaper(onCompleteForQuestion,questions);
        }

        repo.getQuestionIds(onComplete, id);
    }
}