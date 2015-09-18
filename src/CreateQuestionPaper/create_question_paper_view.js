/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('./createQuestionPaper/create_question_paper_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_repository = require('./repository/questions_repo').Question_repository;
var jade = require('jade');
var repo = new Question_repository(Contants.db_path);

function codeFormator(path,options) {
    var formatedQuestions = jade.renderFile(path,options);
    var codeFormatedQuestions = formatedQuestions.replace(/&lt;code&gt;/gi, '<pre><code>').replace(/&lt;\/code&gt;/gi, '<\/code></pre>');
    return codeFormatedQuestions;
}
var view = {

    showQuestions: function (questions) {
        var codeFormatedQuestions = codeFormator('./src/createQuestionPaper/questionToSelect.jade', {'questions': questions});
        $('#questionsToSelect').html(codeFormatedQuestions)
    },
    getSelectedQuestions: function () {
        var selectedQuestions = [];
        $.each($("input[name='questionBox']:checked"),
            function(){
                selectedQuestions.push($(this).val());
            });
        return selectedQuestions;

    },
    addToQuestionPaper: function (selectedQuestions) {

        $('#selectedQuestion').html(codeFormator("./src/createQuestionPaper/questionToSelect.jade",{'questions': selectedQuestions}))
    },
}


$(document).ready(function () {
    var presenter = new Presenter(view, repo);
    var questions = presenter.onDocumentReady();
    $("#add").click(function () {
        presenter.onAddClick();
    })
})


