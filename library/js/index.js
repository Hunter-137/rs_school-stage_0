console.log('блок <header> +2\nсекция Welcome +2\nсекция About +4.\nсекция Favorites +2\nСделать кнопку own, вместо buy для последней книги. +2\nсекция CoffeShop +4\nсекция Contacts +4\nсекция LibraryCard +4\nблок <footer> + 2\n\nнет полосы прокрутки при ширине страницы от 1440рх до 640рх +4.\nэлементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4.\nэлементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4.\n\nЕсли иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа: +2\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4\nпри нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +1 (у меня работает только по кнопке, поэтому половина балла...)\nразмеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect +1 (не везде попал, ех)\n\n\nИтог: 48/50\nБольшое спасибо за ревью, Ревьювер!\nБуду очень признателен, если укажешь на мои ошибки ^-^');

// включение dom и "прослушка" на всё дерево
document.addEventListener('DOMContentLoaded', function() {

  // ************************************* БУРГЕР МЕНЮ ******************************************** 

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

  // ************************************* КАРУСЕЛЬ ************************************************
  
  // тут я вытащил медиазапросы, на всякий случай (3/5 пригодились)
  const mediaQueryMin1400 = window.matchMedia('(min-width: 1400px)');
  const mediaQueryMax1399 = window.matchMedia('(max-width: 1399px)');
  const mediaQueryMax962 = window.matchMedia('(max-width: 962px)');
  const mediaQueryEquals768 = window.matchMedia('(width: 768px)');
  const mediaQueryMax670 = window.matchMedia('(max-width: 670px)');


  // здесь я вытащил каждую кнопку-кругляшок
  const circle1 = document.querySelector('.main-about-circle_1');
  const circle2 = document.querySelector('.main-about-circle_2');
  const circle3 = document.querySelector('.main-about-circle_3');
  const circle4 = document.querySelector('.main-about-circle_4');
  const circle5 = document.querySelector('.main-about-circle_5');
  // затем закинул их всех в один массив
  const circles = [circle1, circle2, circle3, circle4, circle5];
  // также вытащил родительский блок карусельки
  const slide = document.querySelector('.carousel');
  // добавил текущий индекс
  let currentIndex = 0;
  
  // и прописываю функцию на обновление карусели и кнопок кругляшок
  const updateSlideAndCircle = () => {
    circles.forEach(function(circle, index){ // перебираю каждый элемент массива и индекс каждого элемента из массива (1 параметр circle отвечает за элементы в массиве, 2 параметр index за индексы элементов массива)
      if (currentIndex === index) { // если текущий индекс равен индексу элемента из массива*
        circle.classList.add('active'); // то добавить к кругляшку класс active (меняю цвет в css)
      } else {
        circle.classList.remove('active'); // в противном случае убрать у элемента из массива класс active
      }

      // ниже код дополнен анимацией
      // по тз слайд должен остановиться после того как дошел до конца
      // поэтому я убираю кнопку и возвращаю её в положение, в соответствии с размером экрана монитора
      if (mediaQueryMax962.matches) { // если подтверждается (matches), что экран меньше чем 962px, то
        // ПРАВАЯ СТРЕЛКА
        // в случае, если текущий индекс кнопки дошел до конца всего массива
        if (currentIndex >= circles.length - 1) {
          nextArrowSlide.style.right = '50%'; // сместить правую стрелку в картинку (спрятал стрелку позади картинки)
        // но если текущий индекс меньше чем количество элементов всего массива, то
        } else if (currentIndex < circles.length - 1) {
          nextArrowSlide.style.right = '13%'; // вернуть кнопку обратно на место
        }
        
        // ЛЕВАЯ СТРЕЛКА
        if (currentIndex === 0) { // если текущий индекс равен началу (нулевому индексу из массива, т.е. первому элементу -- кнопки-кругляшки)
          prevArrowSlide.style.left = '50%'; // спрятать стрелку в центр позади картинки
        } else if (currentIndex > 0) { // если текущий индекс (активная кнопка) не нулевой, то
          prevArrowSlide.style.left = '13%'; // вернуть на место стрелку
        }
      }

      // ниже код идентичен, разница лишь в медиа запросах и положениях стрелок
      if (mediaQueryEquals768.matches) {
        if (currentIndex >= circles.length - 1) {
          nextArrowSlide.style.right = '50%';
        } else if (currentIndex < circles.length - 1) {
          nextArrowSlide.style.right = '82px';
        }
  
        if (currentIndex === 0) {
          prevArrowSlide.style.left = '50%';
        } else if (currentIndex > 0) {
          prevArrowSlide.style.left = '72px';
        }
      }

      if (mediaQueryMax670.matches) {
        if (currentIndex >= circles.length - 1) {
          nextArrowSlide.style.right = '50%';
        } else if (currentIndex < circles.length - 1) {
          nextArrowSlide.style.right = '70px';
        }
  
        if (currentIndex === 0) {
          prevArrowSlide.style.left = '50%';
        } else if (currentIndex > 0) {
          prevArrowSlide.style.left = '60px';
        }
      }
    });


    // currentIndex меняется ниже, в коде по событию клик и перелистыванию: функция nextSlide/prevSlide (отмечено звёздочками)
    // а так в целом этот код выше перебирая каждый элемент из массива находит нужный через текущий индекс
    // и просто добавляет нужные классы нужному мне элементу, а у остальных он его убирает

    slide.className = 'carousel'; // затем стирается класс у родителя и ставится снова
    slide.classList.add(`slide${currentIndex + 1}`); // и добавляется к нему нужный мне класс для css
  };

    // если бы я не обновлял имя класса каждый раз, то в дереве у меня бы скапливались slide1/slide2/slide3 и т.д.
    // и чтобы заново всё почистить и вставить что мне нужно используется "className" для родителя


  // теперь добавляем событие клик на наши кнопки кругляшки, также через перебор массива
  circles.forEach(function(circle, index){
    circle.addEventListener('click', function(){
      currentIndex = index; // *и говорим, что теперь текущий индекс будет равен индексу выбранного элемента из массива 
      updateSlideAndCircle(); // и запускаем функцию по обновлению классов
    })
  });

  // без кода выше не работали бы кнопки и функция по обновлению классов была бы напрасной
  // здесь мы именно вешаем событие по клику — это первое, что делает кнопки интерактивными
  // и меняем текущий индекс на выбранный индекс элемента из массива
  // если кликнули на вторую кнопку, значит в переборе массива выдаст нам второй элемент из массива
  // индекс которого равен 1
  // меняем текущий индекс 0 на 1
  // запускаем функцию по обновлению классов и функция говорит, если найден одинаковый индекс
  // то ему добавить класс active, а у остальных удалить класс active 
  
  
  // функция nextSlide нужна для кнопок-стрелок вперед и назад (конкретна эта функция отвечает за переход по клику вперёд)
  function nextSlide() {
    // кликая вперед, мы обновляем текущий индекс на +1
    currentIndex = (currentIndex + 1) % circles.length; // остаток от деления не дает нам выйти за пределы количества элементов из массива
    updateSlideAndCircle(); // запускаем функцию по обновлению классов
  }

  // остаток от деления выше работает следующим образом:
  // допустим текущий индекс = 0 (это первый слайд)
  // 0 + 1 = текущий индекс 1 (это уже второй слайд)
  // circles.length = 5, т.к. в массиве всего 5 элементов
  // 1 % 5 = 1; 2 % 5 = 2; 3 % 5 = 3; 4 % 5 = 4...
  // индекс 4 это пятый круглешок, так как индекс отсчиывается с нуля
  // как только индекс поднимается до пяти, то он сбрасывается до нуля обратно, ведь 5 % 5 = 0
  // таким образом создается цикличность внутри карусели, внутри массива из 5 элементов

  // *****************************************
  // function nextSlide() {
  //   if (currentIndex < circles.length - 1) {
  //     currentIndex++;
  //   } else {
  //     currentIndex = circles.length + 1;
  //   }
  //   updateSlideAndCircle();
  // }

  // это была безудержная попытка убрать цикличность. частично получилось, но есть побочный эффект
  // при клике в обратную сторону слайд остается на месте, и только при повторе передвигается в нужное направление
  // как исправить не знать и плакать :(
  // *****************************************

  // теперь тоже самое, только в обратную сторону, функция для клика на стрелку влево
  function prevSlide() {
    // кликая назад мы убавляем текущий индекс на -1 + 5 (количество элементов в массиве)
    currentIndex = (currentIndex - 1 + circles.length) % circles.length;
    updateSlideAndCircle(); // обновляем классы с текущим индексом
  }

  // принцип работы тот же:
  // допустим текущий индекс 0
  // 0 - 1 + 5 = 4 % 5 = 4 (как раз если мы находимся на первом слайде, то шаг назад запустит нас в 4 слайд)
  // 1 - 1 + 5 = 5 % 5 = 0 (если были на втором слайде, то переместимся на индекс 0 — на первый слайд)
  // 2 - 1 + 5 = 6 % 5 = 1
  // 3 - 1 + 5 = 7 % 5 = 2
  // 4 - 1 + 5 = 8 % 5 = 3
 
  // *****************************************
  // function prevSlide() {
  //   if (currentIndex > 0) {
  //     currentIndex--;
  //   } else {
  //     currentIndex = circles.length - 1;
  //   }
  //   updateSlideAndCircle();
  // }
  // это была безудержная попытка убрать цикличность. частично получилось, но есть побочный эффект
  // при клике в обратную сторону слайд остается на месте, и только при повторе передвигается в нужное направление
  // как исправить не знать и плакать :(
  // *****************************************

  // вытаскиваем с дерева стрелки влево и вправо
  const nextArrowSlide = document.querySelector('.main-about-img-button.right');
  const prevArrowSlide = document.querySelector('.main-about-img-button.left');


  // вешаем событие клик на стрелку вправо
  nextArrowSlide.addEventListener('click', function(event){
    // как только кликнули на неё, запускаем функции по переходу слайда и обновление классов
    nextSlide();
    updateSlideAndCircle();
  });

  // вешаем событие клик на стрелку влево
  prevArrowSlide.addEventListener('click', function(event){
    // как только кликнули на неё, запускаем функции по переходу слайда и обновление классов
    prevSlide();
    updateSlideAndCircle();
  })
});

// *********************************БЛОК FAVOURITES СЛАЙД КНИГ***************************************

// так как есть некоторые переменные с одинаковым наименованием из прошлых кодов, решил создать новую прослушку на всё дерево
document.addEventListener('DOMContentLoaded', function() {
  // вывел каждую кнопку по смене сезона
  const winterLabel = document.querySelector('.main-favorites-label.winter');
  const springLabel = document.querySelector('.main-favorites-label.spring');
  const summerLabel = document.querySelector('.main-favorites-label.summer');
  const autumnLabel = document.querySelector('.main-favorites-label.autumn');
  // закинул все кнопки в один массив
  const seasonsLabel = [winterLabel, springLabel, summerLabel, autumnLabel];
  // вывел каждый сезонный блок по книгам 
  const winterInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.winter');
  const springInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.spring');
  const summerInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.summer');
  const autumnInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.autumn');
  // также в один массив
  const seasonsInfoBlock = [winterInfoBlock, springInfoBlock, summerInfoBlock, autumnInfoBlock];
  // указал текущий индекс
  let currentIndex = 0;

  // перебор массива по кнопкам
  seasonsLabel.forEach(function(label, index){
    // ставлю событие клик на элемент из массива по кнопкам
    label.addEventListener('click', function(){
      // указываю, что если кликнут первая кнопка (первый элемент с индексом 0)
      currentIndex = index; // то текущий индекс будет равен индексу элемента
      updateSeasonDisplay(); // запускаю функцию по обновлению
    });
  });

  // функция по обновлению блоков
  function updateSeasonDisplay() {
    // перебираю КОЛЛЕКЦИИ в массиве блоков
    seasonsInfoBlock.forEach(function(infoBlock, index){
      // внутри уже перебираю ЭЛЕМЕНТЫ в коллекциях
      infoBlock.forEach(function(block) {
        // и уже с ЭЛЕМЕНТАМИ я работаю
        if (currentIndex === index) { // если текущий индекс равен выбранному индексу элемента
          block.style.display = 'initial'; // показать блок
        } else { // а у остальных
          block.style.display = 'none'; // скрыть
        }
      });
    });
  }

});

// **************************************ДРОП-МЕНЮ НА ИКОНКЕ****************************************

// в целом всё также как и в бургер меню
document.addEventListener('DOMContentLoaded', function(){
  const iconButton = document.querySelector('.header-ul-li-img'); // кнопка иконки профиля
  const dropMenu = document.querySelector('.header-profile-drop_menu'); // плашка
  const dropMenuTitle = document.querySelector('.header-profile-drop_menu-title'); // кнопка Profile
  const dropMenuText = document.querySelectorAll('.header-profile-drop_menu-text-a'); // кнопки под Profile
  
  // событие клик на кнопку иконки
  iconButton.addEventListener('click', function(event){
    dropMenu.classList.toggle('active'); // добавь класс active (если он уже есть, то убрать)
  });

  // событие клик на всё дерево html
  document.addEventListener('click', function(event){
    // если произошел клик Не на плашку и Не на иконку профиля
    if (!dropMenu.contains(event.target) && !iconButton.contains(event.target)) {
      dropMenu.classList.remove('active'); // удалить класс active
    }
  });

  // событие клик на всё дерево html
  document.addEventListener('click', function(event){
    // если внутри коллекции включают в себя событие клик (если нажали на кнопку из коллекции, кнопки в коллекции находятся)
    if (Array.from(dropMenuText).includes(event.target)) {
      dropMenu.classList.remove('active'); // удалить класс active
    }
  });

});

// ***************************** МОДАЛЬНОЕ ОКНО НА ЛОГИН И РЕГИСТР **********************************

// прослушка на всё дерево
document.addEventListener('DOMContentLoaded', function(){
  const modalLogIn = document.querySelector('.modal-Log_In'); // модальное окно Логина
  const openModalLogIn = document.querySelector('.header-profile-drop_menu-text-a.login'); // кнопка Login из дроп-меню
  const closeModalLogIn = document.querySelector('.modal-login-close_btn-icon'); // кнопка крестика из модального окна

  const modalRegister = document.querySelector('.modal-register'); // модальное окно регистрации
  const openModalRegister = document.querySelector('.header-profile-drop_menu-text-a.register'); // кнопка Register из дроп-меню
  const closeModalRegister = document.querySelector('.modal-register-close_btn-icon'); // кнопка крестика из модального окна

  const registerBtn = document.querySelector('.modal-login-postscript-btn'); // в модальном окне логина кнопка register
  const LoginBtn = document.querySelector('.modal-register-postscript-btn'); // в модальном окне регистрации кнопка login

  // при клике на кнопку login из дроп меню
  openModalLogIn.onclick = () => {
    modalLogIn.style.display = 'block'; // показать модальное окно
  };

  // при клике на кнопку крестика из модального окна
  closeModalLogIn.onclick = () => {
    modalLogIn.style.display = 'none'; // скрыть модальное окно
  };

  // при клике на кнопку login из дроп меню
  openModalRegister.onclick = () => {
    modalRegister.style.display = 'block'; // показать модальное окно
  };

  // при клике на кнопку крестика из модального окна
  closeModalRegister.onclick = () => {
    modalRegister.style.display = 'none'; // скрыть модальное окно
  };

  // при клике на кнопку register в модальном окне логина
  registerBtn.onclick = () => {
    modalRegister.style.display = 'block'; // показать модальное окно регистрации
    modalLogIn.style.display = 'none'; // скрыть модальное окно логина
  }

  // при клике на кнопку login в модальном окне регистрации
  LoginBtn.onclick = () => {
    modalLogIn.style.display = 'block'; // показать модальное окно логина
    modalRegister.style.display = 'none'; // скрыть модальное окно регистрации
  }

  // при клике на окно браузера
  window.onclick = (event) => {
    if (event.target === modalLogIn){ // является ли клик по окну браузера с модального окна логина
      modalLogIn.style.display = 'none'; // если да, то скрыть модальное окно логина
    } else if (event.target === modalRegister){ // является ли клик по окну браузера с модального окна регистрации
      modalRegister.style.display = 'none'; // если да, то скрыть модальное окно регистрации
    };
  };

});

// *************************** LOCALSTORAGE (регистрация и авторизация) ****************************/

document.addEventListener('DOMContentLoaded', function(){
  const dataRegisterFirstName = document.getElementById('dataRegisterFirstName'); // инпут по имени
  const dataRegisterLastName = document.getElementById('dataRegisterLastName'); // инпут по фамилии
  const dataRegisterEmail = document.getElementById('dataRegisterEmail'); // инпут по почте
  const dataRegisterPassword = document.getElementById('dataRegisterPassword'); // инпут по паролю

  const saveDataRegisterBtn = document.getElementById('saveDataRegisterBtn'); // кнопка регистрации из модального окна регистрации

  // создание функции на клик
  saveDataRegisterBtn.onclick = () => {
    const dataRegisterObj = {
      firstNameValue: dataRegisterFirstName.value,
      lastNameValue: dataRegisterLastName.value,
      emailValue: dataRegisterEmail.value,
      passwordValue: dataRegisterPassword.value,
    }

    localStorage.setItem('registerData', JSON.stringify(dataRegisterObj));
    alert('Registration successfully completed!');
  }

  const dataLoginEmailOrReadersCard = document.getElementById('dataLoginEmailOrReadersCard');
  const dataLoginPassword = document.getElementById('dataLoginPassword');

  const dataLoginAutoBtn = document.getElementById('dataLoginAutoBtn');

  dataLoginAutoBtn.onclick = () => {
    const savedDataRegisterStr = localStorage.getItem('registerData');
    const savedDataRegister = JSON.parse(savedDataRegisterStr);

    if (savedDataRegister.emailValue === dataLoginEmailOrReadersCard.value && savedDataRegister.passwordValue === dataLoginPassword.value) {
      alert('Welcome!');
    } else {
      alert('You entered the wrong email or password :(');
    }
  }

  


});






// });
// ********************************** МОИ ПОПЫТИ ПО КОДАМ *******************************************

  // самостоятельная попытка на слайд карусель
  // частичный успех. проблема состояла в том, что я не мог и не знал как соединить
  // готовую функцию по кнопкам связав их с перелистыванием по стрелкам

  // const mediaQueryMin1400 = window.matchMedia('(min-width: 1400px)');
  // const mediaQueryMax1399 = window.matchMedia('(max-width: 1399px)');
  // const mediaQueryMax962 = window.matchMedia('(max-width: 962px)');

  // let slide = document.querySelector('.carousel');

  // let circle1 = document.querySelector('.main-about-circle_1');
  // let circle2 = document.querySelector('.main-about-circle_2');
  // let circle3 = document.querySelector('.main-about-circle_3');
  // let circle4 = document.querySelector('.main-about-circle_4');
  // let circle5 = document.querySelector('.main-about-circle_5');

  // circle1.addEventListener('click', function(event) {

  //   if (mediaQueryMin1400.matches) {
  //     circle1.classList.add('active');
  //     circle2.classList.remove('active');
  //     circle3.classList.remove('active');
  //     circle4.classList.remove('active');
  //     circle5.classList.remove('active');

  //     slide.classList.add('slide1');
  //     slide.classList.remove('slide2');
  //     slide.classList.remove('slide3');
  //     slide.classList.remove('slide4');
  //     slide.classList.remove('slide5');
  //   }

  //   if (mediaQueryMax1399.matches) {
  //     circle1.classList.add('active');
  //     circle2.classList.remove('active');
  //     circle3.classList.remove('active');
  //     circle4.classList.remove('active');
  //     circle5.classList.remove('active');

  //     slide.classList.add('slide1');
  //     slide.classList.remove('slide2');
  //     slide.classList.remove('slide3');
  //     slide.classList.remove('slide4');
  //     slide.classList.remove('slide5');
  //   }
  // });

  // circle2.addEventListener('click', function(event) {
  //   if (mediaQueryMin1400.matches) {
  //     circle1.classList.remove('active');
  //     circle2.classList.add('active');
  //     circle3.classList.remove('active');
  //     circle4.classList.remove('active');
  //     circle5.classList.remove('active');

  //     slide.classList.remove('slide1');
  //     slide.classList.add('slide2');
  //     slide.classList.remove('slide3');
  //     slide.classList.remove('slide4');
  //     slide.classList.remove('slide5');
  //   }

  //   if (mediaQueryMax1399.matches) {
  //     circle1.classList.remove('active');
  //     circle2.classList.add('active');
  //     circle3.classList.remove('active');
  //     circle4.classList.remove('active');
  //     circle5.classList.remove('active');

  //     slide.classList.remove('slide1');
  //     slide.classList.add('slide2');
  //     slide.classList.remove('slide3');
  //     slide.classList.remove('slide4');
  //     slide.classList.remove('slide5');
  //   }
  // });

  // circle3.addEventListener('click', function(event) {
  //   if (mediaQueryMin1400.matches) {
  //     circle1.classList.remove('active');
  //     circle2.classList.remove('active');
  //     circle3.classList.add('active');
  //     circle4.classList.remove('active');
  //     circle5.classList.remove('active');

  //     slide.classList.remove('slide1');
  //     slide.classList.remove('slide2');
  //     slide.classList.add('slide3');
  //     slide.classList.remove('slide4');
  //     slide.classList.remove('slide5');
  //   }

  //   if (mediaQueryMax1399.matches) {
  //     circle1.classList.remove('active');
  //     circle2.classList.remove('active');
  //     circle3.classList.add('active');
  //     circle4.classList.remove('active');
  //     circle5.classList.remove('active');

  //     slide.classList.remove('slide1');
  //     slide.classList.remove('slide2');
  //     slide.classList.add('slide3');
  //     slide.classList.remove('slide4');
  //     slide.classList.remove('slide5');
  //   }
  // });

  // circle4.addEventListener('click', function(event) {
  //   if (mediaQueryMax1399.matches) {
  //     circle1.classList.remove('active');
  //     circle2.classList.remove('active');
  //     circle3.classList.remove('active');
  //     circle4.classList.add('active');
  //     circle5.classList.remove('active');

  //     slide.classList.remove('slide1');
  //     slide.classList.remove('slide2');
  //     slide.classList.remove('slide3');
  //     slide.classList.add('slide4');
  //     slide.classList.remove('slide5');
  //   }
  // });

  // circle5.addEventListener('click', function(event) {
  //   if (mediaQueryMax962.matches) {
  //     circle1.classList.remove('active');
  //     circle2.classList.remove('active');
  //     circle3.classList.remove('active');
  //     circle4.classList.remove('active');
  //     circle5.classList.add('active');

  //     slide.classList.remove('slide1');
  //     slide.classList.remove('slide2');
  //     slide.classList.remove('slide3');
  //     slide.classList.remove('slide4');
  //     slide.classList.add('slide5');
  //   }
  // });
// *************************************************************************************************

// попытка на слайд карусель
// попытка через chat-gpt, успешная. немного подкорректировав сумел повторить код нейросети и понять что откуда идет
// итоговый код в самом верху

// const mediaQueryMin1400 = window.matchMedia('(min-width: 1400px)');
// const mediaQueryMax1399 = window.matchMedia('(max-width: 1399px)');
// const mediaQueryMax962 = window.matchMedia('(max-width: 962px)');

// let slide = document.querySelector('.carousel');
// let currentIndex = 0; // Индекс текущего слайда

// let circle1 = document.querySelector('.main-about-circle_1');
// let circle2 = document.querySelector('.main-about-circle_2');
// let circle3 = document.querySelector('.main-about-circle_3');
// let circle4 = document.querySelector('.main-about-circle_4');
// let circle5 = document.querySelector('.main-about-circle_5');

// const circles = [circle1, circle2, circle3, circle4, circle5];

// // Функция для обновления активного слайда и кругляшка
// function updateSlideAndCircle() {
//   circles.forEach((circle, index) => {
//     if (index === currentIndex) {
//       circle.classList.add('active');
//     } else {
//       circle.classList.remove('active');
//     }
//   });

//   slide.className = 'carousel';
//   slide.classList.add(`slide${currentIndex + 1}`);
// }

// // Функция для переключения на следующий слайд
// function nextSlide() {
//   currentIndex = (currentIndex + 1) % circles.length;
//   updateSlideAndCircle();
// }

// // Функция для переключения на предыдущий слайд
// function prevSlide() {
//   currentIndex = (currentIndex - 1 + circles.length) % circles.length;
//   updateSlideAndCircle();
// }

// // Обработчики событий для кнопок кругляшек
// circles.forEach((circle, index) => {
//   circle.addEventListener('click', function(event) {
//     currentIndex = index;
//     updateSlideAndCircle();
//   });
// });

// // Обработчики событий для стрелок
// const leftArrowButton = document.querySelector('.main-about-img-button.left');
// const rightArrowButton = document.querySelector('.main-about-img-button.right');

// leftArrowButton.addEventListener('click', prevSlide);
// rightArrowButton.addEventListener('click', nextSlide);

  // *********************************************************************************************

  // попытка по слайду сезонных книг
  // идея заключалась в проверке двух индексов: если они сходятся, то включить дисплей блок, иначе скрыть
  // основная проблема заключалась в том, что я пытался применить стили для всей коллекций разом, а не для их элементов
  // снова же нейросеть меня подправила и также сделала замечание, что одинаковые наименования переменных
  //  во внешних и внутренних циклах могут конфликтовать друг с другом


//   document.addEventListener('DOMContentLoaded', function() {

// const winterLabel = document.querySelector('.main-favorites-label.winter');
// const springLabel = document.querySelector('.main-favorites-label.spring');
// const summerLabel = document.querySelector('.main-favorites-label.summer');
// const autumnLabel = document.querySelector('.main-favorites-label.autumn');

// const seasonsLabel = [winterLabel, springLabel, summerLabel, autumnLabel];


// const winterInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.winter');
// const springInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.spring');
// const summerInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.summer');
// const autumnInfoBlock = document.querySelectorAll('.main-favorites-staff_picks.autumn');

// const seasonsInfoBlock = [winterInfoBlock, springInfoBlock, summerInfoBlock, autumnInfoBlock];

// let currentIndex = 0;

// seasonsInfoBlock.forEach(function(infoBlock, index){
//   seasonsLabel.forEach(function(label, index){
//     label.addEventListener('click', function(){
//       currentIndex = index;
//     })
//   })
//   if (currentIndex === index) {
//     infoBlock.style.display = 'initial';
//   } else {
//     infoBlock.style.display = 'none';
//   }
// })

// const updateSeason = () => {
//   seasonsLabel.forEach(function(season, index){
//     if (currentIndex === index) {
//       seasonsInfoBlock[index].style.display = 'initial';
//     } else {
//       // seasonsInfoBlock[index].style.display = 'none';
//     }
//   })
// }

// seasonsLabel.forEach(function(season, index){
//   season.addEventListener('click', function(){
//     currentIndex = index;

//   })
// })