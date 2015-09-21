var Presenter = require('../../src/createQuestion/create_question_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_repo;

describe("create_question_presenter", function () {
    beforeEach(function(){
        var view ={};
        view.getSelection =function(){};
        view.setQuestion =function(){};
        view.getQuestion = function(){};
        view.getAnswer = function(){};
        view.isQuestionFieldEmpty =function(){};
        view.showErrorMessage =function(){}
        view.showSuccessMessage =function(){}
        view.clearScreen = function(){}
        view.getTags = function(){}
        var repo = {};
        repo.create = function(){};
        moke_view=mokito.JsMockito.mock(view);
        moke_repo=mokito.JsMockito.mock(repo);
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
    context("#onCreate", function () {
        it("should create question with answer and tags", function () {
            var question = "do you have a piece of code?";
            var answer = "yes"
            var tags = ["array","object"]
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question)
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer)
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags)

            var presenter = new Presenter(moke_view,moke_repo)
            presenter.onCreate();
            mokito.JsMockito.verify(moke_repo).create(question,answer,tags)
        })
        it("should create question with blank answer when answer is empty", function () {
            var question = "i have no answer";
            var answer = ""
            var tags=["array"]
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question)
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer)
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags)

            var presenter = new Presenter(moke_view,moke_repo)
            presenter.onCreate();

            mokito.JsMockito.verify(moke_repo).create(question,answer,tags)
        })
        it("should not create question when question is empty", function () {
            var question = " ";
            var answer = " "
            var tags =["array"]
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question)
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer)
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags)

            var presenter = new Presenter(moke_view,moke_repo)
            presenter.onCreate();

            mokito.JsMockito.verifyNoMoreInteractions(moke_repo)
        })
        it("should not create question when tag is not specified", function () {
            var question = " how are you?";
            var answer = "fine "
            var tags =[]
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question)
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer)
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags)

            var presenter = new Presenter(moke_view,moke_repo)
            presenter.onCreate();

            mokito.JsMockito.verifyNoMoreInteractions(moke_repo)
        })
    })
});