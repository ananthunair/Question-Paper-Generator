/**
 * Created by vijaypratapsingh on 15/09/15.
 */
var Presenter = require('../../src/createQuestionPaper/create_question_paper_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_repo;
var moke_paper_repo;
describe("create_question_paper_presenter", function () {
    beforeEach(function () {
        var view = {};
        view.setQuestions = function () {};
        view.showQuestions = function () {}
        view.getSelectedQuestions = function () {};
        view.addToQuestionPaper = function () {};
        view.openPreview =function(){};
        view.getQuestionPaperTitle = function(){};
        view.showSuccessMessage = function(){};
        view.showErrorMessage = function(){};
        view.showTotalNumberOfQuestion = function(){};
        view.addQuestionSelectionListener = function(){};
        view.deleteSelectedQuestions = function(){};
        view.getTags = function(){};
        view.setupTagBoxData = function(){};
        view.addRemovedQuestionToAllQuestions = function(){};
        view.showTotalNumberOfQuestion = function(){};
        var repo = {};
        var paper_repo = {};
        paper_repo.getAllQuestionPapers = function(){};
        paper_repo.saveQuestionPaper = function(){};
        repo.create = function () {};
        repo.getAllQuestions = function () {};
        moke_view = mokito.JsMockito.mock(view);
        moke_repo = mokito.JsMockito.mock(repo);
        moke_paper_repo = mokito.JsMockito.mock(paper_repo);
    });

    context('#onDocumentReady', function () {
        it('should load questions and show it on view', function () {
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'}];
            moke_repo.fetchQuestions = function (oncomplete) {
                oncomplete(null, questions)
            };
            var presenter = new Presenter(moke_view, moke_repo);

            presenter.onDocumentReady();
            moke_view.showQuestions =function(argument){
               assert.deepEqual(argument[1],[ { id: 1, question: 'how are you?', answer: 'fine' } ]);
            }
        })
    });
    context('#onAddClick', function () {
        it('should get selected questions and add it to question paper', function () {
            var questions = [{'id': '1', 'question': 'how are you?', 'answer': 'fine'}, {
                'id': '2',
                'question': 'how are you?',
                'answer': 'fine'
            }];
            var selectedQuestions = [{'id': '1', 'question': 'how are you?', 'answer': 'fine'}];
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.all_questions = questions;
            mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(['1']);
            presenter.onAddClick();
            assert.deepEqual(presenter.questionPaper, selectedQuestions)
            mokito.JsMockito.verify(moke_view).addToQuestionPaper(presenter.questionPaper)
        });

        it('should remove selected question from questios to select', function () {
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'},
                {'id': 2, 'question': 'how are you?', 'answer': 'fine'}];
            var remainingQuestions = [{'id': 2, 'question': 'how are you?', 'answer': 'fine'}];
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.all_questions = questions;
            mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn([1]);
            moke_view.showQuestions =function(arguments){
                assert.deepEqual(arguments,remainingQuestions)
            };
            presenter.onAddClick();
        });

        context('when some questions alreay in question paper ', function () {
            it('should get selected questions and append it to question paper', function () {
                var questions = [{'id': '1', 'question': 'how are you?', 'answer': 'fine'}, {
                    'id': '2',
                    'question': 'how are you?',
                    'answer': 'fine'
                }];
                var presenter = new Presenter(moke_view, moke_repo);
                presenter.all_questions = questions;
                mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(['1']);
                presenter.onAddClick();
                mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(['2']);
                presenter.onAddClick();
                assert.deepEqual(presenter.questionPaper, questions)
                mokito.JsMockito.verify(moke_view).addToQuestionPaper(presenter.questionPaper)
            })
        })
    });
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

    });
    context("#onSaveClck",function(){
        it('should show success if questions are saved in db',function(){
            var paperName = "objectQuestions";
            mokito.JsMockito.when(moke_view).getQuestionPaperTitle().thenReturn(paperName);
            moke_paper_repo.saveQuestionPaper = function(paperName,onComplete){
                onComplete(null);
            }
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            presenter.onSaveClick();
            mokito.JsMockito.verify(moke_view).showSuccessMessage();
        })
    });

    context("#onSaveClick",function(){
        it('should show success if questions are not saved in db',function(){
            var paperName = "objectQuestions";
            mokito.JsMockito.when(moke_view).getQuestionPaperTitle().thenReturn(paperName);
            moke_paper_repo.saveQuestionPaper = function(paperName,onComplete){
                onComplete({id:1,code:"sqlite_error"});
            };
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            presenter.onSaveClick();
            mokito.JsMockito.verify(moke_view).showErrorMessage();
        })
    });

    context("#onAddOrRemoveTag",function(){
        it("should load filtered question in the questionToSelect box",function(){
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'}];
            var tags = ["java","array"];
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            moke_repo.fetchQuestionsOfSpecificTags = function (tags,oncomplete) {
                oncomplete(null, questions)
            };
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.onAddOrRemoveTag();
            assert.deepEqual(presenter.all_questions, questions);
            moke_view.showQuestions =function(argument){
                assert.deepEqual(argument[1],[ { id: 1, question: 'how are you?', answer: 'fine' } ]);
            }
        });
        
        it("should not load filtered question which are already added paper",function(){
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'},
                {'id': 2, 'question': 'how are you again?', 'answer': 'notfine'}];
            var tags = ["java","array"];
            var questionPaper = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'}];
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            moke_repo.fetchQuestionsOfSpecificTags = function (tags,oncomplete) {
                oncomplete(null, questions)
            };
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.questionPaper = questionPaper;
            presenter.onAddOrRemoveTag();
            assert.deepEqual(presenter.all_questions, [questions[1]]);
            moke_view.showQuestions =function(argument){
                assert.deepEqual(argument[1],[ {'id': 2, 'question': 'how are you again?', 'answer': 'notfine'} ]);
            }
        });
    });

    context("#setAutoSuggestion",function() {
        it("should suggest saved tags", function () {
            var tags = ["java"];

            moke_repo.getUniqueTags = function (onComplete) {
                onComplete(null,tags);
            };
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.setAutosuggetions();
            mokito.JsMockito.verify(moke_view).setupTagBoxData(tags);
        })
    })

    context("#onRemoveQuestion", function(){
        it("should remove the question from selected questions",function(){
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            presenter.questionPaper = [{id:"someId",'question':"how are you?",'answer':"fine"}];
            presenter.all_questions = [{id:"someId",'question':"how are you?",'answer':"fine"}, {id:"otherId",'question':"where are you?",'answer':"hell"}];
            presenter.onRemoveQuestion("someId");
            mokito.JsMockito.verify(moke_view).addRemovedQuestionToAllQuestions(["someId", "how are you?"]);
            mokito.JsMockito.verify(moke_view).showTotalNumberOfQuestion(0);
        })
    })
})