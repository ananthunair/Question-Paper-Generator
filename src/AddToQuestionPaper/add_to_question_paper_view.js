var Presenter = require('../AddToQuestionPaper/add_to_question_paper_presenter.js').Presenter;
var Question_papers_repository = require('../repository/question_paper_repo.js').Question_papers_repository;
var jade = require('jade');
var repo = new Question_papers_repository();
var lodash = require('lodash');


var view = {
    showQuestionPapers: function (questionPaper) {
        if (questionPaper.length == 0){
            var htmlForQuestionsToSelect = jade.renderFile('./src/AddToQuestionPaper/no_result_found.jade');
            $('#showAllQuestionPapers').html(htmlForQuestionsToSelect)
        }
    }
}

$(document).ready(function(){

    var repo = new  Question_papers_repository();
    var presenter = new Presenter(view,repo);
    presenter.onDocumentReady();
})