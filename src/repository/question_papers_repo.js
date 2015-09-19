var sqlite3 = require('sqlite3');

exports.Question_papers_repository = function(path){
    this.db = new sqlite3.Database(path);
    this.db.run("PRAGMA foreign_keys = 'ON';");
}

exports.Question_papers_repository.prototype ={
    getAllQuestionPapers : function(oncomplete){
        this.db.all("select * from questionsPapers",oncomplete)
    }

}
