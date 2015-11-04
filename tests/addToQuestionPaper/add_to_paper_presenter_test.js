var Presenter = require('../../src/AddToQuestionPaper/add_to_question_paper_presenter.js').Presenter;
var assert = require('chai').assert;
var mokito = require('jsmockito');
var moke_view;
var moke_paper_repo;

describe("create_question_presenter", function () {
    beforeEach(function(){
        var view ={};


        view.setSuggetions = function(){};
        view.showQuestionPapers =function(){};
        var repo = {};
        repo.create = function(){};
        repo.getUniqueTags =function(){};
        repo.updateQuestion = function(){};
        moke_view=mokito.JsMockito.mock(view);
        moke_paper_repo = mokito.JsMockito.mock(repo);

    })
    context("#OnDocumentReady", function () {
        it("should show all papers on view", function () {
            var papers =[{header:{title:"paper1"},questions:["id1","id2"]},{header:{title:"paper2"},questions:["id1","id2"]}];
            moke_paper_repo.fetchQuestionPapers =function(oncomplete){
                oncomplete(null,papers);
            }
            var presenter =  new Presenter(moke_view,moke_paper_repo);
            presenter.onDocumentReady()
            mokito.JsMockito.verify(moke_view).showQuestionPapers(papers);
        })

        it("should show all papersTitle on view as autosuggetions", function () {
            var papers =[{header:{title:"paper1"},questions:["id1","id2"]},{header:{title:"paper2"},questions:["id1","id2"]}];
            var paperTitles=["paper1","paper2"];
            moke_paper_repo.fetchQuestionPapers =function(oncomplete){
                oncomplete(null,papers);
            }
            var presenter =  new Presenter(moke_view,moke_paper_repo);
            presenter.onDocumentReady()
            mokito.JsMockito.verify(moke_view).setSuggetions(paperTitles);
        })
    });

});