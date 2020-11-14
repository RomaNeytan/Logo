//JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
@@include('jquery-3.5.1.min.js', {})
@@include('slick.min.js', {})
@@include('nouislider.js', {})
@@include('wNumb.min.js', {})
@@include('select2.min.js', {})


function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

// Динамик адаптив

class DynamicAdapt {
  // массив объектов
  elementsArray = [];
  daClassname = '_dynamic_adapt_';

  constructor(type) {
    this.type = type;
  }

  init() {
    // массив DOM-элементов
    this.elements = [...document.querySelectorAll('[data-da]')];

    // наполнение elementsArray объктами
    this.elements.forEach((element) => {
      const data = element.dataset.da.trim();
      if (data !== '') {
        const dataArray = data.split(',');

        const oElement = {};
        oElement.element = element;
        oElement.parent = element.parentNode;
        oElement.destination = document.querySelector(`.${dataArray[0].trim()}`);
        oElement.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        oElement.place = dataArray[2] ? dataArray[2].trim() : 'last';

        oElement.index = this.indexInParent(
          oElement.parent, oElement.element,
        );

        this.elementsArray.push(oElement);
      }
    });

    this.arraySort(this.elementsArray);

    // массив уникальных медиа-запросов
    this.mediaArray = this.elementsArray
      .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index);

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    this.mediaArray.forEach((media) => {
      const mediaSplit = media.split(',');
      const mediaQuerie = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const elementsFilter = this.elementsArray.filter(
        ({ breakpoint }) => breakpoint === mediaBreakpoint
      );
      mediaQuerie.addEventListener('change', () => {
        this.mediaHandler(mediaQuerie, elementsFilter);
      });
      this.mediaHandler(mediaQuerie, elementsFilter);
    });
  }

  // Основная функция
  mediaHandler(mediaQuerie, elementsFilter) {
    if (mediaQuerie.matches) {
      elementsFilter.forEach((oElement) => {
        // получение индекса внутри родителя
        oElement.index = this.indexInParent(
          oElement.parent, oElement.element,
        );
        this.moveTo(oElement.place, oElement.element, oElement.destination);
      });
    } else {
      elementsFilter.forEach(({ parent, element, index }) => {
        if (element.classList.contains(this.daClassname)) {
          this.moveBack(parent, element, index);
        }
      });
    }
  }

  // Функция перемещения
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element);
      return;
    }
    if (place === 'first') {
      destination.prepend(element);
      return;
    }
    destination.children[place].before(element);
  }

  // Функция возврата
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }

  // Функция получения индекса внутри родителя
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }
          return a.place - b.place;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }
          return b.place - a.place;
        }
        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  }
}

const da = new DynamicAdapt('max');
da.init();

// 

$(function () {
  $('.nav-toggle').on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('.top-header-menu').toggleClass('active');
  });
});


// Чистый

// Ibg

function ibg() {

  document.querySelectorAll(".ibg").forEach(el => {
    if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
    }
  });
}

ibg();

// Выпадающие меню адаптив

$(document).ready(function () {
  let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
  };
  let body = document.querySelector('body');
  if (isMobile.any()) {
    let menuParents = document.querySelectorAll('.menu-page-list__parent>a');

    for (let index = 0; index < menuParents.length; index++) {
      const menuParent = menuParents[index];
      menuParent.addEventListener("click", function (e) {
        menuParent.parentElement.classList.toggle('active');
        e.preventDefault();
      });
    }
  } else {
    let menuParents = document.querySelectorAll('.menu-page-list__parent');
    for (let index = 0; index < menuParents.length; index++) {
      const menuParent = menuParents[index];
      menuParent.addEventListener("mouseenter", function (e) {
        menuParent.classList.add('active');
      });
      menuParent.addEventListener("mouseleave", function (e) {
        menuParent.classList.remove('active');
      });
    }
  }
  // Если на пк оставить стрелки,закомментируем проверку if
});

// Burger in menu page

let menuPageBurger = document.querySelector('.menu-page__burger');
let menuPageBody = document.querySelector('.menu-page-list');
let menuBurger = document.querySelector('.menu-page-btn');

menuPageBurger.addEventListener('click', function (e) {
  menuPageBody.classList.toggle('active');
});

menuBurger.addEventListener('click', function (e) {
  menuBurger.classList.toggle('active');
});

// Select

let searchSelect = document.querySelector('.search-page__title');
let menuSearch = document.querySelector('.menu-search');
searchSelect.addEventListener("click", function (e) {
  menuSearch.classList.toggle('active');
});

// Data-scroll

$("[data-scroll]").on("click", function (event) {
  event.preventDefault();

  let scrollId = $(this).data("scroll");
  let elementOffset = $(scrollId).offset().top;

  $(".nav-toggle").removeClass('active');
  $('.top-header-menu').removeClass('active');


  $("html,body").animate({
    scrollTop: elementOffset - 110
  }, 700);

});

// Fixed

let header = $("#header"),
  introH = $("#intro").innerHeight();
  scrolloffsize = $(window).scrollTop(),
  botHeader = $(".bottom-header");

checkScroll(scrolloffsize, introH);

$(window).on("scroll resize", function () {
  introH = $("#intro").innerHeight();
  scrolloffsize = $(this).scrollTop();

  checkScroll(scrolloffsize, introH);

  if (header.hasClass('fixed')) {
    botHeader.addClass("notactive");
  }

  else {
    botHeader.removeClass("notactive");
  }
});

function checkScroll(scrolloffsize, introH) {
  if (scrolloffsize > introH) {
    header.addClass("fixed");
  }

  else {
    header.removeClass("fixed");
  }
};

// Mainslider

$(".main-slider").slick({
  arrows: false,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  easing:'ease',
	speed:1000,
	autoplay:true,
	infinite:true,
	autoplaySpeed:1500,
	draggable:false,
	waitForAnimate:false
});

// Products slider

$("#slider__products").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: $('.products-page__arrow_left'),
  nextArrow: $('.products-page__arrow_right'),

});

$(function () {
  let slider = $('.products-page__slider');

  $('.products-page__slider-inner .slick-prev').on('click', function () {
    $(slider).slick('slickPrev');
  });
  $('.products-page__slider-inner .slick-next').on('click', function () {
    $(slider).slick('slickNext');
  });
});

// Brands slider

$("#slider-brands").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: $('.brands-slider__arrow_left'),
  nextArrow: $('.brands-slider__arrow_right'),
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
  ]
});

$(function () {
  let slider = $('.brands-slider');

  $('.brands-slider__row .slick-prev').on('click', function () {
    $(slider).slick('slickPrev');
  });
  $('.brands-slider__row .slick-next').on('click', function () {
    $(slider).slick('slickNext');
  });
});

// Filter uislider

let priceSlider = document.querySelector('.price-filter__slider');

noUiSlider.create(priceSlider, {
  start: [0, 200000],
  connect: true,
  tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
  range: {
    'min': [0],
    'max': [200000]
  }
});

const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');

priceStart.addEventListener('change', setPriceValues);
priceEnd.addEventListener('change', setPriceValues);

function setPriceValues() {
  let priceStartValue;
  let priceEndValue;

  if (priceStart.value != '') {
    priceStartValue = priceStart.value;
  }
  if (priceEnd.value != '') {
    priceEndValue = priceEnd.value;
  }
  priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
}

// Spoiler

$(document).ready(function () {
  $('.section-filter__title_spoiler').click(function (event) {
    if ($('.section-filter_spoiler').hasClass('section-filter__title_spoiler')) {
      $(".section-filter__title_spoiler").not($(this)).removeClass('active');
      $(".section-filter__inner").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  });
});

// Select

$(document).ready(function () {
  $('.js-example-basic-single').select2();
});

// Pagination

$("#pagination__slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true
});

// Product slider

$("#images-product__slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false
});


let sliderOne = $('#images-product__slider');

$("#images-subslider").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  asNavFor: sliderOne,
});

// Quantity

let quantityButtons = document.querySelectorAll('.quantity__button');

if (quantityButtons.length > 0) {
  for (let index = 0; index < quantityButtons.length; index++) {
    const quantityButton = quantityButtons[index];
    quantityButton.addEventListener("click", function (event) {
      event.preventDefault();
      let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
      if (quantityButton.classList.contains('quantity__button_plus')) {
        value++;
      }

      else {
        value = value - 1;
        if (value < 1) {
          value = 1
        }
      }
      quantityButton.closest('.quantity').querySelector('input').value = value;
    });
  }
}

// Tabs

$(".tabs-product__block:first").show();
$(".tabs-product__item:first").addClass("active");

$(".tabs-product__item").click(function (event) {
  event.preventDefault();
  index = $(this).index();
  $(".tabs-product__item").removeClass("active");
  $(this).addClass("active");
  $(".tabs-product__block").hide();
  $(".tabs-product__block").eq(index).show();
});


// Checkbox

$(document).on("click", '.block-checkout__checkbox', function (event) {
  event.preventDefault();
  $(this).toggleClass('active');
});



























