var Presenter = require('./dashboard/question_paper_to_show_presenter.js').Presenter;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var Question_repository = require('./repository/create_question_repo.js').Question_repository;
var preview = require('./preview/showPreview.js');
var jade = require('jade');
var setOfQuestionsOfPaper, titleOfPaper,notesOfPaper;

var view = {
    onQuestionPaperClick:function(setOfQuestions,title,id,notes){
        setOfQuestionsOfPaper = setOfQuestions;
        titleOfPaper = title;
        notesOfPaper = notes;
        $(".question_paper_title").toggleClass('selected',false)
        $("#"+id).toggleClass('selected');
        var codeFormatedQuestions = jade.renderFile("./src/Dashboard/question_paper_preview.jade",{title:title,'questions':setOfQuestions,'notes':notes});
        $('#question_paper_preview').html(codeFormatedQuestions);
    },

    openPreview: function () {
        preview.show({title: titleOfPaper, 'questions': setOfQuestionsOfPaper,'notes': notesOfPaper}, screen)
    }
};


$(document).ready(function (){
    var paperRepo = new Question_papers_repository();
    var questionRepo = new Question_repository();
    var presenter = new Presenter(view, paperRepo,questionRepo);

    $('#create_question_paper').click(function(){
       CreatePaper.render()
    });
    $('.question_paper_title').click(function(){
        var id = $(this).attr('id');
        presenter.getAllQuestionsFromPaper(id);
    });

    $("#preview_button").click(function(){
        view.openPreview();
    });

    $("#edit_button").click(function(){
    });


});