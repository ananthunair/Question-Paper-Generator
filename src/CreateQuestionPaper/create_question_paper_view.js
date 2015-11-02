var Presenter = require('../CreateQuestionPaper/create_question_paper_presenter.js').Presenter;
var Question_repository = require('../repository/create_question_repo').Question_repository;
var Question_papers_repository = require('../repository/question_paper_repo.js').Question_papers_repository;
var jade = require('jade');
var repo = new Question_repository();
var preview = require('../preview/showPreview.js');
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

    addToQuestionPaper: function (selectedQuestions,notes) {
        var htmlForSelectedQuestions = jade.renderFile("./src/createQuestionPaper/selectedQuestions.jade", {'questions': selectedQuestions,'notes':notes});

        $('#body').html(htmlForSelectedQuestions);
        registerAddNotesListeners();

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

    openPreview: function (questionPaper,notes, title) {
        preview.show({title: title, 'questions': questionPaper, 'notes':notes}, screen)
    }
    ,

    title: function () {
        return $("#questionPaperTitle").val().trim();
    }
    ,
    setPaperTitle : function(title){
        $("#questionPaperTitle").val(title);
    },

    showError: function (id) {
        $('#' + id).css("border-color", "red");
    }
    ,
    renderDashbord :function(paperId){
        Dashboard.render({'id':paperId});
    },
    getNote : function(index){
        return $('#'+index+'_text').val();
    },

    showEditMode : function(){
        $('#save').attr('id','update');
        $('#update').html('Update');
        $('#update').click(function(){
            presenter.onUpdateClick();
        })
    }


};

var presenter = new Presenter(view, repo, paper_repo);



var registerAddNotesListeners =function(){
    $('.addNote').click(function(){
        var id = $(this).attr('id');
        if(!($("#"+id+"_noteHolder").children().length>0))
         $("#"+id+"_noteHolder").html(jade.renderFile('./src/createQuestionPaper/addNote.jade',{id:id}))
        //$("#"+id+"_noteHolder").html(jade.renderFile('./src/createQuestionPaper/addNote.jade',{id:id}));
        //$('#noteID' + id).focus();
        $(this).hide();
        setNoteListener();
    });
    setNoteListener();
    $('.remove').click(function () {
        var id = $(this).attr('id');
        presenter.onRemoveQuestion(id);
    })
}
var setNoteListener =function(){
    $(".removeNote").click(function(){
        var id = $(this).attr('id')
        presenter.onRemoveNotes(id)
        $("#"+id+"_noteHolder").empty();
        $(".addNote#"+id).show();

    });
    $(".noteText").focusout(function(){
        var id = $(this).attr('id')
        var val =  $(this).val()
        presenter.onSaveNotes(id,val)
    });

}

var getValueFromParams = function(valueOf ,url){
    var match = RegExp('[?&]' + valueOf + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var registerButton = function(paperId){
    if(paperId){
        $('#save').attr('id','update');
        $('#update').html('Update');
        $('#update').click(function(){
            presenter.onUpdateClick();
        });
    }else{
        $('#save').click(function () {
            presenter.onSaveClick();
        });
    }
}

$(document).ready(function () {

    var headerHtml = jade.renderFile('./src/index.jade');
    $('#title').html(headerHtml);
    var paperId = getValueFromParams('id',window.location.href);
    presenter.onDocumentReady(paperId);
    CreatePaper.resetArgs();
    presenter.setAutosuggetions();
    $("#addQuestions").click(function () {
        presenter.onAddClick();
    });
    registerButton(paperId);
    $('#create_questions').click(function () {
        CreateQuestion.render({});
        $(".close").click(function () {
            presenter.onNewQuestionAdded();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                presenter.onNewQuestionAdded();
            }
        });
    });
    $("#questionPaperTitle").keyup(function (e) {
        $("#questionPaperTitle").css("border-color", "");
    });

    $("#preview_button").click(function () {
        presenter.onPreviewClick();
    });
    $("#home").click(function(){
        Dashboard.render({})
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
