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
        var checkboxName = "questionCheckBox";
        rows.forEach(function (row) {
            //questions += "<div id="+ "question_container" +"> <input type=" + "checkbox "+" name=" +checkboxName+ " value=" + row.question + ">" + row.question + "</div> <br>"
            questions += "<input type=" + "checkbox "+" name=" +checkboxName+  ">" + row.question + "<br>";
        })
        this.view.setQuestions(questions );
    }

}