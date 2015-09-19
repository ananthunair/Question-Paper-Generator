/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('../../src/createQuestionPaper/create_question_paper_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_repo;
describe("create_question_paper_presenter", function () {
    beforeEach(function () {
        var view = {};
        view.setQuestions = function () {};
        view.showQuestions = function () {}
        view.getSelectedQuestions = function () {};
        view.addToQuestionPaper = function () {};
        view.openPreview =function(){};
        view.getQuestionPaperTitle = function(){};
        var repo = {};
        repo.create = function () {};
        repo.getAllQuestions = function () {};
        moke_view = mokito.JsMockito.mock(view);
        moke_repo = mokito.JsMockito.mock(repo);
    })

    context('#onDocumentReady', function () {
        it('should load questions and show it on view', function () {
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'}];
            moke_repo.getAllQuestions = function (oncomplete) {
                oncomplete(null, questions)
            }
            var presenter = new Presenter(moke_view, moke_repo)
            presenter.onDocumentReady()
            assert.deepEqual(presenter.all_questions, questions)
            mokito.JsMockito.verify(moke_view).showQuestions(questions)
        })
    })
    context('#onAddClick', function () {
        it('should get selected questions and add it to question paper', function () {
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'}, {
                'id': 2,
                'question': 'how are you?',
                'answer': 'fine'
            }];
            var selectedQuestions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'}];
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.all_questions = questions;
            mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(["1"])
            presenter.onAddClick();
            assert.deepEqual(presenter.questionPaper, selectedQuestions)
            mokito.JsMockito.verify(moke_view).addToQuestionPaper(presenter.questionPaper)
        })

        it('should remove selected question from questios to select', function () {
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'},
                {'id': 2, 'question': 'how are you?', 'answer': 'fine'}];
            var remainingQuestions = [{'id': 2, 'question': 'how are you?', 'answer': 'fine'}];
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.all_questions = questions;
            mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(["1"])
            moke_view.showQuestions =function(arguments){
                assert.deepEqual(arguments,remainingQuestions)
            }
            presenter.onAddClick();
        })

        context('when some questions alreay in question paper ', function () {
            it('should get selected questions and append it to question paper', function () {
                var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'}, {
                    'id': 2,
                    'question': 'how are you?',
                    'answer': 'fine'
                }];
                var presenter = new Presenter(moke_view, moke_repo);
                presenter.all_questions = questions;
                mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(["1"])
                presenter.onAddClick();
                mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(["2"])
                presenter.onAddClick();
                assert.deepEqual(presenter.questionPaper, questions)
                mokito.JsMockito.verify(moke_view).addToQuestionPaper(presenter.questionPaper)
            })
        })
    })
    context("#onPreviewClick",function(){
        it('should Open Preview Window',function(){
            var title = "Question Title"
            var questionPaper = [{id:1,'question':"how are you?",'answer':"fine"}]
            mokito.JsMockito.when(moke_view).getQuestionPaperTitle().thenReturn(title)
            var presenter =  new Presenter(moke_view,moke_repo);
            presenter.questionPaper = questionPaper
            presenter.onPreviewClick()
            mokito.JsMockito.verify(moke_view).openPreview(questionPaper, title)
        })

    })
})