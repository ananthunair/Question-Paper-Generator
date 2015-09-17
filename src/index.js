var jade = require('jade');
render =function(path,options){
    var html = jade.renderFile(path,options)
    $('#container').html(html);
}

var renderDashboard = function(){
    render('./src/dashboard/dashboard.jade');
}

$(document).ready(function() {
    renderDashboard()
    $("#home").click(function(){
        renderDashboard()
    })
})