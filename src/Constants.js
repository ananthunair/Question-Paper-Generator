var     db_path = "./data/question_bank.db";
var     test_db_path="./test/data/question_bank.db";


exports.constants = {
    env:"dev",
    get_db_path:function(){
       return this.env =="test" ?test_db_path:db_path;
    }
}