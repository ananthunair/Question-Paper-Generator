var lib = {};


lib.getDuplicateQuestionIds = function(questionIds){
    var sorted_ids = questionIds.sort();
    var duplicateIds = [];
    for (var i = 0; i < questionIds.length - 1; i++) {
        if (sorted_ids[i + 1] == sorted_ids[i]) {
            duplicateIds.push(sorted_ids[i]);
        }
    }
    return   duplicateIds;
};

lib.hasDuplicates = function(questionIds) {
    return (new Set(questionIds)).size !== questionIds.length;
};

lib.getSelectedQuestionIds = function(tags, questionIds) {
    var moreThanOneTag = tags.length > 1;
    var selectedQuestionIds = moreThanOneTag ? [] : questionIds;
    if (lib.hasDuplicates(questionIds) && moreThanOneTag)
        selectedQuestionIds = lib.getDuplicateQuestionIds(questionIds);
    return selectedQuestionIds;
};

lib.getTagId = function(id){return id.id};

lib.getFormatedTag = function(tag){return "'"+tag+"'"};

lib.getTagName = function(tag){return tag.tagName};



exports.lib = lib;