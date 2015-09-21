var Presenter = require('./dashboard/question_paper_to_show_presenter.js').Presenter;
var Contants = require('./Constants.js').constants;
var Question_papers_repository = require('./repository/question_papers_repo.js').Question_papers_repository
var jade = require('jade');

var view = {
    getAllQuestionsFromPaper:function(setOfQuestions){
    }
};


$(document).ready(function (){
    var repo = new Question_papers_repository(Contants.db_path);
    var presenter = new Presenter(view, repo);

    $('#create_question_paper').click(function(){
        render('./src/createQuestionPaper/create_question_paper.jade')
    })
    $('.questionP').click(function(){
        var status = $(this).attr('id');
        presenter.getAllQuestionsFromPaper(status);
    })
})