var jade = require('jade');
render =function(path,options){
    var html = jade.renderFile(path,options)
    $('#container').html(html);
}

$(document).ready(function() {
    render('./src/dashboard/dashboard.jade');
})