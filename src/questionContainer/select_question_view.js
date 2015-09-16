/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('./questionContainer/select_question_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_repository =  require('./repository/questions_repo').Question_repository;
var repo = new Question_repository(Contants.db_path);




var view = {
    setQuestions : function(questions){
        $("#questions").html(questions);

    },

    getSelectedQuestions : function(){
        $("#add").click(function(){
            var selectedQuestions = [];
            $.each($("input[name='questionCheckBox']:checked"),
                function(){
                    selectedQuestions.push($(this).val());
                });
            var formatedQuestions = "";
            selectedQuestions.forEach(function(question){
                formatedQuestions += "<div>" + question + "<button> X </button>" + "</div> <br>"
            })

            $("#selectedQuestion").html(formatedQuestions);
        })

    }
}

var onComplete = function(err,rows) {
    $(document).ready(function () {
        var presenter = new Presenter(view,repo);
        var questions = presenter.getQuestions(rows);
        view.getSelectedQuestions();
    })
}



repo.getQuestions(onComplete);
