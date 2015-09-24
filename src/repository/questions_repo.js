var sqlite3 = require('sqlite3');

exports.Question_repository = function(path){
    this.db = new sqlite3.Database(path);
    this.db.run("PRAGMA foreign_keys = 'ON';");
}


function showSelectedQuestion(questionIds, db, onComplete) {
    var flatQuestionId = [].concat.apply([], questionIds);
    var uniqueQuestionIds = flatQuestionId.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
    });
    var formattesIds = '(' + uniqueQuestionIds.join(", ") + ')';
    var selectQuestion = "select id,question from questions where id in " + formattesIds;
    db.all(selectQuestion, onComplete);
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
    },
    getUniqueTags: function(onComplete){
        this.db.all("select distinct tagName from tags", function(err,tags){
           onComplete(tags.map(getTagName))
        });
    },

    fetchQuestionIds : function(tags,onComplete){
        var db = this.db;
        var questionIds = []
        tags.map(function(tag, index, tags){
            var query = "select questionId as id from tags where tagName='"+tag+"'";
            db.all(query,function(err,res){
                var ids = res.map(function(id){
                    return id.id;
                });
                questionIds.push(ids);
                if(tags.indexOf(tag)==tags.length-1)
                    showSelectedQuestion(questionIds, db, onComplete);
            })
        })
    }
}

var getTagQuery=function(id,tags){
 var query = tags.reduce(function(query,tag){
        return query +="("+id+",'"+tag+"'),"
    },"insert into tags(questionId,tagName) values ").slice(0,-1)+";";
    return query
}


var addTags = function(repo,tags){
    repo.db.get("select max(id) as id from questions",function(err,id){
        repo.db.run(getTagQuery(id.id,tags));
    })
}

var getTagName = function(tag){return tag.tagName}

