var Presenter = require('./createQuestion/create_question_presenter.js').Presenter;
var Question_repository = require('./repository/questions_repo.js').Question_repository;
var view ={
    getSelection:function(){
        var textComponent = document.getElementById('question');
        return {all_content:textComponent.value,start:textComponent.selectionStart,end:textComponent.selectionEnd}
    }
    ,
    setQuestion:function(question){
        var textComponent = document.getElementById('question');
        textComponent.value=question;
    }
}


$(document).ready(function() {
    var repo = new  Question_repository();
    var presenter =new Presenter(view,repo);
    $("#markAsCode").on('click',function(){presenter.markAsCode()})

})

