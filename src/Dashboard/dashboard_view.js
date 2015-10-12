var Presenter = require('./dashboard/dashboard_presenter.js').Presenter;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var jade = require('jade');


var sortQuestionPaperByTitle = function(questionPapers){
    return questionPapers.sort(function(pv, cv){
        if(pv.header.title.toLowerCase() < cv.header.title.toLowerCase())
            return -1;
        if(pv.header.title.toLowerCase() > cv.header.title.toLowerCase())
            return 1;
        return 0;
    });

}

var view = {
    showQuestionPapers: function (questionPapers) {
        var sortedQuestionPapers = sortQuestionPaperByTitle(questionPapers);
        var codeFormatedQuestions = jade.renderFile('./src/Dashboard/questionPapersToShow.jade', {'questionPapers': sortedQuestionPapers});
        $('#questionPapers').html(codeFormatedQuestions)
        if(sortedQuestionPapers.length)
            $("#"+sortedQuestionPapers[0].id).click()
    }
};

$(function(){
    var repo = new Question_papers_repository();
    var presenter = new Presenter(view, repo);
    presenter.onDocumentReady();

    $('#create_question').click(function(){
        var createQuestionPopUp =  jade.renderFile('./src/createQuestion/create_question.jade');
        $('#myModal').html(createQuestionPopUp);
    });
});
