$(function(){
    $('#create_question').click(function(){
        var createQuestionPopUp =  jade.renderFile('./src/createQuestion/create_question.jade');
        $('#myModal').html(createQuestionPopUp);
    });
});