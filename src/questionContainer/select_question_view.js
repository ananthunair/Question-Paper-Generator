/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('./questionContainer/select_question_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_repository = require('./repository/questions_repo').Question_repository;
var repo = new Question_repository(Contants.get_db_path())
var view = {
    setQuestions : function(questions){
        $("#text").val(questions);
    }
}

var callback = function(err,rows) {
    $(document).ready(function () {
        var presenter =new Presenter(view,repo);
        console.log("************",rows);
        var questions = presenter.getQuestions(rows);
        view.setQuestions(questions);
    })
}
repo.getQuestions(callback)

