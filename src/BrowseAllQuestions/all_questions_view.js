var Presenter = require('./BrowseAllQuestions/all_questions_presenter.js').Presenter;
var Question_repository = require('./repository/create_question_repo').Question_repository;
var jade = require('jade');
var repo = new Question_repository();
var lodash = require('lodash');
var suggestedTag = [];
var view = {
    showAllQuestions:function(questions){
        var htmlForQuestionsToSelect = jade.renderFile('./src/createQuestionPaper/questionToSelect.jade', {'questions': questions});
        $('#all_question_container').html(htmlForQuestionsToSelect)
    },
    setupTagBoxData: function(tags){
        suggestedTag = tags;
        this.tagBox = setupTagBox()
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
        var newTags = lodash.difference(tags,suggestedTag);

        newTags.forEach(function(tag){
            suggestedTag.push(tag)
        });
        resettagBox(this.tagBox)
        this.tagBox.resetAllowedTags(tags)
    }

}

var presenter = new Presenter(view, repo);

$(document).ready(function(){
    presenter.onDocumentReady();
    presenter.setAutosuggetions();

    $('#create_question').click(function(){
        var createQuestionPopUp =  jade.renderFile('./src/createQuestion/create_question.jade');
        $('#myModal').html(createQuestionPopUp);
        $(".close").click(function () {
            presenter.onNewQuestionAdded();
        })
    });
});

var resettagBox =function(tagbox){
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
}


var setupTagBox = function () {
    var enteredtags = [];
    var tagbox = new Taggle($('.tagbox.textarea')[0], {
        duplicateTagClass: 'bounce',
        allowedTags: suggestedTag,
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
    resettagBox(tagbox)
    return tagbox;
}