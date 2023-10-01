document.addEventListener("DOMContentLoaded", function (event) {
  // загрузка DOM
  const input = document.querySelector(".header-item"); // инпут по запросу
  const mainContentBox = document.querySelectorAll(".main-content-item-box"); // коллекция контейнеров для картинок
  const searchIcon = document.querySelector(".header-item-icon"); // иконка по поисковику
  const searchClearBtn = document.querySelector(".header-item-clear_button"); // кнопка крестика стирающий текст пользователя

  // прослушка на браузер
  // при загрузке DOM выполнить функцию:
  window.addEventListener("DOMContentLoaded", function (event) {
    input.focus(); // установить метод фокус на инпут
  });

  // прослушка на инпут с функцией:
  input.addEventListener("input", function (event) {
    // если количество символов в значении инпута больше нуля
    if (input.value.length > 0) {
      searchClearBtn.style.display = "inline-block"; // то отобразить крестик
    } else {
      // иначе
      searchClearBtn.style.display = "none"; // убрать крестик
    }
  });

  // событие клик на крестик
  searchClearBtn.addEventListener("click", function (event) {
    input.value = ""; // установить в значение инпута пустую строку
    searchClearBtn.style.display = "none"; // убрать крестик
    input.focus(); // установить курсор в поле инпута
  });

  // функция по отображению картинок из api
  const showData = (data) => {
    let i = 0; // устанавливаем нулевой индекс
    const imgCount = data.results.length; // считаем количество элементов в массиве results из api ссылки

    // устанавливаем цикл (пока индекс меньше количества элементов в массиве) {
    // установим соответствующему индексу стиль фоновой картинки по ссылке из массива api; обновляем индекс +1 }
    while (i < imgCount) {
      mainContentBox[
        i
      ].style.backgroundImage = `url(${data.results[i].urls.regular})`;
      i++;
    }
  };

  // запрос API getData(тематика картинки)
  async function getData(query) {
    try { // попробовать выполнить код ниже:
      // Ответ = Ожидаем пока Принесут данные из (api ссылки) *query=${query} это запрос по переменной, а per_page=30 это количество запрашиваемых данных (30 картинок берем)
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=GQUt-7AxvVyv3xmNyBbhYfh3Rtsa-rVgif9xOaE4-qU`
      );
      // Данные = Ожидаем Ответ из json() *парсируем данные json*
      const data = await response.json();
      // отобразим в консоль полученные данные
      console.log(data);
      // ссылка на фото находится:
      // data.results[0].urls.regular

      showData(data); // запускаем функцию по отображению данных (картинок из api)
    } catch (error) { // если при выполнении кода выше возникла ошибка, то:
      alert( // вывести надпись попробовать снова через час (разрешено 50 запросов в час)
        "An error occurred, try again in an hour. The error is most likely due to other users exceeding the request limit (50 requests per hour allowed)"
      );
    }
  }

  // функция по обновлению картинок через запрос
  const updateUserQuery = () => {
    input.addEventListener("keydown", function (event) {
      //  слушатель события "клавиатуры" по инпуту
      if (event.key === "Enter") {
        // если кликнули по инпуту и нажали на клавишу Enter
        query = input.value; // переменная запроса равна значению этого инпута
        getData(query); // запускаем функцию по запросу api с заданной переменной
      }
    });

    // событие клик на иконку поисковика
    searchIcon.addEventListener("click", function (event) {
      query = input.value; // установить в запрос значение инпута
      getData(query); // запустить функцию по обработке запроса пользователя
    });
  };
  let query = "space"; // запрос по умолчанию, чтобы при загрузке страницы показывались картинки
  updateUserQuery(query); // запускаем функцию по обработке запроса пользователя

  getData(query); // запускаем функцию по обработке запроса по умолчанию

  // *************************__________Попытки по коду + помощь ChatGPT-3.5__________******************

  // // Получаем ссылку на элемент инпута
  // const input = document.querySelector('.header-item');

  // // Получаем ссылку на блок, в котором будут отображаться картинки
  // const mainContent = document.querySelector('.main-content');

  // // Функция для отправки запроса к API и обработки полученных данных
  // function searchImages(query) {
  //   // Формируем URL для запроса к API Unsplash
  //   const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

  //   // Отправляем GET-запрос к API
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Очищаем содержимое блока с картинками
  //       mainContent.innerHTML = '';

  //       // Обрабатываем полученные данные и создаем элементы с картинками
  //       data.results.forEach(result => {
  //         const image = document.createElement('img');
  //         image.src = result.urls.regular;
  //         image.alt = result.alt_description;

  //         const itemBox = document.createElement('div');
  //         itemBox.classList.add('main-content-item-box');
  //         itemBox.appendChild(image);

  //         mainContent.appendChild(itemBox);
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Ошибка при получении данных:', error);
  //     });
  // }

  // // Обработчик события для кнопки поиска
  // input.addEventListener('keydown', event => {
  //   if (event.key === 'Enter') {
  //     const query = input.value;
  //     searchImages(query);
  //   }
  // });

  //     // Получение ссылки на элементы DOM
  // const input = document.querySelector('.header-item');
  // const container = document.querySelectorAll('.main-content-item-box');

  // // Функция для отправки запроса к API и обработки данных
  // async function fetchImages(query) {
  //   const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     // Очистка контейнера перед добавлением новых картинок
  //     container.innerHTML = '';

  //     // Обработка полученных данных и добавление картинок в контейнер
  //     data.results.forEach((result) => {
  //       const img = document.createElement('img');
  //       img.src = result.urls.regular;
  //       img.alt = result.alt_description;
  //       container.appendChild(img);
  //     });
  //   } catch (error) {
  //     console.log('Произошла ошибка:', error);
  //   }
  // }

  // // Обработчик события для ввода текста в инпут
  // input.addEventListener('input', (event) => {
  //   const query = event.target.value;
  //   fetchImages(query);
  // });

  // const url = 'https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
  // const input = document.querySelector('.header-item');
  // const imgBox = document.querySelector('.main-content-item-box');
  // // console.log(url);

  // async function getData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     const imageUrl = data.results[0].links.download;
  //     console.log(imageUrl);
  //     imgBox.style.backgroundImage = `url(${imageUrl})`;
  // }
  // getData();

  // // imgBox.style.backgroundImage = url('data.results[0].links.download');
});
