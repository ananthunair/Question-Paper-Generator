var dbName = "qpg_prod";
var path = process.argv[2];

var fs = require('fs');
var repo = require('../src/repo.js');
var mongoose = require('mongoose');
repo.connectDb(dbName);

var Question = mongoose.model('Question');
var QuestionPaper = mongoose.model('QuestionPaper');
var Tags = mongoose.model('Tags');



var onJSON = function(err, data){
    var json = JSON.parse(data);
    if(err) return;

    var modelToDataHash = [
        {model: Question, data: json.questions},
        {model: QuestionPaper, data: json.questionPapers},
        {model: Tags, data: json.tags}
    ];

    modelToDataHash.forEach(function(row){
       if(row.data.length == 0) return;
       row.model.collection.insert(row.data, function(){
           console.log(row.model.modelName + " collection updated.");
       });
    });
};

fs.readFile(path, 'utf8', onJSON);
