var Presenter = require('../../src/Dashboard/question_paper_to_show_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_repo;

describe("create_question_presenter", function () {
    beforeEach(function () {
        var view = {};
        view.onQuestionPaperClick = function () {
        };
        var repo = {};
        repo.getQuestionIds = function () {
        };
        repo.getAllQuestionsOfPaper = function () {
        };
        repo.getTitle = function () {
        };
        moke_view = mokito.JsMockito.mock(view);
        moke_repo = mokito.JsMockito.mock(repo);
    })
    context(".questionP",function(){
        it("should show preview after clicking on question paper name", function () {
            var questionIds = [{questionId:1},{questionId:2}];
            var setOfQuestion = [{question:"what"},{question:"is"}];
            var id = "4";
            var questions = [1,2]
            var title = {questionPaperName:"kucchu dal do"};
            moke_repo.getQuestionIds = function(onComplete){
                onComplete(null, questionIds)
            }
            moke_repo.getAllQuestionsOfPaper = function(onComplete){
                onComplete(null, setOfQuestion)
            }
            moke_repo.getTitle = function(onComplete){
                onComplete(null, title)
            }
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.getAllQuestionsFromPaper(id);
            mokito.JsMockito.verify(moke_view).onQuestionPaperClick(setOfQuestion,title.questionPaperName);
        })

    })
})