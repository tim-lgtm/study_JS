//удалил рекламу сразу чтобы не мешала
const adv = document.querySelector('.adv');
adv.remove();

const book = document.querySelectorAll('.book');


// изменил порядок книг 
book[1].after(book[0]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

document.body.style.backgroundImage = 'none';
document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

// изменили заголовок
const bookFour = book[4].querySelector('a');
bookFour.textContent = 'Книга 3. this и Прототипы Объектов';

// изменили порядок глав во второй книге
const bookTwo = book[0].querySelectorAll('li');
bookTwo[3].after(bookTwo[6]);
bookTwo[6].after(bookTwo[8]);

// изменили порядок глав в пятой книге 
const bookFive = book[5].querySelectorAll('li')
bookFive[1].after(bookFive[9]);
bookFive[9].after(bookFive[3]);
bookFive[3].after(bookFive[4]);



const bookEght = document.querySelectorAll('.book')[5];
const ul = bookEght.querySelector('ul');
const newLi = document.createElement('li');
newLi.textContent = 'Глава 8: За пределами ES6';
ul.append(newLi);

const book8 = book[2].querySelectorAll('li');
book8[9].before(book8[10]);

