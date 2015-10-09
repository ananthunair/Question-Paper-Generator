var mongoose = require('mongoose');
var lib = require("./question_paper_lib").lib;
var lodash = require('lodash');


exports.Question_repository = function () {
    var db = mongoose.connection;
    this.db = db;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("Questions Repo opened");
    });
}


exports.Question_repository.prototype = {

    create: function (questionDetails, onComplete) {
        var Question = mongoose.model("Question");
        var question = new Question(questionDetails);
        question.save(function (err, record) {
            var question = record._doc;
            var createTags = function () {
                var Tags = mongoose.model("Tags");
                var tags = new Tags(question.tags);
                tags.save(function (err, tags) {
                    err && console.log("Error while creating tags: ", err);
                });
            };

            err && console.log("Error while creating question: ", err);
            err || createTags();
            var savedQuestion = buildQuestion(question);
            onComplete(err,savedQuestion);
        });
    },

    fetchQuestions: function (onComplete) {
        var QuestionCollection = mongoose.model("Question");
        QuestionCollection.find({},function(err,questions){
            onComplete(err,questions.map(buildQuestion))
        });
    },

    getUniqueTags: function (onComplete) {
        var tags = mongoose.model("Tags");
        tags.find({}, function (err, tags) {
            onComplete(tags);
        })

    }
    //
    //showSelectedQuestion : function(questionIds,onComplete,tags){
    //    var formattedIds = '(' + questionIds.join(", ") + ')';
    //    var selectQuestion = "select id,question from questions where id in " + formattedIds;
    //    this.db.all(selectQuestion, onComplete)
    //},
    //
    //loadQuestions : function(tags,onComplete,selectedQuestion){
    //    var db = this.db;
    //    var repo = this;
    //    var selectedQuestionIds = lib.getQuestionIds(selectedQuestion);
    //    var tags = tags.map(lib.getFormatedTag);
    //
    //    var query = getQuestionIdQuery(tags);
    //    db.all(query,function(err,questionIds){
    //        var ids = lodash.difference(questionIds.map(lib.getTagId),selectedQuestionIds);
    //        repo.showSelectedQuestion(ids,onComplete);
    //    });
    //
    //}
};

var getTagQuery = function (id, tags) {
    var query = tags.reduce(function (query, tag) {
            return query += "(" + id + ",'" + tag + "'),"
        }, "insert into tags(questionId,tagName) values ").slice(0, -1) + ";";
    return query
}


var addTags = function (repo, tags) {
    repo.db.get("select max(id) as id from questions", function (err, id) {
        repo.db.run(getTagQuery(id.id, tags));
    })
};

var getQuestionIdQuery = function (tags) {
    var formattedTagList = '(' + tags.join(',') + ')';
    var query = "select questionId from tags where tagName in " + formattedTagList + " GROUP BY questionId HAVING COUNT(*) = " + tags.length;
    var allQuestionIdQuery = "select distinct questionId from tags";
    return tags.length == 0 ? allQuestionIdQuery : query;
};


var buildQuestion = function(dbquestion){
   return {"id":dbquestion._id.id,"question":dbquestion.question,"answer":dbquestion.answer,"tags":dbquestion.tags}
};