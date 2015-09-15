/**
 * Created by vijaypratapsingh on 15/09/15.
 */

exports.Presenter = function (view, questions_repo) {
    this.view = view;
    this.repo = questions_repo;
}

exports.Presenter.prototype = {
    getQuestions : function(rows) {
        var string = "";

        rows.forEach(function (row) {
            console.log("=====================  ",string)
            string += row.question + "\n"
        })
        return string;
    }
}