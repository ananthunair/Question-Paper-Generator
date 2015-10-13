var questions_repo = require('../../src/repository/create_question_repo.js').Question_repository;
require('../../src/repo.js').connectDb("qpg_test");
var assert = require('chai').assert;
var repo ;

describe('create_question_repo', function() {
    beforeEach(function () {
        repo = new questions_repo();
        Question = repo.db.model("Question");
        Tags = repo.db.model("Tags");

        Question.remove({}, function () {
        });
        Tags.remove({}, function () {
        });

    });
    describe("create", function () {
        it("should persist the record and return the same ", function (done) {
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array", "object"]
            };
            repo.create(questionDetails, function (err, question) {
                assert.equal(questionDetails.question, question.question);
                assert.equal(questionDetails.answer, question.answer);
                assert.equal(2, question.tags.length);
                assert.ok(question.id);
                done()
            })
        })
    });

    describe("fetchQuestions", function () {
        it("should fetch all question  ", function (done) {
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array", "object"]
            };
            repo.create(questionDetails, function (err, question) {
                repo.fetchQuestions(function (err, questions) {
                    assert.equal(1, questions.length);
                    assert.equal(question.question, questions[0].question);
                    assert.equal(question.answer, questions[0].answer);
                    assert.deepEqual(question.id, questions[0].id);
                    assert.equal(question.tags.length, questions[0].tags.length);
                    done();
                })
            })

        });

        it("should fetch question that have specific tags", function (done) {
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array", "object"]
            };
            repo.create(questionDetails, function (err, question) {
                repo.fetchQuestionsOfSpecificTags(['array'], function (err, questions) {
                    assert.equal(1, questions.length);
                    assert.equal(question.question, questions[0].question);
                    assert.equal(question.answer, questions[0].answer);
                    assert.deepEqual(question.id, questions[0].id);
                    assert.equal(question.tags.length, questions[0].tags.length);
                    done();
                })
            })
        });
        it("should fetch all questions when tags are not given", function (done) {
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array","object"]
            };
            repo.create(questionDetails, function (err, question) {
                repo.fetchQuestionsOfSpecificTags([], function (err, questions) {
                    assert.equal(1, questions.length);
                    assert.equal(question.question, questions[0].question);
                    assert.equal(question.answer, questions[0].answer);
                    assert.deepEqual(question.id, questions[0].id);
                    assert.equal(question.tags.length, questions[0].tags.length);
                    done();
                })
            })
        });
    });
    describe("getAllQuestionsOfPaper", function () {
        it('should fetch question that have given id', function (done) {
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array", "object"]
            };
            repo.create(questionDetails, function (err, savedQuestion) {
                repo.getQuestionsByIds([savedQuestion.id], function (err, questions) {
                    assert.equal(1, questions.length);
                    assert.equal(questionDetails.question, questions[0].question);
                    assert.equal(questionDetails.answer, questions[0].answer);
                    assert.equal(questionDetails.tags.length, questions[0].tags.length);
                    done();
                });
            })
        })
    });
    describe('getUniqueTags',function(){
        it('should fetch unique tags',function(done) {
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array", "object"]
            };
            repo.create(questionDetails, function (err, savedQuestion) {
                repo.getUniqueTags(function(err,tags){
                    assert.equal(2,tags.length);
                    assert.equal('array',tags[0]);
                    assert.equal('object',tags[1]);
                    done();
                });
            });
        });
        it('should fetch unique tags when the tags are not unique',function(done) {
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array", "object","array","array","object"]
            };
            repo.create(questionDetails, function (err, savedQuestion) {
                repo.getUniqueTags(function(err,tags){
                    assert.equal(2,tags.length);
                    assert.equal('array',tags[0]);
                    assert.equal('object',tags[1]);
                    done();
                });
            });
        });
    })
});