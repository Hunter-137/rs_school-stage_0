// console.log('Вёрстка валидная: +10\n`header`, `main`, `footer` +2\nШесть элементов `section` (по количеству секций) +2\nТолько один заголовок `h1` +2\nПять заголовков `h2` +2\nОдин элемент `nav` (панель навигации в хедере) +2\nДва списка ul > li > a (панель навигации, ссылки на соцсети в футере) +2\nСемь кнопок `button` +2\nДва инпута `input` +2\nБлок `header` +4 (по-моему у меня пиксели не сходятся, у меня монитор просто квадратный :D не умещаюсь в 1440px\nСекция `Welcome` +4\nСекция `About` +6 (вроде всё чётко, просмотрите в pixel perfect)\nСекция `Favorites` +4\nСекция `CoffeShop` +6\nСекция `Contacts` +6\nСекция `LibraryCard` +8\nБлок `footer` +8\nОбщие требования к верстке +20\n\nОбязательно просмотрите мой код и дайте свою оценку, буду благодарен :)\nИтог: 92/100');

$(document).ready(function() {
    $('.header-burger_menu-button').click(function(event) {
        $('.header-burger_menu-button').toggleClass('active');
        $('.header-nav').toggleClass('active');
    });
});

