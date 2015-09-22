var sqlite3 = require('sqlite3');

exports.Question_repository = function(path){
    this.db = new sqlite3.Database(path);
    this.db.run("PRAGMA foreign_keys = 'ON';");
}


exports.Question_repository.prototype ={
    create:function(question, answer, tags){
        var questionQuery = "insert into questions(question, answer) values('"+question+"','"+answer+"')";
        var repo = this;
        this.db.run(questionQuery,function(){
            addTags(repo,tags);
        });
    },
    getAllQuestions : function(oncomplete){
        this.db.all("select id, question , answer from questions",oncomplete)
    },

    save :  function(allQuestions){
        var query = "";
    }
}

var getTagQuery=function(id,tags){
 var query = tags.reduce(function(query,tag){
        return query +="("+id+",'"+tag+"'),"
    },"insert into tags(questionId,tagName) values ").slice(0,-1)+";";
    console.log(query);
    return query
}


var addTags = function(repo,tags){
    repo.db.get("select max(id) as id from questions",function(err,id){
        repo.db.run(getTagQuery(id.id,tags));
    })
}