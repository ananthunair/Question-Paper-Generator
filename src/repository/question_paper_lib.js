var lib = {};


lib.getDuplicateQuestionIds = function(questionIds){
    var sorted_arr = questionIds.sort();
    var results = [];
    for (var i = 0; i < questionIds.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return   results;
};

lib.hasDuplicates = function(questionIds) {
    return (new Set(questionIds)).size !== questionIds.length;
};

exports.lib = lib;