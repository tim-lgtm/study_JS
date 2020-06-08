'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 5000;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке ?');
let expenses1 = prompt('Введите обязательную статью расходов');
let expenses2 = prompt('Введите ещё одну обязательную статью расходов');
let amounth1 = +prompt('Во сколько это обойдётся?')
let amounth2 = +prompt('Во сколько это обойдётся?')
let budgetMonth = money - amounth1 - amounth2;
let mession = 100000;
let period = 12;
let budgetDay = Math.floor(budgetMonth / 30);

console.log( typeof (money) );
console.log( typeof (income) );
console.log( typeof (deposit) );
console.log( addExpenses.length );
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mession + ' рублей' );
console.log( addExpenses.split(', ' ) );
console.log( addExpenses.toLocaleLowerCase() );
console.log( 'Бюджет на месяц: ' + budgetMonth );
console.log( 'Цель будет достигнута за - ' + Math.ceil(mession / budgetMonth) );
console.log('Бюджет на день: ' + budgetDay );

if(budgetDay >= 1200 ){
    console.log( 'У вас высокий уровень дохода' );
} else if( 1200 > budgetDay >= 600 ){
    console.log( 'У вас средний уровень дохода ' );
} else if( budgetDay < 600 ) {
    console.log( 'К сожалению у вас уровень дохода ниже среднего');
}else if( budgetDay <= 0 ) {
    console.log( 'Что то пошло не так' );
}
