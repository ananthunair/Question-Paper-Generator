
var Presenter = require('./createQuestionPaper/create_question_paper_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_repository = require('./repository/questions_repo').Question_repository;
var Question_papers_repository = require('./repository/question_papers_repo.js').Question_papers_repository
var jade = require('jade');
var repo = new Question_repository(Contants.db_path);
var preview = require('./preview/showPreview.js');
var paper_repo = new Question_papers_repository(Contants.db_path);

var view = {
    table: {},

    createTable: function(questions){
        return $('#tbl-questionsToSelect').DataTable({
            data: questions,
            columns: [
                { title: "ID", "visible": false},
                { title: "Question"}
            ]
        });
    },

    addQuestionSelectionListener: function () {
        $('#tbl-questionsToSelect tbody tr').click(function () {
            $(this).toggleClass('selected');
        });
    },

    showQuestions: function (questions) {
        var htmlForQuestionsToSelect = jade.renderFile('./src/createQuestionPaper/questionToSelect.jade');
        $('#questionsToSelect').html(htmlForQuestionsToSelect)
        this.table = this.createTable(questions);
    },

    deleteSelectedRows: function(){
        this.table.rows('.selected').remove().draw(false);
    },

    getSelectedQuestions : function(){
        return this.table.rows('.selected').data().map(function(question){
            return question[0];
        });
    },

    addToQuestionPaper: function (selectedQuestions) {
        var htmlForSelectedQuestions = jade.renderFile("./src/createQuestionPaper/selectedQuestions.jade", {'questions': selectedQuestions});
        $('#questionPaperContainer').html(htmlForSelectedQuestions);
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


