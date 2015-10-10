var Presenter = require('./dashboard/question_paper_to_show_presenter.js').Presenter;
var Question_papers_repository = require('./repository/question_paper_repo.js').Question_papers_repository;
var Question_repository = require('./repository/create_question_repo.js').Question_repository;
var preview = require('./preview/showPreview.js');


var view = {
    onQuestionPaperClick:function(setOfQuestions,title){
        preview.show({title:title,'questions':setOfQuestions},screen)
    }
};


$(document).ready(function (){
    var paperRepo = new Question_papers_repository();
    var questionRepo = new Question_repository();
    var presenter = new Presenter(view, paperRepo,questionRepo);

    $('#create_question_paper').click(function(){
        render('./src/createQuestionPaper/create_question_paper.jade')
    });
    $('.questionPaperTitle').click(function(){
        var status = $(this).attr('id');
        presenter.getAllQuestionsFromPaper(status);
    });
});