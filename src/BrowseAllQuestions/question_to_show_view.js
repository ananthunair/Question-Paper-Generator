var Presenter = require('../BrowseAllQuestions/question_to_show_presenter.js').Presenter;
var Question_repository = require('../repository/create_question_repo').Question_repository;
var jade = require('jade');
var lodash = require('lodash');
var questionDetail;

var view = {
    questionPreview : function(question){
        questionDetail = question
        $(".questionContainer").toggleClass('selected',false)
        $("#"+question.id).toggleClass('selected');
        var htmlForQuestionsToSelect = jade.renderFile('./src/BrowseAllQuestions/question_preview.jade', question);
        $('#questionPreviewContainer').html(htmlForQuestionsToSelect)
    },
    openQuestionInEditView: function(){
        CreateQuestion.setExtraArgs(questionDetail.id)
        CreateQuestion.render();
    }
};


$(document).ready(function(){
    var repo = new Question_repository();
    var presenter = new Presenter(view, repo);
    $('.questionContainer').click(function(){
        var id = $(this).attr('id')
        presenter.getQuestionDetails(id);
    });

    $("#editQuestion").click(function(){
        presenter.openQuestionInEditMode();
    });
});