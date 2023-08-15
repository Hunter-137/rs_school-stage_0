console.log('блок <header> +2\nсекция Welcome +2\nсекция About +4.\nсекция Favorites +2\nСделать кнопку own, вместо buy для последней книги. +2\nсекция CoffeShop +4\nсекция Contacts +4\nсекция LibraryCard +4\nблок <footer> + 2\n\nнет полосы прокрутки при ширине страницы от 1440рх до 640рх +4.\nэлементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4.\nэлементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4.\n\nЕсли иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа: +2\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4\nпри нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +1 (у меня работает только по кнопке, поэтому половина балла...)\nразмеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect +1 (не везде попал, ех)\n\n\nИтог: 48/50\nБольшое спасибо за ревью, Ревьювер!\nБуду очень признателен, если укажешь на мои ошибки ^-^');

$(document).ready(function() { // "Подготовка (включение DOM) через jquery"
    // Всплывающее меню через добавление класса по клику на кнопку меню-бургер
    $('.header-burger_menu-button').click(function(event) { //обращение к кнопке при клике
      $('.header-burger_menu-button').toggleClass('active'); // добавление класса active при клике на кнопку
      $('.header-nav').toggleClass('active'); // добавление класса active при клике на кнопку
      $('.header-welcome-paragraph').toggleClass('active'); // добавление класса active при клике на кнопку
    });
    
    // Скрывать меню убирая с них классы, если кликнуть Не по меню
    $(document).click(function(event) { // обращение ко всему DOM (ко всему html)
      const menu = $('.header-nav'); // плашка от всплывающего меню-бургера
      const menuWrapper = $('.header-ul') // область плашки между кнопками
      const burgerButton = $('.header-burger_menu-button'); // кнопка меню-бургера (верхняя и нижняя полоска)
      const burgerButtonSpan = $('.header-burger_menu-button span'); // кнопка меню-бургера (полоска по середине)
      const welcomeParagraph = $('.header-welcome-paragraph'); //параграф в header над бэкграундом
        
      // Если кликнуть не по меню, не по обёртке, не по всей кнопке, то:
      if (!menu.is(event.target) && !menuWrapper.is(event.target) && !burgerButton.is(event.target) && !burgerButtonSpan.is(event.target)) {
        burgerButton.removeClass('active'); // удалить класс active с кнопки
        menu.removeClass('active'); // удалить класс active с меню
        welcomeParagraph.removeClass('active'); // удалить класс active с параграфа
      }
    });

    // Скрывать меню убирая с них классы, если кликнуть по якорным ссылкам
    $(document).click(function(event) { // обращение ко всему DOM (ко всему html)
        const menuItem = $('.header-ul-li-a'); // сами кнопки ссылки
        const menu = $('.header-nav'); // плашка от меню
        const burgerButton = $('.header-burger_menu-button'); // кнопка меню-бургер
        const welcomeParagraph = $('.header-welcome-paragraph'); // параграф

        // Если кликнул по якорной ссылке, то убрать класс active у: 
        if (menuItem.is(event.target)) {
            menu.removeClass('active'); // плашка от меню
            burgerButton.removeClass('active'); // кнопка меню-бургер
            welcomeParagraph.removeClass('active'); // параграф
        }
    })
  });


