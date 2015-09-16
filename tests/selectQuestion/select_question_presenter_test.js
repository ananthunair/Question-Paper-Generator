/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('../../src/questionContainer/select_question_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_repo;
describe("select_question_presenter", function () {
    beforeEach(function(){
        var view ={};
        view.setQuestions =function(){};
        var repo = {};
        repo.create = function(){};
        moke_view=mokito.JsMockito.mock(view);
        moke_repo=mokito.JsMockito.mock(repo);
    })

    //context("#getQuestions", function(){
    //    it("should give all questions from db", function(){
    //        var questions = [{"question":"primeMinister of india","answer":"Modi"},{"question":"vikas2","answer":"vikas2@email.com"}];
    //        var expectedQuestions = "<div> <input type=checkbox value=primeMinister of india>primeMinister of india</div> <br><div> <input type=checkbox value=vikas2>vikas2</div> <br>";
    //        var presenter = new Presenter(moke_view, moke_repo);
    //        presenter.getQuestions(questions);
    //        mokito.JsMockito.verify(moke_view).setQuestions(expectedQuestions);
    //    })
    //})
})