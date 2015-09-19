var sqlite3 = require('sqlite3');

exports.Question_repository = function(path){
    this.db = new sqlite3.Database(path);
    this.db.run("PRAGMA foreign_keys = 'ON';");
}

function getValuesOfQuestions(questionPaper, id) {
    var values = "";
    questionPaper.forEach(function (question) {
        question["questionPaperId"] = id.id;
        values = '(' + question.id + ',' + question.questionPaperId + '),';
    })
    var values = values.replace(/,$/, "");
    return values;
}
exports.Question_repository.prototype ={
    create:function(question,answer){
        var query = "insert into questions(question, answer) values('"+question+"','"+answer+"')";
        this.db.run(query);
    },
    getAllQuestions : function(oncomplete){
        this.db.all("select id, question , answer from questions",oncomplete)
    },

    save :  function(allQuestions){
        var query = "";
    },

    saveQuestionPaper : function(questionPaperName,onComplete,questionPaper){
        var query = "insert into questionPapers(questionPaperName) values('"+questionPaperName+"')";
        var selectIdQuery = "select id from questionPapers where questionPaperName='"+questionPaperName+"'";
        var db =this.db;
        this.db.run(query);
        this.db.get(selectIdQuery,function(err,id){
            var insertQuery ="insert into questionDictionary(questionId,questionPaperId) values";
            var values = getValuesOfQuestions(questionPaper, id);
            db.run(insertQuery+values,onComplete)
        });


    }



}
