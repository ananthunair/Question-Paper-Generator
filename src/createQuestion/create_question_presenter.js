
exports.Presenter = {
    getCodeSnippet : function(text, start, end){
        var selectedText = text.substring(start, end);
        return text.substring(0, start) +"<code>" +selectedText + "</code>" + text.substring(end);
    }
}