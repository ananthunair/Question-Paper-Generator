var mongoose = require('mongoose');
var lodash = require('lodash');
var QuestionPaper ;
exports.Question_papers_repository = function(){
    var db = mongoose.connection;
    this.db = db;
    db.on('error', console.error.bind(console, 'connection error:'));
    //db.once('open', function (callback) {
    //    console.log("Questions Repo opened");
    //});
    QuestionPaper = mongoose.model('QuestionPaper');
};

exports.Question_papers_repository.prototype = {

    fetchQuestionPapers: function (onComplete) {
        var QP = mongoose.model("QuestionPaper");
        QP.find({},function(err,papers){
            onComplete(err,papers.map(buildPaper));
        });
    },

    saveQuestionPaper : function(questionPaper,onComplete) {
        var paper = new QuestionPaper(questionPaper);
        paper.save(function (err, paper) {
            err && console.log("Error while creating question: ", err);
            onComplete(err,buildPaper(paper));
        });
    },

    updateQuestionPaper : function(paperId,paperForUpdate,onComplete){
        var QP = mongoose.model("QuestionPaper");
        QP.update({_id:paperId},paperForUpdate,{upsert:true},function(err,updatedStatus){
            onComplete(err,{id:paperId},updatedStatus);
        });
    },

    getPaper : function(paperid,onComplete) {
        var QP = mongoose.model("QuestionPaper");
        QP.findOne({'_id' : paperid },function(err,paper){
            onComplete(err,buildPaper(paper));
        });
    },
    fetchPapersOfSpecificTag :function(tags,onComplete){
        if(lodash.isEmpty(tags)){
            this.fetchQuestionPapers(onComplete);
            return;
        };
        var QuestionPaper = mongoose.model("QuestionPaper");
        QuestionPaper.find({'tags':{'$all':tags}},function(err,papers){
            onComplete(err,papers.map(buildPaper));
        });
    }

};



var buildPaper = function(dbPaper){
    return {id:dbPaper._id,notes:dbPaper.notes,questions:dbPaper.questions,tags:dbPaper.tags,header:buildHeader(dbPaper.header)};
};
var buildHeader = function(dbHeader){
    return { duration: dbHeader.duration, marks:dbHeader.marks, title: dbHeader.title };
};


