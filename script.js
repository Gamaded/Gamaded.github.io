var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,

    breakpoints: {

      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 35,
      },

      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    },
  });

$(document).ready(function () {
  // header-banner fly-symbols
  $('.fly-symbols-first').addClass('fly-symbols-first-transition');
  $('.fly-symbols-second').addClass('fly-symbols-second-transition');
  $('.fly-symbols-third').addClass('fly-symbols-third-transition');
  $('.fly-symbols-forth').addClass('fly-symbols-forth-transition');
  $('.fly-symbols-fifth').addClass('fly-symbols-fifth-transition');
  $('.fly-symbols-sixth').addClass('fly-symbols-sixth-transition');

  function mainBannerFlySymbols() {
    $('.main-banner__fly-symbols-first').addClass('main-banner__fly-symbols-first-transition');
    $('.main-banner__fly-symbols-second').addClass('main-banner__fly-symbols-second-transition');
    $('.main-banner__fly-symbols-third').addClass('main-banner__fly-symbols-third-transition');
    $('.main-banner__fly-symbols-forth').addClass('main-banner__fly-symbols-forth-transition');
    $('.main-banner__fly-symbols-fifth').addClass('main-banner__fly-symbols-fifth-transition');
  }

  $(window).on('scroll', function() {
    let windowOffset = $(window).scrollTop();
    if (windowOffset > 1950) {
      setTimeout(mainBannerFlySymbols, 1000);
    }
  }); 

  $('.button-to-top').on('click', function() {
    $('body, html').animate({
      scrollTop: 0,
    }, 700);
  });

  $(window).on('scroll', function() {
    let windowOffset = $(window).scrollTop();
    if (windowOffset > 500) {
      $('.button-to-top').addClass('button-to-top_showen');
    } else {
      $('.button-to-top').removeClass('button-to-top_showen');
    }
  });

  // $('button').on('click', function() {
  //   return false;
  // });

  $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-9999"})

  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
  let fixedBlock = document.querySelectorAll('.fixed-block');

  function showPopup() {
    $('body').addClass('fixed-body');
    $('.popup-page').addClass('show-popup').animate({
      opacity: "1"
    }).show();
    addPadding();
  };

  function hidePopup() {
    $('body').removeClass('fixed-body');
    $('.popup-page').animate({
      opacity: "0"
    }, 400).delay(4).hide(4);
    removePadding();
    $('.form').trigger('reset');
    $('.form__input-item').removeClass('error');
    $('.form__error-text').hide();
  };

  function fixArrows() {
    let windowWidth = $(window).width();

    if (windowWidth > 1024 && windowWidth < 1240) {
      $('.arrow-left').addClass('arrow-left-in-container');
      $('.arrow-right').addClass('arrow-right-in-container');
    } else if (windowWidth > 1240) {
      $('.arrow-left').removeClass('arrow-left-in-container');
      $('.arrow-right').removeClass('arrow-right-in-container');
    }
  };

  fixArrows();

  $(window).resize(function() {
    fixArrows();
  });

  function showMenu() {
    $('.menu-container').addClass('menu-is-showen');
    if (windowWidth <= 400) {
      $('body').addClass('fixed-body');
    }
  };

  function hideMenu() {
    $('.menu-container').removeClass('menu-is-showen');
    $('body').removeClass('fixed-body');
  };

  function addPadding() {
    document.body.style.paddingRight = paddingOffset;
    fixedBlock.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
  };

  function removePadding() {
    document.body.style.paddingRight = '0px';
    fixedBlock.forEach((el) => {
      el.style.paddingRight = '0px';
    });
  };

  $('.nav-anchor').on('click', function(event) {
    event.preventDefault();

    hideMenu();

    $('.header-nav__item').removeClass('header-nav__item_active');
    $(this).parent('.header-nav__item').addClass('header-nav__item_active');

    let href = $(this).attr('href');

    let offset = $(href).offset().top;

    $('body, html').animate({
      scrollTop: offset,
    }, 700);
  });

  $('.burger').on('click', function() {
    showMenu();
  });

  $(document).mouseup(function(e) {
    let menu = $('.menu-container');
    let burger = $('.burger');
    let formPage = $('.popup-page');
    if (menu.hasClass('menu-is-showen') && !menu.is(e.target) && !burger.is(e.target) && menu.has(e.target).length === 0) {
      hideMenu();
      $('body').removeClass('fixed-body');
    }
  });

  $('.close-cross').on('click', function() {
    hideMenu();
    hidePopup();
  });

  $('.order-cell, .orange-button').on('click', function() {
      showPopup();
  });

  $('.popup-page').on('click', function(event) {
      if (event.target == this) {
        hidePopup();
      }
  });

  $('.form__button').on('click', function() {
    if ($('.input-name').hasClass('valid') && $('.input-tel').hasClass('valid') && $('.input-mail').hasClass('valid')) {
      $('.thankyou').addClass('thankyou-hidden');
      $('.thankyou').addClass('thankyou-showen');
      $('.thankyou-showen').animate({
        width: "100%"
      }, 400);
      $('.form__error-text').hide();
      setTimeout(hidePopup, 1000);
    } else {
      $('.form__error-text').show();
    }
  });

  $('form').each(function() {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: false,
      rules: {
        Телефон: {
         required: true,
        },
        Имя: {
         required: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      submitHandler(form) {
        let th = $(form);

        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: th.serialize(),
        }).done(() => {
          console.log('Sent');
        });

        return false;
      }
    })
  });
});