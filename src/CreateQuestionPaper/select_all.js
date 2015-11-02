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
    });

    $('.select_question_checkbox').on('click',function(){
        if($('.select_question_checkbox:checked').length == $('.select_question_checkbox').length){
            $('#selectAll').prop('checked',true);
        }else{
            $('#selectAll').prop('checked',false);
        }
    });
    $(".questionContainer").click(function(){
        var id = $(this).attr('id');
        $(this).find('input',{'value':id}).click();
    })
});