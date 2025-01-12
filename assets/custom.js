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


//      const productCard = $('.products-main a')[0].innerHTML;

//  // Append the same product card 6 times
//  for (let i = 0; i < 9; i++) {
//      $('.products-main').append(productCard);
//  }

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
        const targetPosition = targetSection.offsetTop - (headerHeight + 20);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

$(document).ready(function () {
    // Fetch product data from the static JSON file
    $.getJSON('assets/product.json', function (data) {
        const productLinksContainer = $('#productLinks');

        // Dynamically populate main categories
        $.each(data, function (index, category) {
            const categoryLink = $('<a>', {
                href: '#',
                class: 'col product-wrap text-decoration-none mb-3',
                'data-bs-toggle': 'modal',
                'data-bs-target': '#productModal',
                'data-category-id': category.id  // Store category id for reference
            });

            categoryLink.html(`
                <div class="card bg-transparent">
                    <img src="${category.image}" class="card-img-top w-100 img-fluid rounded-4" alt="${category.category}" style="min-height:230px ">
                    <div class="card-body pb-0">
                        <h5 class="card-title text-white text-center fs-6 fw-medium mb-0">${category.category}</h5>
                    </div>
                </div>
            `);

            productLinksContainer.append(categoryLink);
        });

        // Set up event listeners for each category to update the modal
        $('.product-wrap').on('click', function () {
            const categoryId = $(this).data('category-id');
            const category = data.find(function (c) {
                return c.id === categoryId; // Find the category by ID
            });

            // Update the modal title with category name
            $('#productModalLabel').text(category.category);

            // Dynamically load subcategories into the modal content
            const modalContent = $('#productModalContent #productLinks');
            modalContent.empty();  // Clear any previous content

            $.each(category.subcategories, function (index, subcategory) {
                const subcategoryCard = $('<a>', {
                    href: subcategory.pageLink,  // Link to the subcategory page
                    class: 'col product-wrap text-decoration-none mb-3'
                });

                subcategoryCard.html(`
                    <div class="card bg-transparent">
                        <img src="${subcategory.image}" class="card-img-top w-100 img-fluid rounded-4" style="min-height:170px;" alt="${subcategory.name}">
                        <div class="card-body pb-0">
                            <h5 class="card-title text-white text-center fs-6 fw-medium mb-0">${subcategory.name}</h5>
                            <p class="text-white text-center d-none">${subcategory.description}</p>
                        </div>
                    </div>
                `);

                modalContent.append(subcategoryCard);
            });
        });
    })
    .fail(function (error) {
        console.error('Error loading product data:', error);
    });
});

}); // Document Get Ready Close Here

