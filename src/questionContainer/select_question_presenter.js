/**
 * Created by vijaypratapsingh on 15/09/15.
 */

exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {
    getQuestions : function(rows) {
        var questions = "";
        rows.forEach(function (row) {
            questions += "<div> <input type=" + "checkbox " + "value=" + row.question + ">" + row.question + "</div> <br>"
        })
        this.view.setQuestions(questions);
    }
}