var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

var openDBConnection = function(){
    var filePresent = fs.existsSync("data/question_bank.db");
    if(!filePresent){
        throw new Error("DataBase file not found");
    }
    else{
        var db = new sqlite3.Database("data/question_bank.db");
        return db;
    }
}
var db = openDBConnection();
db.each("select question , answer from questions", function(err, row) {
    console.log(row.question + ": " + row.answer);
});

