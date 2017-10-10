
/* On DOM ready */
$(function() {
  $('.nav-toggle').click(function() {
    openNav();
  });
  $('.close-menu').click(function() {
    closeNav();
  });

  $('#install-button').on('click', function() {
    showInstall();
  });
  
});


function openNav() {
  // Do things on Nav Open
  $('#side-menu').addClass('show-nav');
  // Fallback if browser doesn't support CSS3 Transforms 
  $('#side-menu').css('margin-right', '-300px'); 
}

function closeNav() {
  // Do things on Nav Close
  $('#side-menu').removeClass('show-nav');
  // Fallback if browser doesn't support CSS3 Transforms 
  $('#side-menu').css('margin-right', '0px');
}

$('#install-menu').hide();

function showInstall() {
  $('install').addClass('show-menu');
  $('#main-menu').removeClass('show-menu');
}
