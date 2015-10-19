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
    }
}

var presenter = new Presenter(view, repo);

$(document).ready(function(){
    presenter.onDocumentReady();
    $('#create_question').click(function(){
        var createQuestionPopUp =  jade.renderFile('./src/createQuestion/create_question.jade');
        $('#myModal').html(createQuestionPopUp);
    });
});
