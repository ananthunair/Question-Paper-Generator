var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var createDBConnection = function () {
    mongoose.connect('mongodb://localhost:27017/questionBank');
};


var createQuestionPaperCollection = function () {
    var questionSchema = new Schema({
        id: Number,
        note: String
    });

    var questionPaperSchema = new Schema({
        id: Number,
        questions: [questionSchema],
        header: {title: String, marks: Number, duration: String}

    });


    mongoose.model('QuestionPaper', questionPaperSchema);
};

var createQuestionCollection = function () {
    var questionSchema = new Schema({
        id: Number,
        question: String,
        answer: String,
        tags: [String]
    });
    mongoose.model('Question', questionSchema);
};

var createTagCollection = function () {
    var tagSchema = new Schema([String]);
    mongoose.model('Tags', tagSchema);
};

createDBConnection();
createQuestionPaperCollection();
createQuestionCollection();
createTagCollection();

//autoIncrement.initialize(mongoose.connection)

