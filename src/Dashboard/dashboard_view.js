var Presenter = require('./dashboard/dashboard_presenter.js').Presenter;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var jade = require('jade');


var view = {
    showQuestionPapers: function (questionPapers) {
        var codeFormatedQuestions = jade.renderFile('./src/dashboard/questionPapersToShow.jade', {'questionPapers': questionPapers});
        $('#questionPapers').html(codeFormatedQuestions)
    }
};

$(function(){
    var repo = new Question_papers_repository();
    var presenter = new Presenter(view, repo);
    presenter.onDocumentReady();

    $('#create_question').click(function(){
        render('./src/createQuestion/create_question.jade')
    });

});
