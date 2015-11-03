var Presenter = require('../BrowseAllQuestions/all_questions_presenter.js').Presenter;
var Question_repository = require('../repository/create_question_repo').Question_repository;
var jade = require('jade');
var lodash = require('lodash');
var repo = new Question_repository();
var extraArgs ={};
var view = {
    showAllQuestions:function(questions){
        questions.reverse();
        var htmlForQuestionsToSelect = jade.renderFile('./src/BrowseAllQuestions/questions_to_show.jade', {'questions': questions});
        $('#all_question_container').html(htmlForQuestionsToSelect);
        if(questions.length == 0){
            var htmlForQuestionsToSelect = jade.renderFile('./src/BrowseAllQuestions/no_question_preview.jade');
            $('#questionPreviewContainer').html(htmlForQuestionsToSelect)
        }
        else {
            var id = getValueFromParams('questionId',window.location.href) || questions[0]['id'];
            var selectedQuestion = $("#" + id);
            selectedQuestion.click();
        }

    },
    setupTagBoxData: function(tags){
        this.tagBox = setupTagBox(tags)
    },
    addQuestionSelectionListener: function () {
        $('#tbl-questionsToSelect tbody').on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });
    },
    getTags: function () {
        return this.tagBox.getTagValues().slice(0);
    },


    addSuggetions:function(tags){
        this.tagBox.resetSuggetions(tags)
        this.tagBox.resetAllowedTags(tags)
    }

}
var fetchBrowseQuestionsArgs=function(){
    extraArgs = BrowseQuestions.extraArgs;
    BrowseQuestions.resetArgs();
}

var getValueFromParams = function(valueOf ,url){
    var match = RegExp('[?&]' + valueOf + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var presenter = new Presenter(view, repo);


$(document).ready(function(){
    var headerHtml = jade.renderFile('./src/index.jade');
    $('#header').html(headerHtml);
    fetchBrowseQuestionsArgs();
    presenter.onDocumentReady();
    presenter.setAutosuggetions();

    $('#create_question').click(function(){
        CreateQuestion.render({});
        $(".close").click(function () {
            presenter.onNewQuestionAdded();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                presenter.onNewQuestionAdded();
            }
        });
    })
    $("#home").click(function(){
        Dashboard.render({})
    })

    $("#addQuestionsToQuestionPaper").click(function(){
        var html = jade.renderFile('./src/AddToQuestionPaper/add_to_question_paper.jade');
        $('#addToQuestionPaper').html(html);
    })
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
    tagbox.resetSuggetions(tags)
    return tagbox;
}