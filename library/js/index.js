console.log('блок <header> +2\nсекция Welcome +2\nсекция About +4.\nсекция Favorites +2\nСделать кнопку own, вместо buy для последней книги. +2\nсекция CoffeShop +4\nсекция Contacts +4\nсекция LibraryCard +4\nблок <footer> + 2\n\nнет полосы прокрутки при ширине страницы от 1440рх до 640рх +4.\nэлементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4.\nэлементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4.\n\nЕсли иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа: +2\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4\nпри нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +1 (у меня работает только по кнопке, поэтому половина балла...)\nразмеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect +1 (не везде попал, ех)\n\n\nИтог: 48/50\nБольшое спасибо за ревью, Ревьювер!\nБуду очень признателен, если укажешь на мои ошибки ^-^');

// включение dom и "прослушка" на всё дерево
document.addEventListener('DOMContentLoaded', function() { 
  // выбор классов
  const burgerButton = document.querySelector('.header-burger_menu-button'); // кнопка меню бургера
  const menu = document.querySelector('.header-nav'); // плашка бургера
  const welcomeParagraph = document.querySelector('.header-welcome-paragraph'); // параграф
  const menuWrapper = document.querySelector('.header-ul'); // область меж кнопок
  const menuItem = document.querySelectorAll('.header-ul-li-a'); // сами кнопки

  // проверка на клик по кнопке меню бургера (addEventListener('click'))
  burgerButton.addEventListener('click', function(event) {
    // если кликнул по кнопке, то добавить класс active (при повторном клике убрать этот класс - toggle)
    burgerButton.classList.toggle('active'); // через active... превратить кнопку в крестик
    menu.classList.toggle('active'); // спустить плашку
    welcomeParagraph.classList.toggle('active'); // сдвинуть параграф
  });
  
  // проверка на клик всего дерева html (document.addEvent... вместо конкретной кнопки burgerButton.addEvent...)
  document.addEventListener('click', function(event) {
    // если плашка не была кликнута (...contains(event.target)) И не было кликнуто по области меж кнопок И не было кликнуто по кнопке бургера
    if (!menu.contains(event.target) && !menuWrapper.contains(event.target) && !burgerButton.contains(event.target)) {
      burgerButton.classList.remove('active'); // убрать класс active с кнопки
      menu.classList.remove('active'); // с плашки
      welcomeParagraph.classList.remove('active'); // с параграфа
    }
  });
  
  // скрыть меню бургер после клика на якорную кнопку
    document.addEventListener('click', function(event) {
    // Array.from() — преобразуем коллекцию в массив
    // если массив menuItem включает в себя событие клик
    if (Array.from(menuItem).includes(event.target)) {
      menu.classList.remove('active'); // то убери класс active с плашки
      burgerButton.classList.remove('active'); // с кнопки
      welcomeParagraph.classList.remove('active'); // с параграфа
    }
  });

  const mediaQueryMin1400 = window.matchMedia('(min-width: 1400px)');
  const mediaQueryMax1399 = window.matchMedia('(max-width: 1399px)');
  const mediaQueryMax962 = window.matchMedia('(max-width: 962px)');

  let slide1 = document.querySelector('.main-about-img_1');
  let slide2 = document.querySelector('.main-about-img_2');
  let slide3 = document.querySelector('.main-about-img_3');
  let slide4 = document.querySelector('.main-about-img_4');
  let slide5 = document.querySelector('.main-about-img_5');

  let circle1 = document.querySelector('.main-about-circle_1');
  let circle2 = document.querySelector('.main-about-circle_2');
  let circle3 = document.querySelector('.main-about-circle_3');
  let circle4 = document.querySelector('.main-about-circle_4');
  let circle5 = document.querySelector('.main-about-circle_5');

  circle1.addEventListener('click', function(event) {

    if (mediaQueryMin1400.matches) {
      circle1.classList.add('active');
      circle2.classList.remove('active');
      circle3.classList.remove('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.remove('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.remove('slide4');
      slide5.classList.remove('slide5');
    }

    if (mediaQueryMax1399.matches) {
      circle1.classList.add('active');
      circle2.classList.remove('active');
      circle3.classList.remove('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.remove('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.remove('slide4');
      slide5.classList.remove('slide5');
    }

    if (mediaQueryMax962.matches) {
      circle1.classList.add('active');
      circle2.classList.remove('active');
      circle3.classList.remove('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.remove('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.remove('slide4');
      slide5.classList.remove('slide5');
    }
  });

  circle2.addEventListener('click', function(event) {
    if (mediaQueryMin1400.matches) {
      circle1.classList.remove('active');
      circle2.classList.add('active');
      circle3.classList.remove('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.add('slide4');
      slide5.classList.remove('slide5');
    }

    if (mediaQueryMax1399.matches) {
      circle1.classList.remove('active');
      circle2.classList.add('active');
      circle3.classList.remove('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.add('slide3');
      slide4.classList.remove('slide4');
      slide5.classList.remove('slide5');
    }

    if (mediaQueryMax962.matches) {
      circle1.classList.remove('active');
      circle2.classList.add('active');
      circle3.classList.remove('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.add('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.remove('slide4');
      slide5.classList.remove('slide5');
    }
  });

  circle3.addEventListener('click', function(event) {
    if (mediaQueryMin1400.matches) {
      circle1.classList.remove('active');
      circle2.classList.remove('active');
      circle3.classList.add('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.add('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.add('slide4');
      slide5.classList.add('slide5');
    }

    if (mediaQueryMax1399.matches) {
      circle1.classList.remove('active');
      circle2.classList.remove('active');
      circle3.classList.add('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.add('slide2');
      slide3.classList.add('slide3');
      slide4.classList.add('slide4');
      slide5.classList.remove('slide5');
    }

    if (mediaQueryMax962.matches) {
      circle1.classList.remove('active');
      circle2.classList.remove('active');
      circle3.classList.add('active');
      circle4.classList.remove('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.add('slide3');
      slide4.classList.remove('slide4');
      slide5.classList.remove('slide5');
    }
  });

  circle4.addEventListener('click', function(event) {
    if (mediaQueryMax1399.matches) {
      circle1.classList.remove('active');
      circle2.classList.remove('active');
      circle3.classList.remove('active');
      circle4.classList.add('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.add('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.add('slide4');
      slide5.classList.add('slide5');
    }

    if (mediaQueryMax962.matches) {
      circle1.classList.remove('active');
      circle2.classList.remove('active');
      circle3.classList.remove('active');
      circle4.classList.add('active');
      circle5.classList.remove('active');

      slide1.classList.add('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.add('slide4');
      slide5.classList.remove('slide5');
    }
  });

  circle5.addEventListener('click', function(event) {
    if (mediaQueryMax962.matches) {
      circle1.classList.remove('active');
      circle2.classList.remove('active');
      circle3.classList.remove('active');
      circle4.classList.remove('active');
      circle5.classList.add('active');

      slide1.classList.add('slide1');
      slide2.classList.remove('slide2');
      slide3.classList.remove('slide3');
      slide4.classList.remove('slide4');
      slide5.classList.add('slide5');
    }
  });
  
  

});

