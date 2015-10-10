var Presenter = require('../../src/Dashboard/question_paper_to_show_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_paper_repo;
var moke_question_repo;
describe("create_question_presenter", function () {
    beforeEach(function () {
        var view = {};
        view.onQuestionPaperClick = function () {
        };
        var paper_repo = {};
        paper_repo.getQuestionIds = function () {
        };
        paper_repo.getAllQuestionsOfPaper = function () {
        };
        paper_repo.getTitle = function () {
        };
        paper_repo.getPaper =new Function()
        var question_repo ={}

        moke_view = mokito.JsMockito.mock(view);
        moke_paper_repo = mokito.JsMockito.mock(paper_repo);
        moke_question_repo = mokito.JsMockito.mock(question_repo)
    })
    context(".questionP",function(){
        it("should show preview after clicking on question paper name", function () {
            var paperId ="PaperId"
            var paper ={id:paperId,questions:[{id:"someid",note:""}],header: {title: "array test#1", marks: 100, duration: "1 hour"}}
            var setOfQuestion =[{id:"someid",question:"question",answer:"answer",tags:["array","object"]}]
            moke_paper_repo.getPaper =function(id,onComplete){
                assert.equal(id,paperId);
                onComplete(null,paper);
            }
            moke_question_repo.getQuestionsByIds =function(ids,onComplete){
                assert.equal(ids[0],"someid")
                onComplete(null,setOfQuestion)
            }
            var presenter = new Presenter(moke_view, moke_paper_repo,moke_question_repo);
            presenter.getAllQuestionsFromPaper(paperId);
            mokito.JsMockito.verify(moke_view).onQuestionPaperClick(setOfQuestion,paper.header.title);
        })

    })
})