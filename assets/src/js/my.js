
$(function() {
    $("#cart-btn, .close-modal").click(function() {
        $("#modal").toggleClass("is-open");
        $("body").toggleClass("hidden");
    });
});

// pajax container
$(document).pjax('.restaurant__cards_card a', '.pjax-container', {fragment: '.pjax-container'});

