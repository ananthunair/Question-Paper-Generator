var lib = require("../../src/repository/question_paper_lib").lib;
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

context('#onLibLoad', function () {
    it('should give value of id key', function () {
        var id= {questionId:1};
        assert.equal(1,lib.getTagId(id));
    });

    it('should give value of tagName key',function(){
        var tag = {tagName:"javascript"}
        assert.equal("javascript",lib.getTagName(tag));
    });

    it('should give formatted tag',function(){
        var tag = "javascript";
        assert.equal("'javascript'",lib.getFormatedTag(tag));
    });

    it('should give true if list has duplicate values',function(){
        var questionIds = [1,2,2,3,4,4];
        assert.equal(true,lib.hasDuplicates(questionIds));
    });

    it('should fetch duplicates elements of the list',function(){
        var questionIds = [1,2,2,3,4,4];
        assert.equal([2,4].join(','),lib.getDuplicateQuestionIds(questionIds).join(','));
    });

    it('should get filtered questionIds for one tag',function(){
        var questionIds = [1,2,3];
        var tags = ["javascript"];
        assert.equal(questionIds,lib.getSelectedQuestionIds(tags,questionIds))
    });

    it('should get filtered questionIds for two tag',function(){
        var questionIds = [6,6];
        var selectedIds = [6];
        var tags = ["c","queue"];
        expect(selectedIds).to.eql(lib.getSelectedQuestionIds(tags,questionIds));
    });

    it('should not get any questionIds for two tag and no duplicate value',function(){
        var questionIds = [2,3,4,5];
        var selectedIds = [];
        var tags = ["java","object"];
        expect(selectedIds).to.eql(lib.getSelectedQuestionIds(tags,questionIds));
    });

});




