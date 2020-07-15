$(document).ready(function() {
   
    $('#features').waypoint(function() {
        setTimeout(function(){$('#features .special_font').addClass('animated fadeInLeft')}, 0);
    }, { offset: '50%' });
});