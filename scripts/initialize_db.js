var location = process.argv[2];
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(location);
var runAllQueries = function(){
    var runQuery = function(q){
        console.log(q);
        db.run(q,function(err){
            if(err){
                console.log(err);
                process.exit(1);
            }
        });
    };

    [	"create table questions(id integer primary key autoincrement,"+
    " question text, answer text);",
        "create table questionPapers(id integer primary key autoincrement,"+
            " questionPaperName text);",
        "create table questionDictionary(id integer primary key autoincrement,"+
            " questionId integer, questionPaperId integer, foreign key(questionPaperId) references questionPapers(id));",
        "create table tags(questionId,tagName,foreign key(questionId) references questions(id))"
    ].forEach(runQuery)	;
};
db.serialize(runAllQueries);