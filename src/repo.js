var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var createDBConnection = function (dbname) {
   mongoose.connect('mongodb://localhost:27017/'+dbname);
};


var createQuestionPaperCollection = function () {

    var questionPaperSchema = new Schema({
        notes : Object,
        questions: [String],
        header: {title: String, marks: Number, duration: String}
    });


    mongoose.model('QuestionPaper', questionPaperSchema);
};

var createQuestionCollection = function () {
    var questionSchema = new Schema({
        question: String,
        answer: String,
        tags: [String]
    });
    mongoose.model('Question', questionSchema);
};

var createTagCollection = function () {
    var tagSchema = new Schema({name:String});
    mongoose.model('Tags', tagSchema);
};


exports.connectDb =function(dbname){

 if(mongoose.connection._readyState==0){
    createDBConnection(dbname);
    createQuestionPaperCollection();
    createQuestionCollection();
    createTagCollection();}

}
//autoIncrement.initialize(mongoose.connection)

