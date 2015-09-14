var presenter = require('./createQuestion/create_question_presenter.js').Presenter;

function markAsCode(){
    var textComponent = document.getElementById('question');
    var startPos = textComponent.selectionStart;
    var endPos = textComponent.selectionEnd;
    textComponent.value =  presenter.getCodeSnippet(textComponent.value,startPos,endPos);
}


$(document).ready(function() {
    $("#markAsCode").on('click',markAsCode)
})

