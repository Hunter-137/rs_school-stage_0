console.log('блок <header> +2\nсекция Welcome +2\nсекция About +4.\nсекция Favorites +2\nСделать кнопку own, вместо buy для последней книги. +2\nсекция CoffeShop +4\nсекция Contacts +4\nсекция LibraryCard +4\nблок <footer> + 2\n\nнет полосы прокрутки при ширине страницы от 1440рх до 640рх +4.\nэлементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4.\nэлементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4.\n\nЕсли иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа: +2\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4\nпри нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +1 (у меня работает только по кнопке, поэтому половина балла...)\nразмеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect +1 (не везде попал, ех)\n\n\nИтог: 48/50\nБольшое спасибо за ревью, Ревьювер!\nБуду очень признателен, если укажешь на мои ошибки ^-^');

$(document).ready(function() {
    // Всплывающее меню через добавление класса по клику на кнопку меню-бургер
    $('.header-burger_menu-button').click(function(event) {
      $('.header-burger_menu-button').toggleClass('active');
      $('.header-nav').toggleClass('active');
      $('.header-welcome-paragraph').toggleClass('active');
    });
    
    // Скрывать меню убирая с них классы, если кликнуть Не по 
    $(document).click(function(event) {
      const menu = $('.header-nav');
      const menuWrapper = $('.header-ul')
      const burgerButton = $('.header-burger_menu-button');
      const burgerButtonSpan = $('.header-burger_menu-button span');
      const welcomeParagraph = $('.header-welcome-paragraph');
  
      if (!menu.is(event.target) && !menuWrapper.is(event.target) && !burgerButton.is(event.target) && !burgerButtonSpan.is(event.target)) {
        burgerButton.removeClass('active');
        menu.removeClass('active');
        welcomeParagraph.removeClass('active');
      }
    });

    $(document).click(function(event) {
        const menuItem = $('.header-ul-li-a');
        const menu = $('.header-nav');
        const burgerButton = $('.header-burger_menu-button');
        const welcomeParagraph = $('.header-welcome-paragraph');

        if (menuItem.is(event.target)) {
            menu.removeClass('active');
            burgerButton.removeClass('active');
            welcomeParagraph.removeClass('active');
        }
    })
  });


