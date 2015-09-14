var wrapWithCode = function(selectedText){
      return  selectedText.trim()? "<code>" + selectedText + "</code>":selectedText ;
}

exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}
exports.Presenter.prototype = {
    markAsCode: function () {
        var selection = this.view.getSelection();
        var text = selection.all_content;
        var selectedText = text.substring(selection.start, selection.end);
        var preFix = text.substring(0, selection.start);
        var postFix = text.substring(selection.end);
        this.view.setQuestion(preFix+wrapWithCode(selectedText)+postFix)
    },
    createQuestion: function () {
        this.repo.create(this.view.getQuestion(),this.view.getAnswer());
    }
}