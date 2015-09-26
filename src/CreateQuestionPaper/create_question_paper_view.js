var Presenter = require('./createQuestionPaper/create_question_paper_presenter.js').Presenter;
var Constants = require('./Constants.js').constants;
var Question_repository = require('./repository/create_question_repo').Question_repository;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var jade = require('jade');
var repo = new Question_repository(Constants.db_path);
var preview = require('./preview/showPreview.js');
var paper_repo = new Question_papers_repository(Constants.db_path);

var view = {
    table: {},
    suggestedTag : [],

    addRemovedQuestionToAllQuestions: function(question){
        this.table.row.add(question).draw();
    },

    createTable: function(questions){
        return $('#tbl-questionsToSelect').DataTable({
            data: questions,
            columns: [
                { title: "ID", "visible": false},
                { title: "Question",width:"1%"}
            ]
        });
    },

    addQuestionSelectionListener: function () {
        $('#tbl-questionsToSelect tbody').on('click','tr',function () {
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
        $('.remove').click(function(){
            var id = $(this).attr('id');
            presenter.onRemoveQuestion(id);
        })
    },

    setAlert : function(className, message){
        $('#message_alert').fadeIn().html("<div class='"+ className + "' role='alert'>"+ message + "</div>").delay(3000).fadeOut();
    },

    showSuccessMessage : function(){
        this.setAlert("alert alert-success","Your questionPaper was successfully added");
    },

    showErrorMessage : function(){
        this.setAlert("alert alert-danger", "Question Paper can not be empty");
    },

    getQuestionPaperTitle : function() {
        return $('#questionPaperTitle').val();
    },

    showTotalNumberOfQuestion : function(totalQuestions){
      $('#totalQuestions').html('<p>'+totalQuestions+'</p>')
    },

    openPreview: function(questionPaper,title) {
        preview.show({title:title,'questions':questionPaper},screen)
    },

    setupTagBoxData : function(tags){
        this.suggestedTag = tags;
        this.tagBox = setupTagBox(this.suggestedTag);
    },

    getTags:function(){
        return this.tagBox.getTagValues().slice(0);
    }

};

var presenter = new Presenter(view, repo,paper_repo);
var setWrapperHeight = function(){
    var windowHeight = $(window).height();
    var headerHeight = $('#title-header').height();
    $('#wrapper').height(windowHeight - headerHeight)

};




$(document).ready(function () {
    var presenter = new Presenter(view, repo, paper_repo);
    presenter.onDocumentReady();
    presenter.setAutosuggetions();
    $("#add").click(function () {
        presenter.onAddClick();
    });
    $('#save').click(function() {
        presenter.onSaveClick();
    });
    $("#preview").click(function(){
        presenter.onPreviewClick();
    });
    $("#filter").click(function(){
        presenter.onFilterClick();
    });

    setWrapperHeight()

});


var setupTagBox = function(suggestedTag) {
    var tagbox = new Taggle($('.tagbox.textarea')[0], {
        duplicateTagClass: 'bounce',
        allowedTags:suggestedTag
    });
    var container = tagbox.getContainer();
    var input = tagbox.getInput();

    $(input).autocomplete(
    {
    source:suggestedTag,
        appendTo: container,
        position: { at: 'left bottom', of: container },
        select: function(e, v) {
            e.preventDefault();
            if (e.which === 1) {
                tagbox.add(v.item.value);
            }
        }
    });
    return tagbox;
};
