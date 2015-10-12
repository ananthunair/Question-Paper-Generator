var jade = require('jade');
require('./repo.js').connectDb("qpg");

render =function(path,options){
    var html = jade.renderFile(path,options)
    $('#container').html(html);
};

var renderDashboard = function(){
    render('./src/dashboard/dashboard.jade');
};

$(document).ready(function() {
    renderDashboard()
    $("#home").click(function(){
        renderDashboard()
    })
});
