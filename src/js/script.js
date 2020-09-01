(function ($) {
  "use strict";

  $(document).ready(function () {
    var html_folder = "";
    if (typeof drupalSettings !== "undefined") {
      html_folder = drupalSettings.html_folder + "/dist/";
    }

    let $body = $("body");

    // .c-menu
    // --------------------------------------------------------------
    $body.on("click", ".c-menu__link--1", function () {
      $(this)
        .closest(".c-menu__item--parent")
        .toggleClass("c-menu__item--active");
    }),
      $body.on("click", 'a[href^="#c-menu"]', function (a) {
        a.preventDefault();
        var b = $(this).attr("href");
        $(b).addClass("c-menu--open");
        $(".l-body").addClass("l-body--overflow");
      }),
      $body.on("click", ".c-menu__panel--close", function () {
        $(".c-menu").removeClass("c-menu--open");
        $(".l-body").removeClass("l-body--overflow");
      });

    // .c-choice
    // --------------------------------------------------------------
    $body.on("click", 'a[href^="#c-choice"]', function (a) {
      a.preventDefault();
      var b = $(this).attr("href");

      $(b).addClass("c-choice--open");
    }),
      $body.on("click", ".c-choice__panel--close", function () {
        $(".c-menu").removeClass("c-menu--open");
        $(".l-body").removeClass("l-body--overflow");
        $(".c-choice").removeClass("c-choice--open");
      }),
      $body.on("click", ".c-choice__panel--back", function () {
        $(".c-choice").removeClass("c-choice--open");
      });

    // .c-choice--currency
    // --------------------------------------------------------------
    $body.on("click", ".c-choice--currency .c-choice__link", function () {
      $('[data-choice="currency"]').empty();

      $(this)
        .addClass("c-choice__link--check")
        .siblings()
        .removeClass("c-choice__link--check");

      $(this)
        .find(".c-choice__link--abbr")
        .clone()
        .contents()
        .appendTo('[data-choice="currency"]');
    });

    // .c-choice--language
    // --------------------------------------------------------------
    $body.on("click", ".c-choice--language .c-choice__link", function () {
      $('[data-choice="language"]').empty();

      $(this)
        .addClass("c-choice__link--check")
        .siblings()
        .removeClass("c-choice__link--check");

      $(this)
        .find(".c-choice__link--abbr")
        .clone()
        .contents()
        .appendTo('[data-choice="language"]');
    });

    // .c-tab
    // --------------------------------------------------------------
    $body.on("click", 'a[href^="#c-tab"]', function (a) {
      a.preventDefault();
      var b = $(this).attr("href");

      $(b).show();
      $(b).siblings().hide();

      $(this).addClass("c-tab__link--active");
      $(this).siblings().removeClass("c-tab__link--active");

      $(".c-slick").slick("setPosition");
    });

    // .c-alphabet
    // --------------------------------------------------------------
    $body.on("click", 'a[href^="#c-alphabet"]', function (a) {
      a.preventDefault();
      var b = $(this).attr("href");

      $(b).addClass("c-alphabet__content--active");
      $(b).siblings().removeClass("c-alphabet__content--active");

      $(this).addClass("c-alphabet__nav--active");
      $(this).siblings().removeClass("c-alphabet__nav--active");
    });

    // .c-show
    // --------------------------------------------------------------
    $body.on("click", 'a[href^="#c-show"]', function (a) {
      a.preventDefault();
      var b = $(this).attr("href");

      $(b).toggleClass("c-show--active");
      $(this).toggleClass("c-show--collapse");
    });

    // .c-select
    // ------------------------------------------------------------
    $body.on("click", ".c-select", function () {
      $(".c-select").not(this).removeClass("c-select--active");
      $(this).toggleClass("c-select--active");
    }),
      $body.on("click", ".c-select__item", function () {
        var value = $(this).closest(".c-select").find(".c-select__selected");
        value.empty();

        $(this).clone().contents().appendTo(value);
      }),
      $(window).on("click", function () {
        $(".c-select").removeClass("c-select--active");
      }),
      $body.on("click", ".c-select", function (e) {
        e.stopPropagation();
      });

    // .c-list
    // --------------------------------------------------------------
    $body.on("click", ".c-list__title", function () {
      $(this).closest(".c-list__block").toggleClass("c-list__block--active");
    });

    // .c-star
    // --------------------------------------------------------------
    $body.on("click", ".c-star__item", function () {
      $(this).siblings().removeClass("c-star__item--active");
      $(this)
        .addClass("c-star__item--active")
        .prevAll()
        .addClass("c-star__item--active");
    });

    // .c-booking__column
    // --------------------------------------------------------------
    $body.on(
      "click",
      ".c-booking__column:not(.c-booking__column--submit):not(.c-booking__column--add)",
      function () {
        $(".l-body").addClass("l-body--overflow");

        $(this)
          .addClass("c-booking--open")
          .siblings()
          .removeClass("c-booking--open");
      }
    ),
      $body.on(
        "click",
        ".c-booking__panel--close, .c-booking__change, .c-booking__input--close",
        function (e) {
          e.stopPropagation();
          $(".l-body").removeClass("l-body--overflow");
          $(".c-booking__column").removeClass("c-booking--open");
        }
      );

    // .c-booking__dropdown
    // --------------------------------------------------------------
    $body.on("click", ".c-booking__column", function (e) {
      e.stopPropagation();

      $(this)
        .toggleClass("c-booking--active")
        .siblings()
        .removeClass("c-booking--active");

      $(this)
        .closest(".c-booking__wrap--row")
        .siblings()
        .find(".c-booking__column")
        .removeClass("c-booking--active");
    }),
      $(".c-booking__dropdown--item").on("click", function () {
        var bookingLocation = $(this)
          .find(".c-booking__dropdown--location")
          .text();
        $(this)
          .closest(".c-booking__column")
          .find(".c-booking__input input")
          .val($.trim(bookingLocation));

        $(this)
          .closest(".c-booking__column")
          .addClass("c-booking__column--has-value");
      }),
      $(window).on("click", function () {
        $(".c-booking__column").removeClass("c-booking--active");
      });

    // .c-booking__input--clear
    // --------------------------------------------------------------
    $body.on("click", ".c-booking__input--clear", function () {
      $(this).closest(".c-booking__input").find("input").val("");
    });

    // .c-booking__count
    // ------------------------------------------------------------
    $body.on("click", "#c-booking__count", function (e) {
      e.stopPropagation();
    }),
      $body.on(
        "click",
        '.c-booking__count--plus:not([href="#c-booking__count--children"])',
        function (a) {
          a.preventDefault();
          var bookingCountTarget = $(this).attr("href");
          var bookingCountSiblings = $(this).siblings(
            ".c-booking__count--value"
          );

          $(this)
            .closest(".c-booking__column")
            .find(bookingCountTarget)
            .html(function (i, count) {
              return +count + 1;
            });

          $(this)
            .siblings(".c-booking__count--value")
            .html(function (i, count) {
              return +count + 1;
            });
        }
      ),
      $body.on(
        "click",
        '.c-booking__count--minus:not([href="#c-booking__count--children"])',
        function (a) {
          a.preventDefault();
          var bookingCountTarget = $(this).attr("href");

          $(this)
            .closest(".c-booking__column")
            .find(bookingCountTarget)
            .html(function (i, count) {
              if (count > 1) {
                return +count - 1;
              }
            });

          $(this)
            .siblings(".c-booking__count--value")
            .html(function (i, count) {
              if (count > 1) {
                return +count - 1;
              }
            });
        }
      );

    // .c-booking__count (children)
    // ------------------------------------------------------------
    $body.on(
      "click",
      '.c-booking__count--plus[href="#c-booking__count--children"]',
      function (a) {
        a.preventDefault();
        var bookingCountTarget = $(this).attr("href");
        var bookingCountSiblings = $(this).siblings(".c-booking__count--value");

        $(this)
          .closest(".c-booking__column")
          .find(bookingCountTarget)
          .html(function (i, count) {
            return +count + 1;
          });

        $(this)
          .siblings(".c-booking__count--value")
          .html(function (i, count) {
            return +count + 1;
          });

        $("#c-booking__count").append(
          `<div class="c-booking__dropdown--item c-booking__dropdown--dynamic">
                    <div class="c-booking__dropdown--title">
                        Укажите возраст детей
                    </div>
                    <div class="c-select">
                        <div class="c-select__selected">
                            5 лет
                        </div>
                        <div class="c-select__dropdown">
                            <div class="c-select__scroll">
                                <div class="c-select__item">1 год</div>
                                <div class="c-select__item">2 года</div>
                                <div class="c-select__item">3 года</div>
                                <div class="c-select__item">4 года</div>
                                <div class="c-select__item">5 лет</div>
                                <div class="c-select__item">7 лет</div>
                                <div class="c-select__item">8 лет</div>
                            </div>
                        </div>
                    </div>
                </div>`
        );
      }
    );

    $body.on(
      "click",
      '.c-booking__count--minus[href="#c-booking__count--children"]',
      function (a) {
        a.preventDefault();
        var bookingCountTarget = $(this).attr("href");

        $(this)
          .closest(".c-booking__column")
          .find(bookingCountTarget)
          .html(function (i, count) {
            if (count > 0) {
              return +count - 1;
            }
          });

        $(this)
          .siblings(".c-booking__count--value")
          .html(function (i, count) {
            if (count > 0) {
              return +count - 1;
            }
          });

        $(".c-booking__dropdown--dynamic:last-child").remove();
      }
    );

    $body.on(
      "click",
      '.c-booking__count--minus[href="#c-booking__count--default"]',
      function (a) {
        a.preventDefault();
        var bookingCountTarget = $(this).attr("href");

        $(this)
          .siblings(".c-booking__count--value")
          .html(function (i, count) {
            if (count > 0) {
              return +count - 1;
            }
          });
      }
    );

    // .c-booking--difficult
    // --------------------------------------------------------------
    $body.on("click", ".c-booking--difficult .c-booking__column", function () {
      $(this)
        .closest(".c-booking__column")
        .addClass("c-booking__column--has-value");
      $(this).find('input[type="text"]').focus();
    }),
      $(".c-booking--difficult input").each(function () {
        if ($(this).val() > 0) {
          $(this)
            .closest(".c-booking__column")
            .addClass("c-booking__column--has-value");
        }
      }),
      $(".c-booking--difficult input").blur(function () {
        var val = $(this).val();
        if (val != "") {
          $(this)
            .closest(".c-booking__column")
            .addClass("c-booking__column--has-value");
        } else {
          $(this)
            .closest(".c-booking__column")
            .removeClass("c-booking__column--has-value");
        }
      });

    // .c-booking--complex
    // --------------------------------------------------------------
    $body.on("click", '[data-form="c-booking--complex"]', function () {
      $(".c-booking--difficult").addClass("c-booking--complex");
      $(".c-booking--difficult").removeClass("c-booking--one-way");
    }),
      $body.on("click", '[data-form="c-booking--one-way"]', function () {
        $(".c-booking--difficult").addClass("c-booking--one-way");
        $(".c-booking--difficult").removeClass("c-booking--complex");
      }),
      $body.on("click", '[data-form="c-booking--difficult"]', function () {
        $(".c-booking--difficult").removeClass(
          "c-booking--complex c-booking--one-way"
        );
      });

    // .c-description
    // --------------------------------------------------------------
    $body.on("click", ".c-description__more", function () {
      $(this)
        .closest(".c-description")
        .toggleClass("c-description--active")
        .find(".c-description--hidden")
        .slideToggle();
    });

    // .c-accordion
    // --------------------------------------------------------------
    $body.on("click", ".c-accordion__title", function () {
      $(this)
        .closest(".c-accordion__item")
        .toggleClass("c-accordion--active")
        .find(".c-accordion__content")
        .slideToggle("fast");
    });

    // .c-modal__accordion--title
    // --------------------------------------------------------------
    $body.on("click", ".c-modal__accordion--title", function () {
      $(this)
        .closest(".c-modal__accordion")
        .toggleClass("c-modal__accordion--active");
    });

    // .c-gallery__grid
    // --------------------------------------------------------------
    $("#c-gallery__grid").lightGallery();

    // .c-photo
    // --------------------------------------------------------------
    $("#c-photo").lightGallery();

    // .c-filter
    // --------------------------------------------------------------
    $body.on("click", ".c-filter__title", function () {
      $(this).toggleClass("c-filter__title--active c-filter__title--open");
    });

    $body.on("click", 'a[href^="#c-filter"]', function (a) {
      a.preventDefault();
      var b = $(this).attr("href");
      $(b).addClass("c-filter--active");
      $(".l-body").addClass("l-body--overflow");
    });

    $body.on("click", ".c-filter__close", function () {
      $(this).closest(".c-filter").removeClass("c-filter--active");
      $(".l-body").removeClass("l-body--overflow");
    });

    $body.on("click", ".c-filter__header--back", function () {
      $(this).closest(".c-filter").removeClass("c-filter--active");
    });

    // .c-slick
    // --------------------------------------------------------------
    // $(window).on('resize', function() {
    //     if ($(window).width() > 1151) {
    //         $('.c-slick').slick('init');
    //     }
    // });

    // .c-slick__gallery
    // --------------------------------------------------------------
    if ($(window).width() < 767) {
      $(".c-slick__gallery").slick({
        arrows: true,
        infinite: true,
        slidesPerRow: 1,
        prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
        nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      });
    }

    // .c-modal__slick
    // --------------------------------------------------------------
    $("#c-modal__slick").lightGallery();

    $body.on("init", "#c-modal__slick", function (
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $(this)
        .closest(".c-slick__wrap")
        .find(".c-modal__quantity")
        .text(i + " / " + slick.slideCount);
    }),
      $("#c-modal__slick").slick({
        infinite: true,
        slidesPerRow: 1,
        arrows: true,
        prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
        nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      }),
      $(".c-slick__arrow").click(function () {
        $("#c-modal__slick").on("init reInit afterChange", function (
          event,
          slick,
          currentSlide,
          nextSlide
        ) {
          var i = (currentSlide ? currentSlide : 0) + 1;
          $(this)
            .closest(".c-slick__wrap")
            .find(".c-modal__quantity")
            .text(i + " / " + slick.slideCount);
        });
      });

    // .c-slick__slideset
    // --------------------------------------------------------------
    $(".c-slick__slideset").slick({
      rows: 2,
      arrows: false,
      infinite: true,
      slidesPerRow: 6,
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__hotels
    // --------------------------------------------------------------
    $(".c-slick__hotels").slick({
      infinite: true,
      slidesPerRow: 6,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__direction
    // --------------------------------------------------------------
    $(".c-slick__direction").slick({
      infinite: true,
      slidesPerRow: 1,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: {
            arrows: false,
          },
        },
      ],
    });

    // .c-slick__latest-news
    // --------------------------------------------------------------
    $(".c-slick__latest-news").slick({
      infinite: true,
      slidesPerRow: 4,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__popular-excursions
    // --------------------------------------------------------------
    $(".c-slick__popular-excursions").slick({
      infinite: true,
      slidesPerRow: 6,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__avia
    // --------------------------------------------------------------
    $(".c-slick__avia").slick({
      rows: 2,
      infinite: true,
      slidesPerRow: 7,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__popular-flights
    // --------------------------------------------------------------
    $(".c-slick__popular-flights").slick({
      rows: 1,
      infinite: true,
      slidesPerRow: 6,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__popular-flights-city
    // --------------------------------------------------------------
    $(".c-slick__popular-flights-city").slick({
      rows: 2,
      infinite: true,
      slidesPerRow: 4,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__route
    // --------------------------------------------------------------
    $(".c-slick__route").slick({
      rows: 2,
      infinite: true,
      slidesPerRow: 6,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__popular-cities
    // --------------------------------------------------------------
    $(".c-slick__popular-cities").slick({
      rows: 2,
      infinite: true,
      slidesPerRow: 4,
      arrows: true,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-slick__card
    // --------------------------------------------------------------
    $body.on("init", ".c-slick__card", function (
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $(this)
        .closest(".c-slick__wrap")
        .find(".c-card__quantity")
        .text(i + " / " + slick.slideCount);
    }),
      $(".c-slick__card").slick({
        infinite: true,
        slidesPerRow: 1,
        arrows: true,
        prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
        nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      }),
      $(".c-slick__arrow").click(function () {
        $(".c-slick__card").on("init reInit afterChange", function (
          event,
          slick,
          currentSlide,
          nextSlide
        ) {
          var i = (currentSlide ? currentSlide : 0) + 1;
          $(this)
            .closest(".c-slick__wrap")
            .find(".c-card__quantity")
            .text(i + " / " + slick.slideCount);
        });
      });

    // .c-slick__card--slideset
    // --------------------------------------------------------------
    $(".c-slick__card--slideset").slick({
      arrows: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
      responsive: [
        {
          breakpoint: 1151,
          settings: "unslick",
        },
      ],
    });

    // .c-modal__slider--big
    // --------------------------------------------------------------
    $(".c-modal__slider--big").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      dots: false,
      asNavFor: ".c-modal__slider--small",
      prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
      nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
    });

    // .c-modal__slider--small
    // --------------------------------------------------------------
    $(".c-modal__slider--small").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: ".c-modal__slider--big",
      dots: false,
      arrows: false,
      focusOnSelect: true,
    });

    // .c-slick__rental
    // --------------------------------------------------------------
    $body.on("init", ".c-slick__rental--2, .c-slick__rental--4", function (
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $(this)
        .closest(".c-slick__wrap")
        .find(".c-slick__quantity")
        .text(i + " / " + slick.slideCount);
    }),
      $(".c-slick__rental--2").slick({
        infinite: false,
        slidesPerRow: 1,
        slidesToShow: 2,
        arrows: true,
        prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
        nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
        responsive: [
          {
            breakpoint: 1151,
            settings: {
              infinite: true,
              slidesToShow: 1,
              // slidesToScroll: 2,
            },
          },
        ],
      }),
      $(".c-slick__rental--4").slick({
        infinite: false,
        slidesPerRow: 1,
        slidesToShow: 4,
        arrows: true,
        prevArrow: '<div class="c-slick__arrow c-slick__arrow--prev"></div>',
        nextArrow: '<div class="c-slick__arrow c-slick__arrow--next"></div>',
        responsive: [
          {
            breakpoint: 767,
            settings: {
              infinite: true,
              slidesToShow: 2,
              // slidesToScroll: 2,
            },
          },
          {
            breakpoint: 1151,
            settings: {
              infinite: true,
              slidesToShow: 3,
              // slidesToScroll: 2,
            },
          },
        ],
      }),
      $(".c-slick__arrow").click(function () {
        $(".c-slick__rental--2, .c-slick__rental--4").on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $(this)
              .closest(".c-slick__wrap")
              .find(".c-slick__quantity")
              .text(i + " / " + slick.slideCount);
          }
        );
      });

    // .c-slick__rental--review
    // --------------------------------------------------------------
    $(".c-slick__rental--review").slick({
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 767,
        },
        {
          breakpoint: 768,
          settings: "unslick",
        },
      ],
    });

    // .c-booking__input--clear
    // --------------------------------------------------------------
    $body.on("click", '[data-form="c-booking--auto"]', function () {
      if($('[data-form="c-booking--auto"] :checked').length > 0) {
        $("#return-on").addClass("c-tab__item--active");
        $("#return-off").removeClass("c-tab__item--active");
        $(".c-booking__reset").removeClass("c-booking--hidden");
      } else {
        $("#return-off").addClass("c-tab__item--active");
        $("#return-on").removeClass("c-tab__item--active");
        $(".c-booking__reset").addClass("c-booking--hidden");
      }
    });
    



  }); // end ready
})(jQuery);
