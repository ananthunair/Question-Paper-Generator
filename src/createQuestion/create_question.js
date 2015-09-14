
function markAsCode(){
    var textComponent = document.getElementById('question');
    var selectedText;
    var startPos = textComponent.selectionStart;
    var endPos = textComponent.selectionEnd;
    selectedText = textComponent.value.substring(startPos, endPos)
    textComponent.value =  textComponent.value.replace(selectedText,"<code>"+selectedText+"</code>")

}
$(document).ready(function() {
    $("#markAsCode").on('click',markAsCode)

})