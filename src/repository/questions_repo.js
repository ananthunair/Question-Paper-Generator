var sqlite3 = require('sqlite3');

exports.Question_repository = function(path){
    this.db = new sqlite3.Database(path);
    this.db.run("PRAGMA foreign_keys = 'ON';");
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
    }




}
