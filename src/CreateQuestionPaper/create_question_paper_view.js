/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('./createQuestionPaper/create_question_paper_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_repository = require('./repository/questions_repo').Question_repository;
var jade = require('jade');
var repo = new Question_repository(Contants.db_path);

function codeFormator(path, options) {
    var formatedQuestions = jade.renderFile(path, options);
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
            function () {
                selectedQuestions.push($(this).val());
            });
        return selectedQuestions;

    },
    addToQuestionPaper: function (selectedQuestions) {

        $('#questionPaperContainer').html(codeFormator("./src/createQuestionPaper/questionToSelect.jade", {'questions': selectedQuestions}))
    },
    showSuccessMessage : function(){
        setAlert("alert alert-success","Your questionPaper was successfully added");
    },

    showErrorMessage : function(){
        setAlert("alert alert-danger", "Question Paper can not be empty");
    },

    getQuestionPaperTitle : function() {
        return $('#questionPaperName').val();
    },
    openPreview: function(questionPaper) {
        var preview = jade.renderFile("./src/createQuestionPaper/preview.jade",{questionPaper:{title:"title",'questions':questionPaper}})
        var previewWindow = window.open("", "width=600,height=600,scrollbars=yes")
        previewWindow.moveTo(0,0);
        previewWindow.resizeTo(screen.width, screen.height)
        previewWindow.document.write(preview)

    }

}

var setAlert = function(className, message){
    $('#message_alert').fadeIn().html("<div class='"+ className + "' role='alert'>"+ message + "</div>").delay(3000).fadeOut();
}


$(document).ready(function () {
    var presenter = new Presenter(view, repo);
    presenter.onDocumentReady();
    $("#add").click(function () {
        presenter.onAddClick();
    })
    $('#save').click(function() {
        presenter.onSaveClick();
    })
    $("#preview").click(function(){
        presenter.onPreviewClick();
    })
})


