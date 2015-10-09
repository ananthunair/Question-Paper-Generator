var mongoose = require('mongoose');
var QuestionPaper ;
exports.Question_papers_repository = function(){
    var db = mongoose.connection;
    this.db = db;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("Questions Repo opened");
    });
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

    //getQuestionIds : function(onComplete, id) {
    //    var query = "select questionId from questionDictionary where questionPaperId=" + id;
    //    this.db.all(query, onComplete)
    //
    //},
    //getAllQuestionsOfPaper : function(onComplete, questions){
    //    var qeury = "select question from questions where id in(" + questions.join(",")  +");"
    //    this.db.all(qeury, onComplete);
    //},
    //getTitle : function(onComplete, questionPaperId){
    //    var query = "select questionPaperName from questionPapers where id=" + questionPaperId;
    //    this.db.get(query, onComplete);
    //}
};



var buildPaper = function(dbPaper){
    return {id:dbPaper._id.id,questions:dbPaper.questions.map(buildQuestion),header:buildHeader(dbPaper.header)};
};
var buildHeader = function(dbHeader){
    return { duration: dbHeader.duration, marks:dbHeader.marks, title: dbHeader.title };
};
var buildQuestion =function(dbQuestion){
    return {id:dbQuestion.id,note:dbQuestion.note};
};