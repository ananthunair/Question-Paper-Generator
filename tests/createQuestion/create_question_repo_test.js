var questions_repo = require('../../src/repository/create_question_repo.js').Question_repository;
var assert = require('chai').assert;
var sqlite3 = require('sqlite3');
var constants = require('../../src/Constants.js').constants
var repo ;

describe('create_question', function() {
    beforeEach(function() {
        repo = new questions_repo(constants.test_db_path);
        repo.db.run("delete FROM questions");
    });

});