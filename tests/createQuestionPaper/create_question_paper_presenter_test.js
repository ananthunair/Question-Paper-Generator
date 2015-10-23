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
        view.deleteSelectedQuestions = function(){};
        view.getTags = function(){};
        view.setupTagBoxData = function(){};
        view.addRemovedQuestionToAllQuestions = function(){};
        view.showTotalNumberOfQuestion = function(){};
        view.title = function(){};
        view.showError = function(){};
        view.renderDashbord = function(){};
        view.addSuggetions =function(){};
        view.getNote = function(){};
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
            var tags = [""];
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            moke_repo.fetchQuestionsOfSpecificTags = function (tags,oncomplete) {
                oncomplete(null, questions);
            };
            var selectedQuestions = [{'id': '1', 'question': 'how are you?', 'answer': 'fine'}];
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.all_questions = questions;
            mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(['1']);
            presenter.onAddClick();
            assert.deepEqual(presenter.questionPaper, selectedQuestions);
            mokito.JsMockito.verify(moke_view).addToQuestionPaper(presenter.questionPaper)
        });

        it('should remove selected question from questions to select', function () {
            var questions = [{'id': 1, 'question': 'how are you?', 'answer': 'fine'},
                {'id': 2, 'question': 'how are you?', 'answer': 'fine'}];
            var tags = [];
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            moke_repo.fetchQuestionsOfSpecificTags = function (tags,oncomplete) {
                oncomplete(null, questions);
            };
            var remainingQuestions = [{'id': 2, 'question': 'how are you?', 'answer': 'fine'}];
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.all_questions = questions;
            mokito.JsMockito.when(moke_view).getSelectedQuestions().thenReturn(['1']);
            moke_view.showQuestions = function(arguments){
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
                var tags = [""];
                mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
                moke_repo.fetchQuestionsOfSpecificTags = function (tags,oncomplete) {
                    oncomplete(null, questions);
                };
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
            var questionPaper = [{id:1,'question':"how are you?",'answer':"fine"}];
            var notes = {1:"some note"};
            mokito.JsMockito.when(moke_view).getQuestionPaperTitle().thenReturn(title)
            var presenter =  new Presenter(moke_view,moke_repo);
            presenter.questionPaper = questionPaper;
            presenter.notes = notes;
            presenter.onPreviewClick()
            mokito.JsMockito.verify(moke_view).openPreview(questionPaper,notes, title)
        })

    });
    context("#onSaveClick",function(){
        it('should render dashbord if paper is saved successfully',function(){
            var paperName = "objectQuestions";
            mokito.JsMockito.when(moke_view).title().thenReturn(paperName);
            moke_paper_repo.saveQuestionPaper = function(paperName,onComplete){
                onComplete(null,{id:"paperId"});
            }
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            presenter.onSaveClick();
            mokito.JsMockito.verify(moke_view).renderDashbord("paperId");
        })
    });

    context("#onSaveClick",function(){
        it('should show error if questions are not saved in db',function(){
            var paperName = "";
            mokito.JsMockito.when(moke_view).title().thenReturn(paperName);
            moke_paper_repo.saveQuestionPaper = function(paperName,onComplete){
                onComplete(null);
            };
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            presenter.onSaveClick();
            mokito.JsMockito.verify(moke_view).showError();
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
            moke_view.showQuestions =function(argument){
                assert.deepEqual(argument[0], { id: 1, question: 'how are you?', answer: 'fine' } );
            }
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.onAddOrRemoveTag();

            assert.deepEqual(presenter.all_questions, questions);

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
            moke_view.showQuestions = function(argument){

                assert.deepEqual(argument[0], {'id': 2, 'question': 'how are you again?', 'answer': 'notfine'} );
            }
            var presenter = new Presenter(moke_view, moke_repo);
            presenter.questionPaper = questionPaper;
            presenter.onAddOrRemoveTag();
            assert.deepEqual(presenter.all_questions, [questions[1]]);

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
    });

    context("#onRemoveQuestion", function(){
        it("should remove the question from selected questions",function(){
            var tags = [""];
            mokito.JsMockito.when(moke_view).getTags().thenReturn(tags);
            var questionToShow = [ { id: 'someId', question: 'how are you?', answer: 'fine' },
                { id: 'otherId', question: 'where are you?', answer: 'hell' } ];
            moke_repo.fetchQuestionsOfSpecificTags = function (tags,oncomplete) {
                oncomplete(null, questionToShow);
            };
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            presenter.questionPaper = [{id:"otherId",'question':"where are you?",'answer':"hell"}];
            presenter.notes ={1:"somenotes"};
            presenter.all_questions = [{id:"someId",'question':"how are you?",'answer':"fine"},{id:"otherId",'question':"where are you?",'answer':"hell"} ];
            presenter.onRemoveQuestion('someId');
            mokito.JsMockito.verify(moke_view).addToQuestionPaper(presenter.questionPaper,presenter.notes);
            mokito.JsMockito.verify(moke_view).showTotalNumberOfQuestion(presenter.questionPaper.length);


        })
    })
    context("#onNewQuestionAdded", function() {
        it("should reapply the filters on new set of questions and update suggested tags with new created tags", function () {
            mokito.JsMockito.when(moke_view).getTags().thenReturn(["array"])
            var presenter = new Presenter(moke_view, moke_repo, moke_paper_repo);

            moke_repo.fetchQuestionsOfSpecificTags = function (tags, oncomplete) {
                assert.equal(tags[0], "array")
                oncomplete(null, [{id: "someid", question: "how are u?", answer: "fine", tags: ["array"]}])
            }
            moke_repo.getUniqueTags = function (oncomplete) {
                oncomplete(null, ["array"])
            }
            presenter.onNewQuestionAdded();
            mokito.JsMockito.verify(moke_view).showQuestions(presenter.all_questions)
        })
    })

    context('#onSaveNotes',function(){
        it('should save the note with associated index',function(){
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            var expectedNote = {2:"some note"};
            presenter.onSaveNotes(2,"some note")
            assert.deepEqual(presenter.notes,expectedNote);

        })
    })

    context('#onRemoveNotes',function(){
        it('should remove the note with associated index',function(){
            var presenter =  new Presenter(moke_view,moke_repo,moke_paper_repo);
            var expectedNote = {};
            presenter.onRemoveNotes(2,"someNote");
            assert.deepEqual(presenter.notes,expectedNote);

        })
    })
});