document.addEventListener("DOMContentLoaded", function (event) {
  const gameBoxes = document.querySelectorAll(".game-box"); // ячейки игрового поля
  const scoreElement = document.querySelector(".game-score-user"); // счётчик очков (элемент)

  const gameOverModal = document.querySelector(".modal-game_over"); // модальное окно завершения игры
  const gameOverModalCloseBtn = document.querySelector(".modal-game_over-close_btn"); // крестик в модальном окне завершении игры
  const gameOverModalRestartBtn = document.querySelectorAll(".modal-game_over-restart_btn"); // кнопка рестарта в модальном окне завершении игры
  const gameOverModalScoreElem = document.querySelector(".modal-game_over-score-item"); // элемент счётчика очков в модальном окне завершении игры

  const howToPlayModal = document.querySelector(".modal-how_to_play"); // модальное окно "Как играть?"
  const howToPlayModalBtn = document.querySelector(".FAQ-how_play"); // кнопка по модальному окну "Как играть?"
  const howToPlayModalCloseBtn = document.querySelector(".modal-how_to_play-close_btn"); // крестик в модальном окне "Как играть?"

  const bestScoresModal = document.querySelector(".modal-best_scores"); // модальное окно "Как играть?"
  const bestScoresModalBtn = document.querySelector(".FAQ-best_score"); // кнопка по модальному окну "Как играть?"
  const bestScoresModalCloseBtn = document.querySelector(".modal-best_scores-close_btn"); // крестик в модальном окне "Как играть?"

  const bestScoresTable = document.querySelectorAll(".modal-best_scores-item");

  let score = 0; // счетчик очков (для подсчета)
  // создание двумерного (матричного) массива 4х4
  // 4 массива в каждом из которых по 4 элемента
  let gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // Функция для обновления игрового поля
  function updateBoard() {
    // цикл: индекс итерации = 0
    // повторять цикл, пока индекс меньше количества элементов из коллекции ячеек игрового поля
    // в конце итерации индекс +1
    for (let i = 0; i < gameBoxes.length; i++) {
      // находим номер строки в игровом поле
      const row = Math.floor(i / 4); // если ячейка шестая (i = 5), значит 5 / 4 = 1,25 = 1 (округление в меньшую сторону)
      // находим номер столбца в игровом поле
      const col = i % 4; // если ячейка шестая (i = 5), значит 5 % 4 = 1, а это второй столбец (остаток после деления 1)
      // объединяем найденные номера строки и столбца
      // сначала поиск самого массива — это наш ряд или же номер строки
      // затем ищем элемент внутри данного массива — это наш столбец
      // по сути поиск ячейки по координатам — крест на крест, ну или как в экселе ИндексПоискПозиции :)
      const value = gameBoard[row][col]; // если gameBoard[1][1], значит это второй массив и второй элемент этого массива
      // теперь обращаемся к элементу из коллекции и присваиваем ему новый текст с условием
      // если значение по координате не равен нулю, то оставить значение, в противном случае установить пустую строку
      gameBoxes[i].textContent = value !== 0 ? value : "";
      // перезаписываем класс элементу из коллекции на game-box
      gameBoxes[i].className = "game-box";
      // и наконец добавляем класс value-{значение}
      // это нужно для css: если в ячейке установлено число 2
      // то классу value-2 присвоить стиль "другой цвет, например"
      gameBoxes[i].classList.add(`value-${value}`);
    }
    // устанавливаем в элемент счетчика значение переменной score
    scoreElement.textContent = score;
  }

  // Функция для генерации новой плитки
  function generateNewTile() {
    // создаем пустой массив для хранения пустых ячеек в игровом поле
    const emptyTiles = [];
    // создаем вложенные циклы for с индексами i и j
    // внешний цикл отвечает за перебор количества строк в игровом поле
    // повторять цикл, пока индекс i < количества массивов (строк) в матрице
    for (let i = 0; i < gameBoard.length; i++) {
      // внутренний цикл отвечает за перебор количества столбцов в игровом поле
      // повторять цикл, пока индекс j < количества элементов в определенном массиве матрицы
      for (let j = 0; j < gameBoard[i].length; j++) {
        // и говорим: если значение координаты равно нулю, то
        if (gameBoard[i][j] === 0) {
          // добавить в массив emptyTiles объект с двумя значениями: номер строки и номер столбца
          emptyTiles.push({ row: i, col: j });
        }
      }
    }
    // теперь проверяем, если новый массив имеет объекты внутри себя, то
    if (emptyTiles.length > 0) {
      // создаем переменную по рандомному индексу
      // внутри переменной создаем случайное число, умножаем на количество объектов в массиве, округляем в меньшую сторону
      const randomIndex = Math.floor(Math.random() * emptyTiles.length);
      // деструктуризация объекта:
      // то есть мы вытащили из объекта emptyTiles[randomIndex] его ключи row и col — случайную координату
      // и создали переменные с наименование их ключей
      // деструктуризация объекта const { row, col } = emptyTiles[randomIndex]; — это краткая запись:
      // const row = emptyTiles[randomIndex].row;
      // const col = emptyTiles[randomIndex].col;
      const { row, col } = emptyTiles[randomIndex];
      // теперь массиву игрового поля с этой случайно выбранной координатой
      // устанавливаем следующее значение
      // если рандом выдал меньше 0.9, то ставим значение 2, в противном случае 4
      // так мы с 90% шансом ставим 2 и с 10% шансом ставим 4 в пустую ячейку игрового поля
      gameBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  // Функция для слияния плиток влево
  function mergeTilesLeft() {
    // цикл по проверке номера строки в двумерном массиве (матрице)
    for (let i = 0; i < gameBoard.length; i++) {
      // внутри перебор номера столбца в двумерном массиве (матрице)
      // но кроме последнего столбца (length - 1)
      // делается для того, чтобы сверить текущую плитку с плиткой справа от неё
      // если бы сверяли все столбцы, то при сверке текущей плитки с плиткой справа от неё, мы бы вышли за пределы массива в целом
      for (let j = 0; j < gameBoard[i].length - 1; j++) {
        // теперь проверка:
        // если текущая плитка равна значению плитке справа от неё
        if (gameBoard[i][j] === gameBoard[i][j + 1]) {
          gameBoard[i][j] *= 2; // то удвоить текущую плитку
          gameBoard[i][j + 1] = 0; // плитку справа от неё обнулить
          score += gameBoard[i][j]; // обновить счетчик по значениям текущей плитки
        }
      }
    }
  }

  // самостоятельная попытка написания кода для слияния вправо
  function mergeTilesRight() {
    // перебор строк
    for (let i = 0; i < gameBoard.length; i++) {
      // перебор столбцов кроме последнего
      for (let j = 0; j < gameBoard[i].length - 1; j++) {
        // если текущая плитка равна плитке следующей по столбцу
        if (gameBoard[i][j] === gameBoard[i][j + 1]) {
          gameBoard[i][j + 1] *= 2; // то теперь мы просто удвоем плитку, которая стоит справа от текущей
          gameBoard[i][j] = 0; // а текущую обнулим
          score += gameBoard[i][j + 1]; // в счечик закинем очки из правой плитки
        }
      }
    }
  }

  // самостоятельная попытка написания кода для слияния вниз
  function mergeTilesDown() {
    // перебор строк кроме последней
    for (let i = 0; i < gameBoard.length - 1; i++) {
      // перебор столбцов
      for (let j = 0; j < gameBoard[i].length; j++) {
        // если текущая плитка равна плитке ниже по строке
        if (gameBoard[i][j] === gameBoard[i + 1][j]) {
          gameBoard[i + 1][j] *= 2; // то удвоим плитку ниже
          gameBoard[i][j] = 0; // а текущую преобразуем в 0
          score += gameBoard[i + 1][j]; // обновим счетчик по преобразованной плитке
        }
      }
    }
  }

  // самостоятельная попытка написания кода для слияния вверх
  function mergeTilesUp() {
    // перебор строк кроме последней
    for (let i = 0; i < gameBoard.length - 1; i++) {
      // перебор столбцов
      for (let j = 0; j < gameBoard[i].length; j++) {
        // если текущая плитка равна плитке ниже по значению
        if (gameBoard[i][j] === gameBoard[i + 1][j]) {
          gameBoard[i][j] *= 2; // удвоим текущую плитку
          gameBoard[i + 1][j] = 0; // а плитку ниже преобразуем в 0
          score += gameBoard[i][j]; // обновим счетчик по удвоенной плитке
        }
      }
    }
  }

  // помощь AI
  // сегодня логика от AI изменилась и теперь больше не используется emptyIndex (запись в самом конце)
  // взаимен появилась ещё одна переменная k, которая, насколько я понял, заменяет emptyIndex
  // но уже более понятным образом
  // я решил переписать прошлые функции по перемещениям под новый вид
  // так как на мой взгляд он более мне понятен
  // везде, где написано что попытка самостоятельная, нейросеть не использовалась

  // перемещение плиток вниз
  function moveTilesDown() {
    // начинаем цикл с проверки строк с конца
    for (let i = gameBoard.length - 1; i > 0; i--) {
      // теперь проверяем столбцы
      for (let j = 0; j < gameBoard[i].length; j++) {
        // если текущая плитка равна нулю, то:
        if (gameBoard[i][j] === 0) {
          // повторить действия:
          // k означает плитку выше по строке
          // пока k = 4(i) - 1 не дойдет до нуля (пока снизу вверх не пройдется цикл)
          for (let k = i - 1; k >= 0; k--) {
            // если плитка выше не равна нулю
            if (gameBoard[k][j] !== 0) {
              // то значение текущей плитки равна значению плитки выше
              gameBoard[i][j] = gameBoard[k][j];
              // а плитка выше обнуляется
              // и таким образом верхняя плитка передвигается вниз
              gameBoard[k][j] = 0;
              // если функция выше выполнена, то остановить итерацию
              break;
            }
          }
        }
      }
    }
  }

  // самостоятельная попытка написания кода с передвижением плитки вверх
  function moveTilesUp() {
    // перебор строк в двумерном массиве от начала до конца
    for (let i = 0; i < gameBoard.length; i++) {
      // перебор столбцов слева направо
      for (let j = 0; j < gameBoard[i].length; j++) {
        // если текущая плитка равна нулю
        if (gameBoard[i][j] === 0) {
          // то переберем плитки ниже, кроме самой последней
          for (k = i + 1; k <= gameBoard.length - 1; k++) {
            // сверяем, не равняется ли плитка ниже нулем
            if (gameBoard[k][j] !== 0) {
              // если да, то текущую верхнюю плитку заменяем на значение нижней плитки
              gameBoard[i][j] = gameBoard[k][j];
              // а нижнюю плитку заменяем на значение 0
              gameBoard[k][j] = 0;
              // и останавливаем итерацию, если функция выше выполнена успешно
              break;
            }
          }
        }
      }
    }
  }

  // самостоятельная попытка написания кода с передвижением плитки влево
  function moveTilesLeft() {
    // перебор строк
    for (let i = 0; i < gameBoard.length; i++) {
      // перебор столбцов
      for (let j = 0; j <= gameBoard[i].length; j++) {
        // если текущая плитка равна нулю
        if (gameBoard[i][j] === 0) {
          // то запускаем цикл по перебору плиток после текущей
          for (let k = j + 1; k <= gameBoard[i].length - 1; k++) {
            // и если нашлась следующая плитка с значением не равная нулю
            if (gameBoard[i][k] !== 0) {
              // поменять местами значения
              gameBoard[i][j] = gameBoard[i][k]; // текущая плитка теперь равна значению следующей
              gameBoard[i][k] = 0; // а следующая после текущей равна нулю
              break; // остановить итерацию после успешного выполнения кода выше
            }
          }
        }
      }
    }
  }

  // самостоятельная попытка написания кода с передвижением плитки вправо
  function moveTilesRight() {
    // перебор строк с начала до конца
    for (let i = 0; i < gameBoard.length; i++) {
      // перебор столбцов с конца до начала
      for (let j = gameBoard[i].length; j >= 0; j--) {
        // если текущая плитка равна нулю
        if (gameBoard[i][j] === 0) {
          // то запускаем цикл по перебору плиток после текущей
          for (let k = j - 1; k >= 0; k--) {
            // и если следующая плитка не равна нулю
            if (gameBoard[i][k] !== 0) {
              gameBoard[i][j] = gameBoard[i][k]; // текущая равна значению следующей
              gameBoard[i][k] = 0; // а следующая равна нулевому значению
              break; // остановить итерацию после успешного выполнения кода выше
            }
          }
        }
      }
    }
  }

  // функция по остановке игры
  function stopGame() {
    return; // return не дает функциям продолжиться, соответственно останавливает
  }

  // функция по рестарту игры
  function restartGame() {
    // перебрал строки и столбцы
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        // установил нулевое значение ячейке
        gameBoard[i][j] = 0;
      }
    }
  }

  // Функция для обработки нажатия клавиш
  function handleKeyPress(event) {
    // если нажата клавиша "стрелка влево"
    if (event.key === "ArrowLeft") {
      // то запустить функции:
      if (score > 2047) {
        // если очки превысили 2047
        gameOverModal.classList.add("active"); // то открыть модальное окно
        gameOverModalScoreElem.textContent = score; // отобразить набранные очки в модальном окне
        stopGame(); // остановить игру
      } else {
        // иначе
        moveTilesLeft(); // движение влево
        mergeTilesLeft(); // слияние влево
        moveTilesLeft(); // движение влево
        generateNewTile(); // генерация новой плитки с рандомным значением
        updateBoard(); // обновить игровое поле и счётчик очков
      }
    }

    // двойной запуск движения нужно для того, чтобы после слияния плиток
    // заполнить освободившиеся места (из двух делается одна и по новому свободному месту новая плитка передвигается)

    // Добавьте обработку других клавиш для других направлений
    // (добавил)
    if (event.key === "ArrowRight") {
      if (score > 2047) {
        // если очки превысили 2047
        gameOverModal.classList.add("active"); // то открыть модальное окно
        gameOverModalScoreElem.textContent = score; // отобразить набранные очки в модальном окне
        stopGame(); // остановить игру
      } else {
        // иначе
        moveTilesRight(); // движение вправо
        mergeTilesRight(); // слияние вправо
        moveTilesRight(); // движение вправо
        generateNewTile(); // добавление новой плитки
        updateBoard(); // обновление игрового поля и счётчик очков
      }
    }

    if (event.key === "ArrowUp") {
      if (score > 2047) {
        // если очки превысили 2047
        gameOverModal.classList.add("active"); // то открыть модальное окно
        gameOverModalScoreElem.textContent = score; // отобразить набранные очки в модальном окне
        stopGame(); // остановить игру
      } else {
        // иначе
        mergeTilesUp(); // движение вверх
        moveTilesUp(); // слияние вверх
        mergeTilesUp(); // движение вверх
        generateNewTile(); // добавление новой плитки
        updateBoard(); // обновление игрового поля и счётчик очков
      }
    }

    if (event.key === "ArrowDown") {
      if (score > 2047) {
        // если очки превысили 2047
        gameOverModal.classList.add("active"); // то открыть модальное окно
        gameOverModalScoreElem.textContent = score; // отобразить набранные очки в модальном окне
        stopGame(); // остановить игру
      } else {
        // иначе
        moveTilesDown(); // движение вниз
        mergeTilesDown(); // слияние вниз
        moveTilesDown(); // движение вниз
        generateNewTile(); // добавление новой плитки
        updateBoard(); // обновление игрового поля и счётчик очков
      }
    }
  }

  // Инициализация игры
  function initGame() {
    generateNewTile(); // создание первой плитки
    generateNewTile(); // создание второй плитки
    updateBoard(); // обновление игрового поля и счетчика
    document.addEventListener("keydown", handleKeyPress); // прослушка на клавиши
  }

  // прослушка на клик: если кликнуто на крестик в модальном окне
  gameOverModalCloseBtn.addEventListener("click", function (event) {
    gameOverModal.classList.remove("active"); // закрыть модальное окно
  });

  let leaderBoard = []; // пустой массив для будущих хранений набранных очков

  // для каждого элемента из коллекции по кнопке рестарта
  gameOverModalRestartBtn.forEach(function (btn) {
    // если кнопка кликнута
    btn.addEventListener("click", function (event) {
      let savedScore = score; // сохранить очки в новую переменную
      leaderBoard.push(savedScore); // закинуть в пустой массив сохранённые очки
      leaderBoard.sort((a, b) => b - a); // сортировка от большего к меньшему
      leaderBoard = leaderBoard.slice(0, 10); // обрезаем массив до 10 элементов
      localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard)); // закидываем всё это дело в localStorage

      // вытаскиваем данные из localStorage и попутно их парсируем обратно в массив из JSON
      const storedLeaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
      // создаем цикл, в котором говорим повторять действия, пока в массиве есть элементы
      for (let i = 0; i < storedLeaderBoard.length; i++) {
        // в индекс элемента коллекции установить значение индекса массива из localStorage
        bestScoresTable[i].textContent = storedLeaderBoard[i];
      }

      score = 0; // сбросить очки до нуля
      restartGame(); // запустить рестарт
      initGame(); // запустить игру
      gameOverModal.classList.remove("active"); // закрыть модальное окно
    });
  });

  // при клике на кнопку "Как играть?"
  howToPlayModalBtn.addEventListener("click", function (event) {
    howToPlayModal.classList.add("active"); // отобразить модальное окно "Как играть?"
  });

  // при клике на крестик в модальном окне "Как играть?"
  howToPlayModalCloseBtn.addEventListener("click", function (event) {
    howToPlayModal.classList.remove("active"); // закрыть модальное окно "Как играть?"
  });

  // при клике на кнопку "Как играть?"
  bestScoresModalBtn.addEventListener("click", function (event) {
    bestScoresModal.classList.add("active"); // отобразить модальное окно "Как играть?"
  });

  // при клике на крестик в модальном окне "Лучшие очки"
  bestScoresModalCloseBtn.addEventListener("click", function (event) {
    bestScoresModal.classList.remove("active"); // закрыть модальное окно "Лучшие очки"
  });

  initGame(); // запуск игры
});

// ******* Попытки по кодам + помощь ChatGPT 3.5 и мои рассуждения по работе кода нейросети *************

// // Функция для перемещения плиток влево
// данная функция работала корректно

// function moveTilesLeft() {
//   // проверяем строки в двумерном массиве (матрице)
//   for (let i = 0; i < gameBoard.length; i++) {
//     // устанавливаем переменную -1 чтобы отслеживать индекс первой пустой плитки в текущей строке
//     let emptyIndex = -1;
//     // теперь проверяем столбцы
//     for (let j = 0; j < gameBoard[i].length; j++) {
//       // проверяем: если текущая плитка равна нулю, а индекс не менялся
//       // значит текущая плитка пустая
//       if (gameBoard[i][j] === 0 && emptyIndex === -1) {
//         // запоминаем эту пустую плитку
//         emptyIndex = j;
//         // но если текущая плитка не равна нулю и также индекс под пустую плитку был изменен
//       } else if (gameBoard[i][j] !== 0 && emptyIndex !== -1) {
//         // тогда установим в перемещенную плитку значение текущей плитки
//         gameBoard[i][emptyIndex] = gameBoard[i][j];
//         // у (уже прошлой) текущей плитки установим значение 0, так как мы её перенесли
//         gameBoard[i][j] = 0;
//         // проверяем следующую плитку
//         // (наш j уже изменен, поэтому грубо говоря мы обновляем столбец на +1)
//         emptyIndex++;
//         // теперь проходит новая итерация по циклу и всё проверяется заново
//         // но уже с обновленными данными
//       }
//     }
//   }
// }

// // самостоятельная попытка по перемещению плиток вправо
// // всё же пришлось воспользоваться помощью :(
// function moveTilesRight() {
//   for (let i = 0; i < gameBoard.length; i++) {
//     let emptyIndex = -1;
//     // теперь цикл идёт в обратную сторону
//     // сначала начинается с последнего столбца
//     // заканчивает первым — справа налево
//     // j = 3; повторять итерации пока индекс больше или равно нулю; индекс j - 1;
//     for (let j = gameBoard[i].length - 1; j >= 0; j--) {
//       if (gameBoard[i][j] === 0 && emptyIndex === -1) {
//         emptyIndex = j;
//       } else if (gameBoard[i][j] !== 0 && emptyIndex !== -1) {
//         gameBoard[i][emptyIndex] = gameBoard[i][j];
//         gameBoard[i][j] = 0;
//         emptyIndex--;
//       }
//     }
//   }
// }

/* 
          постараюсь "зарисовать функцию выше"
          вот есть игровое поле: двумерный массив (матрица)

          [0, 0, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]

          предположим есть цифра два в первой строке третьего столбца
          проходит проверка через цикл, сам цикл начинается с конца столбца

          [0, 0, 2, ПРОВЕРКА],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]

          по проверке обнаружилось, что текущая плитка пустая, поэтому мы эту координату сохраняем
          столбец записывается в emptyIndex — не значение, а сама координата — ось Y

          [0, 0, 2, 0(emptyIndex = 3)],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]

          j-- и начинается новая итерация
          
          [0, 0, 2(ПРОВЕРКА), 0(emptyIndex = 3)],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]

          проверяется теперь третий столбец
          так как эта ячейка не равна нулю И emptyIndex не равен -1, так как он обновлен
          выполняется следующий код:
          теперь координата с epmtyIndex равна значению непустой клетки
          "gameBoard[i][emptyIndex] = gameBoard[i][j];"

          [0, 0, 2(НЕ пустая клетка!), 2(emptyIndex = 3)],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]

          а затем предыдущая клетка чистится
          "gameBoard[i][j] = 0;"

          [0, 0, 0(теперь она пустая), 2(emptyIndex = 3)],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]

          и наконец emptyIndex - 1
          AI говорит, что через него указывается следующая пустая плитка
          но я не допёр как именно :/

          [0, 0, 0, 2(emptyIndex = 2)],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]

          поигравшись с отключением emptyIndex-- и ++ я обнаружил, что плитки вбиваются до конца края
          даже если есть неподходящее число для мержа
          такое число просто удаляется и крайнее число перемещается в конец
          хм...
        */

// самостоятельная попытка написания кода по передвижению плиток вниз
// снова неудачно. код ругается на неопределенное значение плитки

// function moveTilesDown() {
//   for (let i = 0; i < gameBoard.length - 1; i++) {
//     emptyIndex = -1;
//     for (let j = 0; j < gameBoard[i].length; j++) {
//       if (gameBoard[i + 1][j] === 0 && emptyIndex === -1) {
//         emptyIndex = i;
//       } else if (gameBoard[i + 1][j] !== 0 && emptyIndex !== -1) {
//         gameBoard[i][j] = gameBoard[emptyIndex][j];
//         gameBoard[i][j] = 0;
//         emptyIndex++;
//       }
//     }
//   }
// }

// функция по проверке проигрыша
// отработала плохо, куда бы я её не ставил: во время игры даже если ход имеется
// то могла всё равно сработать фраза "давай по новой?"

// function canMergeTiles(board) {
//   for (let i = 0; i < board.length - 1; i++) {
//     for (let j = 0; j < board[i].length - 1; j++) {
//       if (board[i][j] === board[i + 1][j] || board[i][j] === board[i][j + 1]) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// if (!canMergeTiles(gameBoard)) {
//   console.log("ДАВАЙ ПО НОВОЙ?");
// }
