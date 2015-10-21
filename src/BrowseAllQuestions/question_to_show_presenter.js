var lodash  = require('lodash');


exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {
    getQuestionDetails:function(id){
        var presenter = this;
        var view = this.view;
        var onComplete = function(err, question){

            var questionDetail = {};//question['_doc'];
            questionDetail.tags = question['_doc']["tags"];
            questionDetail.answer = question['_doc']["answer"];
            questionDetail.question = question['_doc']["question"];
            questionDetail.id = id;
            view.questionPreview(questionDetail)
        };
        this.repo.fetchQuestionDetail(id, onComplete);
    }
};