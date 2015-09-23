var Presenter = require('./createQuestion/create_question_presenter.js').Presenter;
var Question_repository = require('./repository/questions_repo.js').Question_repository;
var Contants = require('./Constants.js').constants;
var lodash  = require('lodash');
var suggestedTag = [];
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
    showErrorMessage:function(){
        setAlert("alert alert-danger", "Question and Tag field can not be empty");
    },
    showSuccessMessage:function(){
        setAlert("alert alert-success","Your question was added successfully")
    },
    setupTagBox:function(tags){
        suggestedTag = tags;
        this.tagBox = setupTagBox()
    },
    addSuggetions:function(tags){
        var newTags = lodash.difference(tags,suggestedTag);
        newTags.forEach(function(tag){
            suggestedTag.push(tag);
        });
    }
}

var setAlert = function(className, message){
    $('#message_alert').fadeIn().html("<div class='"+ className + "' role='alert'>"+ message + "</div>").delay(3000).fadeOut();
}

$(document).ready(function() {
    var repo = new  Question_repository(Contants.db_path);
    var presenter =new Presenter(view,repo);
    $("#markAsCode").on('click',function(){presenter.markAsCode()});
    $("#create").on('click',function(){
        presenter.onCreate();
    });
    presenter.onDocumentReady()
});

var setupTagBox = function() {
    var tagbox = new Taggle($('.tagbox.textarea')[0], {
        duplicateTagClass: 'bounce'
    });
    var container = tagbox.getContainer();
    var input = tagbox.getInput();
    $(input).autocomplete({
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

var clearTags =function(){
    var tags = view.getTags()
   tags.forEach(function(tag){
        view.tagBox.remove(tag,true);
    })
}
