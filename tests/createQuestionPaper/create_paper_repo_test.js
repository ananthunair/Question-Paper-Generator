var question_paper_repo = require('../../src/repository/question_paper_repo.js').Question_papers_repository;
require('../../src/repo.js');
var assert = require('chai').assert;
var repo;

describe('create_paper_repo', function () {
    beforeEach(function () {
        repo = new question_paper_repo();
        Paper = repo.db.model('QuestionPaper');
        Paper.remove({}, function () {
        })
    });
    describe("save", function () {
        it("should persist the paper and return the same ", function (done) {
            var questionPaper = {
                questions: [{id:"someId",note:""}],
                header: {title: "array test#1", marks: 100, duration: "1 hour"}
            };
            repo.saveQuestionPaper(questionPaper, function (err, savedQuestionPaper) {
                assert.deepEqual(savedQuestionPaper.header,questionPaper.header);
                assert.deepEqual(savedQuestionPaper.questions[0],questionPaper.questions[0]);
                assert.ok(savedQuestionPaper.questions[0].id);
                done()
            });

        })
    });
    describe('fetch',function(){
        it('should fetch all papers from db',function(done){
            var questionPaper = {
                questions: [{id:"someId",note:""}],
                header: {title: "array test#1", marks: 100, duration: "1 hour"}
            };
            repo.saveQuestionPaper(questionPaper, function (err, savedQuestionPaper) {
                repo.fetchQuestionPapers(function(err,papers) {
                    assert.equal(1,papers.length);
                    console.log(questionPaper.header);
                    assert.deepEqual(papers[0].header,questionPaper.header);
                    assert.deepEqual(papers[0].questions[0],questionPaper.questions[0]);
                    done();
                });
            });
        })
    })
});