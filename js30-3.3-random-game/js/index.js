document.addEventListener('DOMContentLoaded', function (event) {
   
        const gameArea = document.querySelector(".game-area");
        const gameBoxes = document.querySelectorAll(".game-box"); // ячейки игрового поля
        const scoreElement = document.querySelector(".game-score-user"); // счётчик очков (элемент)
      
        let score = 0; // счетчик очков (для подсчета)
        // создание двумерного (матричного) массива 4х4
        // 4 массива в каждом из которых по 4 элемента
        let gameBoard = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
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
          for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length - 1; j++) {
              if (gameBoard[i][j] === gameBoard[i][j + 1]) {
                gameBoard[i][j] *= 2;
                gameBoard[i][j + 1] = 0;
                score += gameBoard[i][j];
              }
            }
          }
        }
      
        // Функция для перемещения плиток влево
        function moveTilesLeft() {
          for (let i = 0; i < gameBoard.length; i++) {
            let emptyIndex = -1;
            for (let j = 0; j < gameBoard[i].length; j++) {
              if (gameBoard[i][j] === 0 && emptyIndex === -1) {
                emptyIndex = j;
              } else if (gameBoard[i][j] !== 0 && emptyIndex !== -1) {
                gameBoard[i][emptyIndex] = gameBoard[i][j];
                gameBoard[i][j] = 0;
                emptyIndex++;
              }
            }
          }
        }
      
        // Функция для обработки нажатия клавиш
        function handleKeyPress(event) {
          if (event.key === "ArrowLeft") {
            moveTilesLeft();
            mergeTilesLeft();
            moveTilesLeft();
            generateNewTile();
            updateBoard();
          }
          // Добавьте обработку других клавиш для других направлений
        }
      
        // Инициализация игры
        function initGame() {
          generateNewTile();
          generateNewTile();
          updateBoard();
          document.addEventListener("keydown", handleKeyPress);
        }
      
        initGame();
      
});