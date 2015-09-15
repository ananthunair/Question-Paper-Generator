var Presenter = require('./createQuestion/create_question_presenter.js').Presenter;
var Question_repository = require('./repository/questions_repo.js').Question_repository;
var Contants = require('./Constants.js').constants;
var view ={
    getSelection:function(){
        var textComponent = document.getElementById('question');
        return {all_content:textComponent.value,start:textComponent.selectionStart,end:textComponent.selectionEnd}
    }
    ,
    setQuestion:function(question){
        return $('#question').val(question)
    },
    getQuestion:function(){
        return $('#question').val()
    },
    getAnswer:function(){
        return $('#answer').val()
    }

}


$(document).ready(function() {
    var repo = new  Question_repository(Contants.get_db_path());
    var presenter =new Presenter(view,repo);
    $("#markAsCode").on('click',function(){presenter.markAsCode()})
    $("#create").on('click',function(){presenter.onCreate()})

})

