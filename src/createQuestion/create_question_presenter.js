
exports.Presenter = {
    getCodeSnippet : function(text, start, end){
        var selectedText = text.substring(start, end);
        return text.replace(selectedText,"<code>"+selectedText+"</code>");
    }

}

