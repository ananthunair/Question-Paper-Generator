var Presenter = require('./dashboard_presenter.js').Presenter;
var Question_papers_repository = require('../repository/question_paper_repo.js').Question_papers_repository;
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


var getValueFromParams = function(valueOf ,url){
    var match = RegExp('[?&]' + valueOf + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var view = {
    showQuestionPapers: function (questionPapers) {
        var sortedQuestionPapers = sortQuestionPaperByTitle(questionPapers);



        var codeFormatedQuestions = jade.renderFile('./src/Dashboard/questionPapersToShow.jade', {'questionPapers': sortedQuestionPapers});
        $('#questionPapers').html(codeFormatedQuestions)
        if(sortedQuestionPapers.length) {
            var id = getValueFromParams('id',window.location.href) || sortedQuestionPapers[0].id;
            $("#" + id).click()
        }else{
            $("#preview_button").hide();
        }

    }
};

$(function(){
   fetchExtraArgs()
    var headerHtml = jade.renderFile('./src/index.jade');
    $('#header').html(headerHtml);
    var repo = new Question_papers_repository();
    var presenter = new Presenter(view, repo);
    presenter.onDocumentReady();
    $('#create_question').click(function(){
        CreateQuestion.render({})
    });

    $('#showAllQuestions').click(function(){
        BrowseQuestions.render({})
    })
    $("#home").click(function(){
        Dashboard.render({})
    })
});

var fetchExtraArgs=function(){
    extraArgs =Dashboard.extraArgs;
    Dashboard.resetArgs();
}
