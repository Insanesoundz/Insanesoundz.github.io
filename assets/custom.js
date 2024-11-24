$(document).ready(function() {
    // Clone the desktop nav links to the offcanvas menu
    $('#navLinks').clone().appendTo('#offcanvasNavLinks');

    // // Smooth scroll on clicking navbar links
    // $('.navbar-nav .nav-link').on('click', function(event) {
    //     event.preventDefault();
    //     $('html, body').animate({
    //         scrollTop: $($(this).attr('href')).offset().top - 50 // Offset to account for navbar height
    //     }, 500);
    //     // Close offcanvas if open
    //     if ($('.offcanvas').hasClass('show')) {
    //         $('.offcanvas').offcanvas('hide');
    //     }
    // });

    // // Add active class to navbar link based on scroll position
    // $(window).on('scroll', function() {
    //     var scrollPos = $(window).scrollTop() + 60; // Offset for navbar height
    //     $('.navbar-nav .nav-link').each(function() {
    //         var sectionOffset = $($(this).attr('href')).offset().top;
    //         if (scrollPos >= sectionOffset) {
    //             $('.navbar-nav .nav-link').removeClass('active-link');
    //             $(this).addClass('active-link');
    //         }
    //     });
    // });


     // Get video and mute/unmute button
     const video = document.getElementById('videoBanner');
     const muteUnmuteBtn = document.getElementById('muteUnmuteBtn');

     // Mute/Unmute functionality
     muteUnmuteBtn.addEventListener('click', () => {
         if (video.muted) {
             video.muted = false;
             muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-up fs-6"></i>'; // Change icon to volume-up
         } else {
             video.muted = true;
             muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-mute fs-6"></i>'; // Change icon to volume-mute
         }
     });


     const productCard = $('.products-main a')[0].innerHTML;

 // Append the same product card 6 times
 for (let i = 0; i < 9; i++) {
     $('.products-main').append(productCard);
 }

 $(document).on("click", "ul#offcanvasNavLinks a.nav-link", ()=>{
    $(`[data-bs-dismiss="offcanvas"]`).click();
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Scroll with offset
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});


}); // Document Get Ready Close Here