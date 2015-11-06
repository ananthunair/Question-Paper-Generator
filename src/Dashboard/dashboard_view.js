var Presenter = require('./dashboard_presenter.js').Presenter;
var Question_papers_repository = require('../repository/question_paper_repo.js').Question_papers_repository;
var Question_repository = require('../repository/create_question_repo.js').Question_repository;
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
        renderPaper('#questionPapers','./src/Dashboard/questionPapersToShow.jade',questionPapers)

    },
    showFilterResult:function(filterdPapers){
        renderPaper('#paper_list','./src/Dashboard/filteredPapers.jade',filterdPapers)
    },
    setupTagBoxData: function(tags){
        this.tagBox = setupTagBox(tags)
    }
};

var questionRepo = new Question_repository();
var repo = new Question_papers_repository();
var presenter = new Presenter(view, repo, questionRepo);

$(function(){
   fetchExtraArgs()
    var headerHtml = jade.renderFile('./src/index.jade');
    $('#header').html(headerHtml);
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
var setupTagBox = function (tags) {
    var enteredtags = [];
    var tagbox = new Taggle($('.tagbox.textarea')[0], {
        duplicateTagClass: 'bounce',
        allowedTags: tags,
        cssclass:"searchTagBox",
        placeholder:"Search Papers",
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
var renderPaper =function(containerId,filePath,questionPapers){
    var sortedQuestionPapers = sortQuestionPaperByTitle(questionPapers);
    console.log("path: ",filePath,"paper: ",sortedQuestionPapers)
    var codeFormatedQuestions = jade.renderFile(filePath, {'questionPapers': sortedQuestionPapers});
    $(containerId).html(codeFormatedQuestions)
    if(sortedQuestionPapers.length) {
        var id = getValueFromParams('id',window.location.href) || sortedQuestionPapers[0].id;
        $("#" + id).click()
    }else{
        $("#preview_with_answer_button").hide()
        $("#edit_button").hide();
        $("#preview_button").hide();
    }
}