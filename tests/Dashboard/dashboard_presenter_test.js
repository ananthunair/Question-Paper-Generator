var Presenter = require('../../src/Dashboard/dashboard_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_repo;

describe("create_question_presenter", function () {
    beforeEach(function () {
        var view = {};
        view.showQuestionPapers = function () {
        };
        var repo = {};
        repo.getAllQuestionPapers = function () {
        };
        moke_view = mokito.JsMockito.mock(view);
        moke_repo = mokito.JsMockito.mock(repo);
    })
    context("on document ready",function(){
        it("should show all question paper on dashboard",function(){
            var questionPapers = [{id:1,questionPaperName:"dummy"}];
            moke_repo.getAllQuestionPapers = function (oncomplete) {
                oncomplete(null, questionPapers)
            }
            var presenter = new Presenter(moke_view,moke_repo);
            presenter.onDocumentReady();
            mokito.JsMockito.verify(moke_view).showQuestionPapers(questionPapers)
        })
    })
})