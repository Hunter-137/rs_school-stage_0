document.addEventListener("DOMContentLoaded", function () {
  // прослушка на весь DOM
  const audioPlaylist = document.querySelector(".playlist"); // тег аудио, без него манипуляции с воспроизведением невозможны (или не знаю как по-другому)
  const song_1 = document.querySelector(".song_1"); // первая песня
  const song_2 = document.querySelector(".song_2"); // вторая песня
  const songs = [song_1, song_2]; // массив песен

  const img_1 = document.querySelector(".audio_image-box-item.first"); // первая картинка песни
  const img_2 = document.querySelector(".audio_image-box-item.second"); // вторая картинка песни

  const songName = document.querySelector(".controls-song_name"); // название песни
  const songAuthor = document.querySelector(".controls-song_author"); // автор песни

  const currentTimeLabel = document.querySelector(".current_time"); // текущее время песни
  const progressBarContainer = document.querySelector(".controls-progress_bar-container"); // контейнер статус бара
  const progressBar = document.querySelector(".controls-progress_bar"); // статус бар песни (ползунок этот, как правильно называется? :D)
  const endTimeLabel = document.querySelector(".end_time"); // конечное время песни

  const prevSongBtn = document.querySelector(".controls-icon.prevArrow"); // кнопка назад
  const playSongBtn = document.querySelector(".controls-icon.playIcon"); // кнопка воспроизведения
  const pauseSongBtn = document.querySelector(".controls-icon.pauseIcon"); // кнопка паузы
  const nextSongBtn = document.querySelector(".controls-icon.nextArrow"); // кнопка далее

  const headerBackground = document.querySelector(".header-background"); // фоновая картинка в header

  let currentSongIndex = 0; // текущий индекс песни
  let isSongPaused = false; // флаг: были ли остановлена песня?

  const startSong = () => {
    // функция по воспроизведению
    if (isSongPaused === false) {
      // если на паузу не кликали
      audioPlaylist.src = songs[currentSongIndex].src; // загрузить песню текущего индекса
      audioPlaylist.play(); // воспроизвести
    } else {
      // в противном случае (если флаг не false)
      audioPlaylist.play(); // просто воспроизвести песню (без загрузки, так песня продолжится, а не начнется заново)
    }
    
    playSongBtn.style.display = "none"; // сменить кнопку play на pause
    pauseSongBtn.style.display = "block";
    headerBackground.style.animationPlayState = "running"; // запускаем анимацию фоновой картинки
  };

  const pauseSong = () => {
    // функция по паузе
    isSongPaused = true; // меняем флаг "песня была остановлена (true)"
    audioPlaylist.pause(); // песню ставим на паузу
    pauseSongBtn.style.display = "none"; // меняем кнопки местами с паузы на play
    playSongBtn.style.display = "block";
    headerBackground.style.animationPlayState = "paused"; // останавливаем анимацию фоновой картинки
  };

  const nextSong = () => {
    // функция по следующей песне
    currentSongIndex++; // увеличиваем индекс на 1
    if (currentSongIndex >= songs.length) {
      // если текущий индекс больше или равен количеству песен из массива
      currentSongIndex = 0; // то сбрасываем индекс обратно на ноль
      isSongPaused = false; // устанавливаем флаг говоря что песня новая

      startSong(); // запускаем песню
    } else {
      // в противном случае (если текущий индекс Не равен количествую песен в массиве)
      isSongPaused = false; // устанавливаем флаг говоря что песня новая
      startSong(); // запускаем песню
    }

    playSongBtn.style.display = "none"; // меняем кнопки местами с паузы на play
    pauseSongBtn.style.display = "block";
    headerBackground.style.animationPlayState = "running"; // запускаем анимацию фоновой картинки
  };

  const prevSong = () => {
    // функция по предыдущей песне
    currentSongIndex--; // уменьшаем индекс на -1
    if (currentSongIndex < 0) {
      // если индекс меньше нуля
      currentSongIndex = songs.length - 1; // то ставим индекс на последний индекс массива
      isSongPaused = false; // устанавливаем флаг говоря что песня новая

      startSong(); // запускаем песню
    } else {
      // в противном случае (если индекс Не меньше нуля)
      isSongPaused = false; // устанавливаем флаг говоря что песня новая
      startSong(); // запускаем песню
    }

    playSongBtn.style.display = "none"; // меняем кнопки местами с паузы на play
    pauseSongBtn.style.display = "block";
    headerBackground.style.animationPlayState = "running"; // запускаем анимацию фоновой картинки
  };

  const updateInfoSong = () => {
    // функция по обновлению информации по песне
    if (currentSongIndex === 0) {
      // если индекс 0, значит песня первая
      songName.innerText = "Heartlezz"; // у первой песни имя Hearlezz
      songAuthor.innerText = "Bagew"; // автор песни Bagew
      img_1.style.opacity = "1"; // меняем стилистику прозрачности для плавной смены
      img_2.style.opacity = "0"; // в css стоит transition-duration: 500ms;
    } else if (currentSongIndex === 1) {
      // если индекс 1, значит текущая песня вторая
      songName.innerText = "Brown Eyes and All the Rest";
      songAuthor.innerText = "Carnival Youth";
      img_1.style.opacity = "0";
      img_2.style.opacity = "1";
    }
  };

  const updateStatusBar = () => {
    // функция по обновлению статус бара
    const currentTime = audioPlaylist.currentTime; // текущее время песни из тега audio в миллисекундах
    const endTime = audioPlaylist.duration; // общая продолжительность времени песни из тега audio в миллисекундах

    const currentMinutes = Math.floor(currentTime / 60); // делим миллисекунды на 60 секунд, округляем в меньшую сторону
    const currentSeconds = Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0"); // находим остатки от деления на 60, переводим в строку и говорим: нужна строка из двух значений, если значение одно, то подставить 0 (padStart(длина строки, ведущий символ если строка меньше чем 2 символа))
    const endMinutes = Math.floor(endTime / 60); // общая продолжительность песни в мс делим на 60 и округляем получая минуты
    const endSeconds = Math.floor(endTime % 60)
      .toString()
      .padStart(2, "0"); // добавляем 0, если в секундах длина строки равна 1 (вместо "2:1" будет "2:01")

    currentTimeLabel.textContent = `${currentMinutes}:${currentSeconds}`; // отображаем полученные данные как нужно (минуты:секунды)
    endTimeLabel.textContent = `${endMinutes}:${endSeconds}`; // отображаем полученные данные как нужно (минуты:секунды)

    const progress = (currentTime / endTime) * 100; // находим процентное соотношение между текущим временем и общей продолжительностью песни
    progressBar.style.width = `${progress}%`; // вставляем процентное значение в ширину статус бара
  };

  const setStatusBar = (event) => {
    // выбор места проигрывания по статус бару
    const width = progressBarContainer.clientWidth; // находим всю ширину контейнера статус бара
    const clickX = event.offsetX; // находим горизонтальную координату клика мыши по контейнеру статус бара
    const endTime = audioPlaylist.duration; // находим общую продолжительность песни

    audioPlaylist.currentTime = (clickX / width) * endTime; // текущее время песни = координата клика контейнера / ширину всего контейнера * на общую продолжительность песни
    // текущее время воспроизведении песни = (250px / 500px) * 180s "песня в три минуты"
    // итог: 0,5 * 180s = 90s (песня включится на 90 секунде)
  };

  playSongBtn.addEventListener("click", function (event) {
    // клик по воспроизведению
    startSong(); // запускаем песню
    updateInfoSong(); // обновляем информацию по песне
  });

  pauseSongBtn.addEventListener("click", function (event) {
    // клик по кнопке паузы
    pauseSong(); // останавливаем песню
  });

  nextSongBtn.addEventListener("click", function (event) {
    // кнопка next
    nextSong(); // запускаем следующую песню
    updateInfoSong(); // обновляем информацию о песне
  });

  prevSongBtn.addEventListener("click", function (event) {
    // если клик на кнопку "предыдущая"
    prevSong(); // запускаем предыдущую песню
    updateInfoSong(); // обновляем информацию о песне
  });

  audioPlaylist.addEventListener("timeupdate", updateStatusBar); // обновление статус бара

  progressBarContainer.addEventListener("click", setStatusBar); // выбор "места проигрывания песни" по статус бару

  audioPlaylist.addEventListener("ended", nextSong); // как только песня закончится, то запустить функцию "следующая песня"
});
