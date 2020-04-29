$(document).ready(function(){

    $('.modal-form__tel').inputmask({"mask": "+7(999)999-9999"});

    function initializeSwiper() {

        let mySwiper = new Swiper ('.swiper', {

            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
      
            navigation: {
                nextEl: '.slider__button_next',
                prevEl: '.slider__button_prev',
            },
    
            pagination: {
                el: '.slider__pagination',
                type: 'bullets',
                bulletElement: 'span',
                clickable: 'true',
                bulletClass: 'slider__bullet',
                bulletActiveClass: 'slider__bullet_active',
            },
    
            breakpoints: {
    
                1025: {
                    slidesPerView: 3,
                },
    
                780: {
                    slidesPerView: 2,
                },
    
            },
        })
    };

    function openModalWindow(){

        let elements = $('.modal-overlay, .modal-window');
        let button = $('.callback, .big-red-button, .callback__mobile');

        $(button).click(function(){
            elements.addClass('active');
        });

        $('.modal-window__close').click(function(){
            elements.removeClass('active');
        }); 

        $(document).mouseup(function (e){
            let block = $('.modal-window');

            if (!block.is(e.target) && block.has(e.target).length === 0) {
                elements.removeClass('active');
            };
        });
    };

    function scrollToAnchors(){

        $('.navigation').on("click","a", function (event) {

            event.preventDefault();

            let id  = $(this).attr('href');
            let top = $(id).offset().top;

            $('body,html').animate({scrollTop: top}, 1000, 'swing');
        });
    };

    function openMobileMenu() {

        $('body').on('click', '.burger', function(){
    
            $('.burger').toggleClass('_open');
            $('.navigation__list').toggleClass('_open');
        });

    };

    function validateForm() {

        $('form').each(function () {

            
    
            $(this).validate({
                errorPlacement(error, element) {
                    return true;
                },
                focusInvalid: false,
                rules: {
                    Name: {
                        required: true,
                    },
                    Tel: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    policity: {
                        required: true,
                    },
                },
                
                submitHandler(form) {
                let th = $(form);
    
                $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: th.serialize(),
    
            }).done(() => {
                $('.modal-window').removeClass('active');
                $('.confirm-message').addClass('active');

                setTimeout(function(){
                    $('.confirm-message').removeClass('active');
                    $('.modal-overlay').removeClass('active');
                }, 2000);
                th.trigger('reset');               
            });
    
            return false;
            }
        });
        });
    };

    
    


    


    initializeSwiper();
    openModalWindow();
    scrollToAnchors();
    openMobileMenu();
    validateForm();
});