var dataFile = process.argv[2];
var fs = require('fs');
require('../src/repo.js').connectDb("qpg_prod");

var Question_papers_repository = require('../src/repository/question_paper_repo.js').Question_papers_repository;
var Question_repository = require('../src/repository/create_question_repo.js').Question_repository;
var questionRepo = new Question_repository();
var questionPaperRepo = new Question_papers_repository();

var savedQuestions = [];

var onData = function (err, data) {
    if (err) return;
    var dataJson = JSON.parse(data);
    dataJson.questions.forEach(function (question) {
        questionRepo.create(question, function (err, que) {
            console.log("Question inserted");
            savedQuestions.push(que);
        });
    });

    dataJson.papers.forEach(function (paper) {
        var questionsOfPaper = dataJson.questions.filter(function (que) {
            return que.qPapers.indexOf(paper.header.title) != 0
        });

        paper.questions = questionsOfPaper.map(function (q) {
            return q._id;
        });

        questionPaperRepo.saveQuestionPaper(paper, function (err, paper) {
            console.log("Paper inserted.");
        });
    });
};

fs.readFile(dataFile, 'utf8', onData);