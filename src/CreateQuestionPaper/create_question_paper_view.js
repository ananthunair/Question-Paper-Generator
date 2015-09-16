/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('./createQuestionPaper/create_question_paper_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_repository =  require('./repository/questions_repo').Question_repository;
var jade =  require('jade');
var repo = new Question_repository(Contants.db_path);

var view = {

    showQuestions:function(questions){
        var formatedQuestions =jade.renderFile('./src/createQuestionPaper/questionToSelect.jade',{'questions':questions});
        var codeFormatedQuestions= formatedQuestions.replace(/&lt;code&gt;/gi,'<code>').replace(/&lt;\/code&gt;/gi,'<\/code>');
        $('#questionsToSelect').html(codeFormatedQuestions)
    }
}


$(document).ready(function(){
    var presenter = new Presenter(view,repo);
    var questions = presenter.onDocumentReady();
    $("#add").click(function(){
        var selectedQuestions = [];
        $.each($("input[name='questionBox']:checked"),
            function(){
                selectedQuestions.push("qustion");
            });
        var formatedQuestions = "";
        selectedQuestions.forEach(function(question){
            formatedQuestions += "<div>" + question + "<button> X </button>" + "</div> <br>"
        })

        $("#selectedQuestion").html(formatedQuestions);
    })
})


