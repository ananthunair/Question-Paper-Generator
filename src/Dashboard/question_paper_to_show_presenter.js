exports.Presenter = function (view, paper_repo,questions_repo) {
    this.view = view;
    this.question_repo = questions_repo;
    this.paper_repo = paper_repo;
}

exports.Presenter.prototype = {

    getAllQuestionsFromPaper:function(id){
        var presenter = this;
        var question_repo = this.question_repo;
        var paper_repo = this.paper_repo;
        var view = this.view;
        var onComplete =function(err,paper){
            question_repo.getQuestionsByIds(paper.questions,function(err,questions){
              view.onQuestionPaperClick(questions,paper.header.title,id,paper.notes)
            })
        }
       paper_repo.getPaper(id,onComplete)
    },
    onPreviewClick : function(){
        this.view.openPreview();
    },
    onEditClick : function(){
        this.view.openPaperInEditMode();
    },
    onPreviewWithAnswerClick:function(){
        this.view.openPreviewWithAnswer();
    },
    setAutosuggetions : function(){
        var view = this.view;
        this.question_repo.getUniqueTags(function (err,tags) {
            if(!err)
                view.setupTagBoxData(tags);
        });
    },
    onAddOrRemoveTag :  function(tags){
        var onComplete = function(err,questions){
        };
        this.question_repo.fetchQuestionsOfSpecificTags(tags,onComplete);
    }
};
