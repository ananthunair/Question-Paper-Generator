var sqlite3 = require('sqlite3');
var lib = require("./question_paper_lib").lib;
var lodash  = require('lodash');


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
    },
    getUniqueTags: function(onComplete){
        this.db.all("select distinct tagName from tags", function(err,tags){
           onComplete(tags.map(lib.getTagName));
        });
    },

    showSelectedQuestion : function(questionIds,onComplete,tags){
        var formattedIds = '(' + questionIds.join(", ") + ')';
        var selectQuestion = "select id,question from questions where id in " + formattedIds;
        this.db.all(selectQuestion, onComplete)
    },

    loadQuestions : function(tags,onComplete,selectedQuestion){
        var db = this.db;
        var repo = this;
        var selectedQuestionIds = lib.getQuestionIds(selectedQuestion);
        var tags = tags.map(lib.getFormatedTag);

        var query = getQuestionIdQuery(tags);
        db.all(query,function(err,questionIds){
            var ids = lodash.difference(questionIds.map(lib.getTagId),selectedQuestionIds);
            repo.showSelectedQuestion(ids,onComplete);
        });

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
};

var getQuestionIdQuery = function(tags){
    var formattedTagList = '('+tags.join(',')+')';
    var query = "select questionId from tags where tagName in "+formattedTagList+" GROUP BY questionId HAVING COUNT(*) = "+tags.length;
    var allQuestionIdQuery = "select distinct questionId from tags";
    return tags.length==0 ? allQuestionIdQuery : query;
} ;


