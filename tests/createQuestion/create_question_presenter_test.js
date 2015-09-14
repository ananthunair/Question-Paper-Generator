var Presenter = require('../../src/createQuestion/create_question_presenter.js').Presenter;
var assert = require('chai').assert;

describe("create_question_presenter", function () {
    context("#getCodeSnippet", function () {
        it("should mark selected text as code", function () {
            var text = "i have a piece of code";
            var expected = "i<code> have</code> a piece of code";
            var result = Presenter.getCodeSnippet(text, 1, 6);
            assert.equal(result, expected);
        })
        it("should mark selected text as code even the term exist multiple times", function () {
            var text = "i have a piece of code and i have another piece of code ";
            var expected = "i have a piece of code and i <code>have </code>another piece of code ";
            var result = Presenter.getCodeSnippet(text, 29, 34);
            assert.equal(result, expected);
        })
    })
});