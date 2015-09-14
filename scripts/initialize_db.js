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
    " question text, answer text);"
    ].forEach(runQuery)	;
};
db.serialize(runAllQueries);