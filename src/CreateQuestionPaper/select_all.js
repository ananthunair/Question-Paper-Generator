$(document).ready(function () {
    $('#selectAll').click(function (event) {
        if(this.checked) {
            $('.select_question_checkbox').each(function() {
                this.checked = true;
            });
        }else{
            $('.select_question_checkbox').each(function() {
                this.checked = false;
            });
        }
    })
});