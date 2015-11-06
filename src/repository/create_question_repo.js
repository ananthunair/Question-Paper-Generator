var mongoose = require('mongoose');
var lodash = require('lodash');


exports.Question_repository = function () {
    var db = mongoose.connection;
    this.db = db;
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
            err && console.log("Error while creating question: ", err);
            var savedQuestion = buildQuestion(question);
            !err && savedQuestion.tags.map(saveTag);
            onComplete(err,savedQuestion);
        });

    },

    updateQuestion: function(id, questionDetail, onComplete){
        var QP = mongoose.model("Question");
        QP.update({_id:id},questionDetail,{multi:true},function(err,updatedStatus){
            onComplete(err,{id:id},updatedStatus);
        });
    },


    fetchQuestions: function (onComplete,editModeContents) {
        var QuestionCollection = mongoose.model("Question");
        QuestionCollection.find({},function(err,questions){
            onComplete(err,questions.map(buildQuestion),editModeContents);
        });
    },

    fetchQuestionsOfSpecificTags : function(tags,onComplete){
        if(lodash.isEmpty(tags)){
            this.fetchQuestions(onComplete);
            return;
        };
        var QuestionCollection = mongoose.model("Question");
        QuestionCollection.find({'tags':{'$all':tags}},function(err,questions){
            onComplete(err,questions.map(buildQuestion));
        });
    },


    getUniqueTags: function (onComplete) {
        var tags = mongoose.model("Tags");
        tags.find({}, function (err, tags) {
            onComplete(err,lodash.uniq(tags.map(extractTag)));
        })
    },
    getQuestionsByIds : function(questionIds,onComplete){
        var QuestionCollection = mongoose.model("Question");
        QuestionCollection.find({"_id":{$in:questionIds}},function(err,questions){
            onComplete(err,questions);
        });
    },
    fetchQuestionDetail : function(id, onComplete){
        var QuestionCollection = mongoose.model("Question");
        QuestionCollection.findOne({_id:id},function(err,question){
            onComplete(err,question);
        })
    }

};

var saveTag = function(tag){
    var Tags = mongoose.model("Tags");
    var tags = new Tags({name : tag });
    tags.save(function (err, tags) {
        err && console.log("Error while creating tags: ", err);
    });
};

var extractTag = function(tag){
    return tag.name;
}

var buildQuestion = function(dbquestion){
   return {"id":dbquestion._id,"question":dbquestion.question,"answer":dbquestion.answer,"tags":dbquestion.tags}
};
