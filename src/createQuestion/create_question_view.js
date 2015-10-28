var Presenter = require('../createQuestion/create_question_presenter.js').Presenter;
var Question_repository = require('../repository/create_question_repo.js').Question_repository;
var lodash  = require('lodash');
var view ={
    getSelection:function(){
        var textComponent = document.getElementById('question');
        return {all_content:textComponent.value,start:textComponent.selectionStart,end:textComponent.selectionEnd}
    },
    setQuestion:function(question){
        return $('#question').val(question)
    },
    getQuestion:function(){
        return $('#question').val()
    },
    getAnswer:function(){
        return $('#answer').val()
    },
    clearScreen:function(){
        document.getElementById("question").value = "";
        document.getElementById("answer").value = "";
        clearTags();
    },
    getTags:function(){
      return this.tagBox.getTagValues().slice(0);
    },
    showError:function(id){
        $('#'+id).css("border-color", "red");
    },
    showErrorMessage:function(){
        setAlert("alert alert-danger", "Question and Tag field can not be empty");
    },
    showSuccessMessage:function(savedQuestionID){
        setAlert("alert alert-success","Question saved successfully.",savedQuestionID)
    },
    setupTagBox:function(tags){
        this.tagBox = setupTagBox(tags)
    },

    addSuggetions:function(tags){
      this.tagBox.resetSuggetions(tags)
    }
}

var setAlert = function(className, message,questionId){
    $('#successAlert').fadeIn().addClass('successAlert').text(message);
    $('#successAlert').append('<a id= "viewQuestion" data-dismiss="modal" >'+'View here'+'</a>');
    $('.modal-body').focusin(function(){
        $('#successAlert').fadeOut();
    });
    $('#viewQuestion').click(function(){
        BrowseQuestions.setExtraArgs({questionId:questionId});
        BrowseQuestions.render();
    });
}

$(document).ready(function() {
    var repo = new  Question_repository();
    var presenter =new Presenter(view,repo);
    $("#markAsCode").on('click',function(){presenter.markAsCode()});
    $("#create").on('click',function(){
        presenter.onCreate();
    });
    $(".validate").keyup(function (e) {
        $(".validate").css("border-color", "");
    });
    presenter.onDocumentReady()
});

var setupTagBox = function(tags) {
    var tagbox = new Taggle($('.tagbox.textarea')[0], {
        duplicateTagClass: 'bounce',
        cssclass:'createTagBox'
    });
   tagbox.resetSuggetions(tags)
    return tagbox;
};

var clearTags =function(){
    var tags = view.getTags()
   tags.forEach(function(tag){
        view.tagBox.remove(tag,true);
    })
}
