/*active link*/
$(document).ready(function(){
    $('.navbar-nav .nav-link').each(function () {
        var location = window.location.href;
        var link = this.href;
        if(location == link) {
            $(this).addClass('active');
        }
    });
});


/*upload photo*/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});


/*change password form*/
$(document).ready(function(){
    $('.pass_show').append('<i class="fas fa-unlock-alt lock-ico"></i>');
});

$(document).on('click','.pass_show .lock-ico', function(){
    $(this).toggleClass('fa-unlock-alt fa-lock-alt');
    $(this).prev().attr('type', function(index, attr){return attr == 'password' ? 'text' : 'password'; });

});

    $(document).pjax('.restaurant__cards_card a', '.pjax-container', {fragment: '.pjax-container'});

