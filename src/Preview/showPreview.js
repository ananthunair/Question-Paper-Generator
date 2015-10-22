var jade = require('jade');


exports.show =function(questionPaper,screen){
    var preview = jade.renderFile("./src/Preview/preview.jade",{'questionPaper':questionPaper})
    var previewWindow = window.open("","width=600,height=600,scrollbars=yes", {
        "focus": true
    })
    previewWindow.focus();
    previewWindow.moveTo(0,0);
    previewWindow.resizeTo(screen.width, screen.height)
    clearDocument(previewWindow.document)
    previewWindow.document.write(preview)
}
var clearDocument =function(document){
    document.open()
    document.close()
}