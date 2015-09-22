
var Presenter = require('./createQuestionPaper/create_question_paper_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_repository = require('./repository/questions_repo').Question_repository;
var Question_papers_repository = require('./repository/question_papers_repo.js').Question_papers_repository
var jade = require('jade');
var repo = new Question_repository(Contants.db_path);
var preview = require('./preview/showPreview.js');
var paper_repo = new Question_papers_repository(Contants.db_path);
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
        return $('#questionPaperTitle').val();
    },

    showTotalNumberOfQuestion : function(totalQuestions){
      $('#totalQuestions').html('<p>'+totalQuestions+'</p>')
    },


    openPreview: function(questionPaper,title) {
        preview.show({title:title,'questions':questionPaper},screen)
    }

}

var setAlert = function(className, message){
    $('#message_alert').fadeIn().html("<div class='"+ className + "' role='alert'>"+ message + "</div>").delay(3000).fadeOut();
}

var setWrapperHeight = function(){
    var windowHeight = $(window).height();
    var headerHeight = $('#title-header').height();
    $('#wrapper').height(windowHeight - headerHeight)

}

$(document).ready(function () {
    var presenter = new Presenter(view, repo,paper_repo);
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
    setWrapperHeight()
})


