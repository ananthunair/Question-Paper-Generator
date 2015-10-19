var Presenter = require('./dashboard/dashboard_presenter.js').Presenter;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var jade = require('jade');
var extraArgs ={};

var sortQuestionPaperByTitle = function(questionPapers){
    return questionPapers.sort(function(pv, cv){
        //if(!pv.header.title || !cv.header.title) return 0;
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
        if(sortedQuestionPapers.length) {
            var id = extraArgs.paperId || sortedQuestionPapers[0].id;
            $("#" + id).click()
        }else{
            $("#preview_button").hide();
        }

    }
};

$(function(){
   fetchExtraArgs()
    var repo = new Question_papers_repository();
    var presenter = new Presenter(view, repo);
    presenter.onDocumentReady();

    $('#create_question').click(function(){
        CreateQuestion.render()
    });
});

var fetchExtraArgs=function(){
    extraArgs =Dashboard.extraArgs;
    Dashboard.resetArgs();
}