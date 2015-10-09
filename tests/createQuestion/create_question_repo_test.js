var questions_repo = require('../../src/repository/create_question_repo.js').Question_repository;
 require('../../src/repo.js');
var assert = require('chai').assert;
var repo ;

describe('create_question_repo', function() {
    beforeEach(function() {
        repo = new questions_repo();
       Question= repo.db.model("Question")
        Question.remove({},function(){})
    });
    describe("create",function(){
    it("should persist the record and return the same ",function(done){
        var questionDetails = {
            question: "var a =10; ",
            answer: "true",
            tags: ["array","object"]
        };
      repo.create(questionDetails,function(err,question){
          assert.equal(questionDetails.question,question.question);
          assert.equal(questionDetails.answer,question.answer);
          assert.equal(2,question.tags.length);
          assert.ok(question.id);
          done()
      })

    })});

    describe("fetchQuestions",function(){
        it("should fetch all question  ",function(done){
            var questionDetails = {
                question: "var a =10; ",
                answer: "true",
                tags: ["array","object"]
            };
            repo.create(questionDetails,function(err,question){
               repo.fetchQuestions(function(err,questions){
                   assert.equal(1,questions.length)
                   assert.equal(question.question,questions[0].question)
                   assert.equal(question.answer,questions[0].answer)
                   assert.equal(question.id,questions[0].id)
                   assert.equal(question.tags.length,questions[0].tags.length)
                   done()
               })
            })

        })})
});