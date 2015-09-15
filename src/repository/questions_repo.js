//var sqlite3 = require('sqlite3');
exports.Question_repository = function(){
}
exports.Question_repository.prototype ={
    create:function(question,answer){
        console.log("question = ",question)
        console.log("answer = ",answer)
    }
}