var Presenter = require('./createQuestion/create_question_presenter.js').Presenter;
var Question_repository = require('./repository/create_question_repo.js').Question_repository;
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
    showSuccessMessage:function(){
        setAlert("alert alert-success","Your question was added successfully")
    },
    setupTagBox:function(tags){
        this.tagBox = setupTagBox(tags)
    },

    addSuggetions:function(tags){
      this.tagBox.resetSuggetions(tags)
    }
}

var setAlert = function(className, message){
    $('#message_alert').fadeIn().html("<div class='"+ className + "' role='alert'>"+ message + "</div>").delay(3000).fadeOut();
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
