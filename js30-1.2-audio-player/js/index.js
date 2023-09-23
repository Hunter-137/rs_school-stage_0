document.addEventListener('DOMContentLoaded', function(){ // прослушка на весь DOM
    const audioPlaylist = document.querySelector('.playlist'); // тег аудио, без него манипуляции с воспроизведением невозможны (или не знаю как по-другому)
    const song_1 = document.querySelector('.song_1'); // первая песня
    const song_2 = document.querySelector('.song_2'); // вторая песня
    const songs = [song_1, song_2,]; // массив песен

    const img_1 = document.querySelector('.audio_image-box-item.first'); // первая картинка песни
    const img_2 = document.querySelector('.audio_image-box-item.second'); // вторая картинка песни

    const songName = document.querySelector('.controls-song_name'); // название песни
    const songAuthor = document.querySelector('.controls-song_author'); // автор песни

    const currentTime = document.querySelector('.current_time'); // текущее время песни
    const progressBar = document.querySelector('.controls-progress_bar'); // статус бар песни (ползунок этот, как правильно называется? :D)
    const endTime = document.querySelector('.end_time'); // конечное время песни

    const prevSongBtn = document.querySelector('.controls-icon.prevArrow'); // кнопка назад
    const playSongBtn = document.querySelector('.controls-icon.playIcon'); // кнопка воспроизведения
    const pauseSongBtn = document.querySelector('.controls-icon.pauseIcon'); // кнопка паузы
    const nextSongBtn = document.querySelector('.controls-icon.nextArrow'); // кнопка далее

    let currentSongIndex = 0; // текущий индекс песни
    let isSongPaused = false; // флаг: были ли остановлена песня?

    playSongBtn.addEventListener('click', function(event){ // клик по воспроизведению
        if (isSongPaused === false) { // если на паузу не кликали
            audioPlaylist.src = songs[currentSongIndex].src; // загрузить песню текущего индекса
            audioPlaylist.play(); // воспроизвести
        } else { // в противном случае (если флаг не false)
            audioPlaylist.play(); // просто воспроизвести песню (без загрузки, так песня продолжится, а не начнется заново)
        }
        playSongBtn.style.display = 'none'; // сменить кнопку play на pause
        pauseSongBtn.style.display = 'block';
    });

    pauseSongBtn.addEventListener('click', function(event){ // клик по кнопке паузы
        isSongPaused = true; // меняем флаг "песня была остановлена (true)"
        audioPlaylist.pause(); // песню ставим на паузу
        pauseSongBtn.style.display = 'none'; // меняем кнопки местами с паузы на play
        playSongBtn.style.display = 'block';
    });

    nextSongBtn.addEventListener('click', function(event){ // кнопка next
        currentSongIndex++; // увеличиваем индекс на 1
        if (currentSongIndex >= songs.length) { // если текущий индекс больше или равен количеству песен из массива
            currentSongIndex = 0; // то сбрасываем индекс обратно на ноль
            isSongPaused = false; // устанавливаем флаг говоря что песня новая

            if (isSongPaused === false) { // повторяем код (возможно позже оптимизирую путем добавления простых функций)
                audioPlaylist.src = songs[currentSongIndex].src;
                audioPlaylist.play();
            } else {
                audioPlaylist.play();
            }

        } else {
            isSongPaused = false;

            if (isSongPaused === false) {
                audioPlaylist.src = songs[currentSongIndex].src;
                audioPlaylist.play();
            } else {
                audioPlaylist.play();
            }
            
        }
        
        playSongBtn.style.display = 'none';
        pauseSongBtn.style.display = 'block';

        if (currentSongIndex === 0) { // если индекс 0, значит песня первая
            songName.innerText = 'Heartlezz'; // у первой песни имя Hearlezz
            songAuthor.innerText = 'Bagew'; // автор песни Bagew
            img_1.style.opacity = '1'; // меняем стилистику прозрачности для плавной смены
            img_2.style.opacity = '0'; // в css стоит transition-duration: 500ms;
        } else if (currentSongIndex === 1) { // если индекс 1, значит текущая песня вторая
            songName.innerText = 'Brown Eyes and All the Rest';
            songAuthor.innerText = 'Carnival Youth';
            img_1.style.opacity = '0';
            img_2.style.opacity = '1';
        }
    });

    prevSongBtn.addEventListener('click', function(event){ // если клик на кнопку "предыдущая"
        currentSongIndex--; // уменьшаем индекс на -1
        if (currentSongIndex < 0) { // если индекс меньше нуля
            currentSongIndex = songs.length - 1; // то ставим индекс на последний индекс массива
            isSongPaused = false; // устанавливаем флажок и по новой код...

            if (isSongPaused === false) {
                audioPlaylist.src = songs[currentSongIndex].src;
                audioPlaylist.play();
            } else {
                audioPlaylist.play();
            }

        } else {
            
            isSongPaused = false;

            if (isSongPaused === false) {
                audioPlaylist.src = songs[currentSongIndex].src;
                audioPlaylist.play();
            } else {
                audioPlaylist.play();
            }

        }
        playSongBtn.style.display = 'none';
        pauseSongBtn.style.display = 'block';

        if (currentSongIndex === 0) {
            songName.innerText = 'Heartlezz';
            songAuthor.innerText = 'Bagew';
            img_1.style.opacity = '1';
            img_2.style.opacity = '0';
        } else if (currentSongIndex === 1) {
            songName.innerText = 'Brown Eyes and All the Rest';
            songAuthor.innerText = 'Carnival Youth';
            img_1.style.opacity = '0';
            img_2.style.opacity = '1';
        }
    });

    
});