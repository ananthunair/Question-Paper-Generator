var Presenter = require('./createQuestionPaper/create_question_paper_presenter.js').Presenter;
var Question_repository = require('./repository/create_question_repo').Question_repository;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var jade = require('jade');
var repo = new Question_repository();
var preview = require('./preview/showPreview.js');
var paper_repo = new Question_papers_repository();
var lodash = require('lodash');
var view = {
    table: {},

    showQuestions: function (questions) {
        var htmlForQuestionsToSelect = jade.renderFile('./src/createQuestionPaper/questionToSelect.jade', {'questions': questions});
        $('#all_question_container').html(htmlForQuestionsToSelect)
    },

    setupTagBoxData: function(tags){
        this.tagBox = setupTagBox(tags)
    },

    getTags: function () {
        return this.tagBox.getTagValues().slice(0);
    },


    addSuggetions:function(tags){
        this.tagBox.resetAllowedTags(tags)
        this.tagBox.resetSuggetions(tags)
    },

    deleteSelectedQuestions: function () {
        var ids = this.getSelectedQuestions();
        ids.forEach(function (id) {
            $("#" + id).remove()
        })
    }

    ,

    getSelectedQuestions: function () {
        var ids = [];
        $('.inputBoxContainer input:checked').each(function () {
            ids.push(this.name);
        });
        return ids;
    }
    ,

    addToQuestionPaper: function (selectedQuestions) {
        var htmlForSelectedQuestions = jade.renderFile("./src/createQuestionPaper/selectedQuestions.jade", {'questions': selectedQuestions});
        $('#body').html(htmlForSelectedQuestions);
        $('.remove').click(function () {
            var id = $(this).attr('id');
            presenter.onRemoveQuestion(id);
        })
    }
    ,

    getQuestionPaperTitle: function () {
        return $('#questionPaperTitle').val();
    }
    ,

    showTotalNumberOfQuestion: function (totalQuestions) {
        $('#totalQuestions').html('<p>' + totalQuestions + '</p>')
    }
    ,

    openPreview: function (questionPaper, title) {
        preview.show({title: title, 'questions': questionPaper}, screen)
    }
    ,

    title: function () {
        return $("#questionPaperTitle").val().trim();
    }
    ,
    showError: function (id) {
        $('#' + id).css("border-color", "red");
    }
    ,
    renderDashbord :function(paperId){
        Dashboard.setExtraArgs({'paperId':paperId})
        Dashboard.render();
    }


};

var presenter = new Presenter(view, repo, paper_repo);

var setWrapperHeight = function () {
    var windowHeight = $(window).height();
    var headerHeight = $('#title-header').height();
    $('#wrapper').height(windowHeight - headerHeight)
};


$(document).ready(function () {
    presenter.onDocumentReady();
    presenter.setAutosuggetions();
    $("#addQuestions").click(function () {
        presenter.onAddClick();
    });
    $('#save').click(function () {
        presenter.onSaveClick();
    });
    $('#create_questions').click(function () {
        CreateQuestion.render();
        $(".close").click(function () {
            presenter.onNewQuestionAdded();
        })
    });
    $("#questionPaperTitle").keyup(function (e) {
        $("#questionPaperTitle").css("border-color", "");
    });

    $("#preview_button").click(function () {
        presenter.onPreviewClick();
    });

});


var setupTagBox = function (tags) {
    var enteredtags = [];
    var tagbox = new Taggle($('.tagbox.textarea')[0], {
        duplicateTagClass: 'bounce',
        allowedTags: tags,
        cssclass:"searchTagBox",
        placeholder:"Search Questions",
        onTagAdd: function (event, tag) {
            enteredtags.push(tag);
            presenter.onAddOrRemoveTag(enteredtags);
        },
        onTagRemove: function (event, tag) {
            lodash.remove(enteredtags, function (t) {
                return t == tag
            });
            presenter.onAddOrRemoveTag(enteredtags);
        }
    });
  tagbox.resetSuggetions(tags);
    return tagbox;
};
