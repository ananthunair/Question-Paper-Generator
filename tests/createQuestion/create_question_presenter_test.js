var Presenter = require('../../src/createQuestion/create_question_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
//var constant =require('../../src/Constants.js').constants;
var moke_view;
var moke_repo;
describe("create_question_presenter", function () {
    beforeEach(function(){
        var view ={};
        view.getSelection =function(){};
        view.setQuestion =function(){};
        view.getQuestion = function(){};
        view.getAnswer = function(){};
        moke_view=mokito.JsMockito.mock(view);
    })
    context("#markAsCode", function () {
        it("should mark selected text as code", function () {
            var text = "i have a piece of code";
            var expected_question = "i<code> have</code> a piece of code";
            mokito.JsMockito.when(moke_view).getSelection().thenReturn({all_content:text,start:1,end:6})

            var presenter = new Presenter(moke_view,moke_repo)
            presenter.markAsCode();

            mokito.JsMockito.verify(moke_view).setQuestion(expected_question)
        })
        it("should mark selected text as code even the term exist multiple times", function () {
            var text = "i have a piece of code and i have another piece of code ";
            var expected_question = "i have a piece of code and i <code>have </code>another piece of code ";
            mokito.JsMockito.when(moke_view).getSelection().thenReturn({all_content:text,start:29,end:34})

            var presenter = new Presenter(moke_view,moke_repo)
            presenter.markAsCode();

            mokito.JsMockito.verify(moke_view).setQuestion(expected_question)

        })
        it("should not mark as code if nothing is selected",function(){
            var text = "i have a piece of code and i have another piece of code ";

            mokito.JsMockito.when(moke_view).getSelection().thenReturn({all_content:text,start:23,end:23})

            var presenter = new Presenter(moke_view,moke_repo)
            presenter.markAsCode();

            mokito.JsMockito.verify(moke_view).setQuestion(text)
        })
    })

});