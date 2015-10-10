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
                questions: [{id: "someId", note: ""}],
                header: {title: "array test#1", marks: 100, duration: "1 hour"}
            };
            repo.saveQuestionPaper(questionPaper, function (err, savedQuestionPaper) {
                assert.deepEqual(savedQuestionPaper.header, questionPaper.header);
                assert.deepEqual(savedQuestionPaper.questions[0], questionPaper.questions[0]);
                assert.ok(savedQuestionPaper.questions[0].id);
                done()
            });

        })
    });
    describe('fetch', function () {
        it('should fetch all papers from db', function (done) {
            var questionPaper = {
                questions: [{id: "someId", note: ""}],
                header: {title: "array test#1", marks: 100, duration: "1 hour"}
            };
            repo.saveQuestionPaper(questionPaper, function (err, savedQuestionPaper) {
                repo.fetchQuestionPapers(function (err, papers) {
                    assert.equal(1, papers.length);
                    assert.deepEqual(papers[0].header, questionPaper.header);
                    assert.deepEqual(papers[0].questions[0], questionPaper.questions[0]);
                    done();
                });
            });
        })
    })
    describe('getQuestionIds', function () {
        it('should fetch all question id from given paper', function (done) {
            var questionPaper = {
                questions: [{id: "someId", note: ""}],
                header: {title: "array test#1", marks: 100, duration: "1 hour"}
            };
            repo.saveQuestionPaper(questionPaper, function (err, savedPaper) {
                repo.getPaper(savedPaper.id, function (err,paper) {
                    assert.deepEqual(questionPaper.questions[0], paper.questions[0]);
                    assert.equal(questionPaper.questions.length, paper.questions.length);
                    assert.deepEqual(questionPaper.header,paper.header)
                    done();
                })
            })
        });
        //it('should fetch title of given paper',function(done){
        //    var questionPaper = {
        //        questions: [{id: "someId", note: ""}],
        //        header: {title: "array test#1", marks: 100, duration: "1 hour"}
        //    };
        //    repo.saveQuestionPaper(questionPaper, function (err, savedPaper) {
        //        repo.getTitle(savedPaper.i)
        //    })
    })

});