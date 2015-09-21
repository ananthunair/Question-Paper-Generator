var sqlite3 = require('sqlite3');

exports.Question_repository = function(path){
    this.db = new sqlite3.Database(path);
    this.db.run("PRAGMA foreign_keys = 'ON';");
}


exports.Question_repository.prototype ={
    create:function(question, answer, tags){
        var questionQuery = "insert into questions(question, answer) values('"+question+"','"+answer+"')";
        //var questionId=1;
        //var tagsQuery = tags.reduce(function(query,tag){
        //    return query +="("+questionId+","+tag+"),"
        //},"insert into tags(questionId,tagName) values")

        //console.log(tagsQuery)
        this.db.run(questionQuery);
    },
    getAllQuestions : function(oncomplete){
        this.db.all("select id, question , answer from questions",oncomplete)
    },

    save :  function(allQuestions){
        var query = "";
    }




}
