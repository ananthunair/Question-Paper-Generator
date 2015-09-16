$(function(){
    $('#create_question').click(function(){
      render('./src/createQuestion/create_question.jade')
    })
    $('#create_question_paper').click(function(){
        render('./src/createQuestionPaper/create_question_paper.jade')
    })
})