var sqlite3 = require('sqlite3');


exports.Question_repository = function(path){
    this.db = new sqlite3.Database(path);
    this.db.run("PRAGMA foreign_keys = 'ON';");
}

exports.Question_repository.prototype ={
    create:function(question,answer){
        console.log("question = ",question)
        console.log("answer = ",answer)
    },

    getQuestions : function(oncomplete){
        this.db.all("select question , answer from questions",oncomplete)
    }

}