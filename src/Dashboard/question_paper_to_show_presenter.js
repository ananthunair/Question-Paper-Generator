exports.Presenter = function (view, paper_repo,questions_repo) {
    this.view = view;
    this.question_repo = questions_repo;
    this.paper_repo = paper_repo;
}

exports.Presenter.prototype = {

    getAllQuestionsFromPaper:function(id){
        var presenter = this;
        var question_repo = this.question_repo;
        var paper_repo = this.paper_repo;
        var view = this.view;
        var onComplete =function(err,paper){
            question_repo.getQuestionsByIds(getQuestionIds(paper),function(err,questions){
              view.onQuestionPaperClick(questions,paper.header.title,id)
            })
        }
       paper_repo.getPaper(id,onComplete)
    }
};
var getQuestionIds = function(paper){
   return paper.questions.map(function(question){
        return question.id
    })
}