var questions_repo = require('../../src/repository/questions_repo.js').Question_repository;
var assert = require('chai').assert;
var sqlite3 = require('sqlite3');
var constants = require('../../src/Constants.js').constants
var repo ;

describe('create_question', function() {
    beforeEach(function() {
        repo = new questions_repo(constants.test_db_path);
        repo.db.run("delete FROM questions");
    });

    context("#insert questions into database",function(){
        it("Should insert data into questions table", function(done){
            var que_ans={
                question:"What is name of Ananthu?",
                answer:"Ananthu",
                tags:["array"]
            };
            repo.create(que_ans.question,que_ans.answer,que_ans.tags);
            var db = new sqlite3.Database(constants.test_db_path);
            db.get("select * from questions",function(err,row){
                assert.equal(row.question,que_ans.question)
                assert.equal(row.answer,que_ans.answer)
                done()
            })

        })
    });
});