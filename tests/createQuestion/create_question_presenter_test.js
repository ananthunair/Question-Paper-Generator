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
        view.showErrorMessage =function(){}
        view.showSuccessMessage =function(){}
        view.clearScreen = function(){}
        view.getTags = function(){}
        view.setupTagBox =function(){}
        view.addSuggetions =function(){};
        var repo = {};
        repo.create = function(){};
        repo.getUniqueTags =function(){};
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
            var tags = ["array","object"];
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question);
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer);
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);

            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onCreate();
           moke_repo.create =function(questionDetails,onComplete){
              assert.equal(question,questionDetails.question);
              assert.equal(answer,questionDetails.answer);
              assert.equal(tags.length,questionDetails.tags.length);
           };
        });
        it("should create question with blank answer when answer is empty", function () {
            var question = "i have no answer";
            var answer = "";
            var tags=["array"];
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question);
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer);
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);

            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onCreate();
            moke_repo.create =function(questionDetails,onComplete){
                assert.equal(question,questionDetails.question);
                assert.equal(answer,questionDetails.answer);
                assert.equal(tags.length,questionDetails.tags.length);
            };

        });
        it("should not create question when question is empty", function () {
            var question = " ";
            var answer = " ";
            var tags =["array"];
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question);
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer);
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);

            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onCreate();
            moke_repo.create =function(questionDetails,onComplete){
                assert.equal(question,questionDetails.question);
                assert.equal(answer,questionDetails.answer);
                assert.equal(tags.length,questionDetails.tags.length);
            };
        });
        it("should not create question when tag is not specified", function () {
            var question = " how are you?";
            var answer = "fine ";
            var tags =[];
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question);
            mokito.JsMockito.when(moke_view).getAnswer().thenReturn(answer);
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);

            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onCreate();
            moke_repo.create =function(questionDetails,onComplete){
                assert.equal(question,questionDetails.question);
                assert.equal(answer,questionDetails.answer);
                assert.equal(tags.length,questionDetails.tags.length);
            };
        });
        it("Should give show success message if question is filled", function() {
            var question = "vijay pratap singh";
            var tags =["array"];
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question);
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            moke_repo.create =function(questionDetails,onComplete){
                onComplete(null);
            };
            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onCreate();
            mokito.JsMockito.verify(moke_view).showSuccessMessage();
        });

        it("Should give error message if question is empty", function() {
            var question = "";
            var tags =["array"];

            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question);
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            moke_repo.create = function(questionDetails,onComplete){
                onComplete({err:1});
            };
            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onCreate();
            mokito.JsMockito.verify(moke_view).showErrorMessage();
        });
        it("Should give error message if question has only empty spaces", function() {
            var question = "                 ";
            var tags =["array"];

            mokito.JsMockito.when(moke_view).getQuestion().thenReturn(question);
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            moke_repo.create = function(questionDetails,onComplete){
                onComplete({err:1});
            };
            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onCreate();
            mokito.JsMockito.verify(moke_view).showErrorMessage();

        });

        it("should autosuggest tagsName for new crated tag while creating question", function(){
            var newSuggetions =["raw"]
            mokito.JsMockito.when(moke_view).getTags().thenReturn(newSuggetions);
            mokito.JsMockito.when(moke_view).getQuestion().thenReturn("how are you?");
            var preseneter = new  Presenter(moke_view, moke_repo);
            preseneter.onCreate();
            mokito.JsMockito.verify(moke_view).addSuggetions(newSuggetions)
        })

    });
    context("#onDocumentReady",function(){
        it("should autosuggest tags Name for already added tags", function(){
            var suggestedTags = ["array", "object", "mocks"]
            moke_repo.getUniqueTags = function(oncomplete){
                oncomplete(null,suggestedTags)
            };
            var preseneter = new  Presenter(moke_view, moke_repo);
            preseneter.onDocumentReady();
            mokito.JsMockito.verify(moke_view).setupTagBox(suggestedTags)
        });
    });

});