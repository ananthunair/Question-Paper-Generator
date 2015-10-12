var Presenter = require('./dashboard/question_paper_to_show_presenter.js').Presenter;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var Question_repository = require('./repository/create_question_repo.js').Question_repository;
var preview = require('./preview/showPreview.js');
var jade = require('jade');
var selectedid ;

var view = {
    onQuestionPaperClick:function(setOfQuestions,title,id){
        $(".question_paper_title").toggleClass('selected',false)
        $("#"+id).toggleClass('selected')
        var codeFormatedQuestions = jade.renderFile("./src/Dashboard/question_paper_preview.jade",{title:title,'questions':setOfQuestions});
        $('#question_paper_preview').html(codeFormatedQuestions)
    }
};


$(document).ready(function (){
    var paperRepo = new Question_papers_repository();
    var questionRepo = new Question_repository();
    var presenter = new Presenter(view, paperRepo,questionRepo);

    $('#create_question_paper').click(function(){
        render('./src/createQuestionPaper/create_question_paper.jade')
    });
    $('.question_paper_title').click(function(){
        var id = $(this).attr('id');
        presenter.getAllQuestionsFromPaper(id);
    });

});