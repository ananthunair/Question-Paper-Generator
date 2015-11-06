var Presenter = require('./question_paper_to_show_presenter.js').Presenter;
var Question_papers_repository = require('../repository/question_paper_repo.js').Question_papers_repository;
var Question_repository = require('../repository/create_question_repo.js').Question_repository;
var preview = require('../preview/showPreview.js');
var jade = require('jade');
var setOfQuestionsOfPaper, titleOfPaper,notesOfPaper,paperId;
var lodash = require('lodash');

var view = {
    onQuestionPaperClick:function(setOfQuestions,title,id,notes){
        setOfQuestionsOfPaper = setOfQuestions;
        titleOfPaper = title;
        notesOfPaper = notes;
        paperId = id;
        $(".question_paper_title").toggleClass('selected',false)
        $("#"+id).toggleClass('selected');
        var codeFormatedQuestions = jade.renderFile("./src/Dashboard/question_paper_preview.jade",{title:title,'questions':setOfQuestions,'notes':notes});
        $('#question_paper_preview').html(codeFormatedQuestions);
    },

    openPreview: function () {
        preview.show({title: titleOfPaper, 'questions': setOfQuestionsOfPaper,'notes': notesOfPaper}, screen)
    },

    openPaperInEditMode : function(){
        CreatePaper.setExtraArgs({title: titleOfPaper, 'questions': setOfQuestionsOfPaper.map(extractQuestion),'notes': notesOfPaper,'paperId':paperId});
        CreatePaper.render({'id':paperId});
    },
    openPreviewWithAnswer:function(){
        preview.showWithAnswer({title: titleOfPaper, 'questions': setOfQuestionsOfPaper.map(extractQuestionWithAnswer),'notes': notesOfPaper}, screen)
    }//,
    //setupTagBoxData: function(tags){
    //    this.tagBox = setupTagBox(tags)
    //}
};


$(document).ready(function (){
    var paperRepo = new Question_papers_repository();
    var questionRepo = new Question_repository();
    var presenter = new Presenter(view, paperRepo,questionRepo);
    //presenter.setAutosuggetions();
    $('#create_question_paper').click(function(){
       CreatePaper.render({})
    });
    $('.question_paper_title').click(function(){
        var id = $(this).attr('id');
        presenter.getAllQuestionsFromPaper(id);
    });

    $("#preview_button").click(function(){
        presenter.onPreviewClick();
    });

    $("#edit_button").click(function(){
        presenter.onEditClick();
    });
    $("#preview_with_answer_button").click(function(){
        presenter.onPreviewWithAnswerClick();
    });



});

//var setupTagBox = function (tags) {
//    var enteredtags = [];
//    var tagbox = new Taggle($('.tagbox.textarea')[0], {
//        duplicateTagClass: 'bounce',
//        allowedTags: tags,
//        cssclass:"searchTagBox",
//        placeholder:"Search Papers",
//        onTagAdd: function (event, tag) {
//            enteredtags.push(tag);
//            presenter.onAddOrRemoveTag(enteredtags);
//        },
//        onTagRemove: function (event, tag) {
//            lodash.remove(enteredtags, function (t) {
//                return t == tag
//            });
//            presenter.onAddOrRemoveTag(enteredtags);
//        }
//    });
//    tagbox.resetSuggetions(tags)
//    return tagbox;
//}

var extractQuestion = function(questionObject){
    return {'id':questionObject._doc._id,'question':questionObject._doc.question};
};

var extractQuestionWithAnswer = function(questionObject){
    return {'id':questionObject._doc._id,'question':questionObject._doc.question, 'answer':questionObject._doc.answer};
}
