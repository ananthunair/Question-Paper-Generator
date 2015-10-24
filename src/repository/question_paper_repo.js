var mongoose = require('mongoose');
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
        QP.update({_id:paperId},paperForUpdate,{multi:true},function(err,updatedStatus){
            onComplete(err,updatedStatus);
        });
    },

    getPaper : function(paperid,onComplete) {
        var QP = mongoose.model("QuestionPaper");
        QP.findOne({'_id' : paperid },function(err,paper){
            onComplete(err,buildPaper(paper));
        });
    }

};



var buildPaper = function(dbPaper){
    return {id:dbPaper._id,notes:dbPaper.notes,questions:dbPaper.questions,header:buildHeader(dbPaper.header)};
};
var buildHeader = function(dbHeader){
    return { duration: dbHeader.duration, marks:dbHeader.marks, title: dbHeader.title };
};
var buildQuestion =function(dbQuestion){
    return {id:dbQuestion.id,note:dbQuestion.note};
};

