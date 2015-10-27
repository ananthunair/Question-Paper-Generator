var Presenter = require('../BrowseAllQuestions/all_questions_presenter.js').Presenter;
var Question_repository = require('../repository/create_question_repo').Question_repository;
var jade = require('jade');
var lodash = require('lodash');
var repo = new Question_repository();
var view = {
    showAllQuestions:function(questions){
        var htmlForQuestionsToSelect = jade.renderFile('./src/BrowseAllQuestions/questions_to_show.jade', {'questions': questions});
        $('#all_question_container').html(htmlForQuestionsToSelect);
        if(questions.length == 0){
            var htmlForQuestionsToSelect = jade.renderFile('./src/BrowseAllQuestions/no_question_preview.jade');
            $('#questionPreviewContainer').html(htmlForQuestionsToSelect)
        }
        else {
            $("#" + questions[0]['id']).click();
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

var presenter = new Presenter(view, repo);
$(document).ready(function(){

    presenter.onDocumentReady();
    presenter.setAutosuggetions();

    $('#create_question').click(function(){
        CreateQuestion.render({});
        $(".close").click(function () {
            presenter.onNewQuestionAdded();
        })
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