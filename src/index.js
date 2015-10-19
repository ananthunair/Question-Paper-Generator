var jade = require('jade');
require('./repo.js').connectDb("qpg_prod");

var resetArgs=function(){
    this.extraArgs ={};
}

var setArgs =function(extraArgs){
    this.extraArgs = extraArgs;
}

var render =function(path,options){
    console.log(path)
    var html = jade.renderFile(path,options)
    $('#container').html(html);
};

Dashboard ={
    extraArgs:{},
    render:render.bind(this,'./src/dashboard/dashboard.jade'),
    resetArgs:resetArgs,
    setExtraArgs:setArgs,
}

CreateQuestion ={
    extraArgs:{},
    render:function(options){
        var html = jade.renderFile('./src/createQuestion/create_question.jade',options)
        $('#myModal').html(html);
    },
    resetArgs:resetArgs,
    setExtraArgs:setArgs
}

CreatePaper ={
    extraArgs:{},
    render:render.bind(this,'./src/createQuestionPaper/create_question_paper.jade'),
    resetArgs:resetArgs,
    setExtraArgs:setArgs
}

//var renderDashboard = function(){
//    render('./src/dashboard/dashboard.jade');
//};

$(document).ready(function() {
    Dashboard.render()
    $("#home").click(function(){
        Dashboard.render()
    })
});
