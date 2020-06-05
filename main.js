let money = 10000;
let income = 5000;
let addExpenses = 'Проезд, кино, кафе ';
let deposit = true;
let mession = 1000000;
let period = 12;

console.log( typeof (money) );
console.log( typeof (income) );
console.log( typeof (deposit) );
console.log( addExpenses.length );
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mession + ' рублей' );
console.log( addExpenses.toLocaleLowerCase() );
console.log( addExpenses.split(', ' ) );
let budgetDay = Math.round(money / 30); // не много отсебятины , так число получается не красивое 
console.log('budgetDay: ', budgetDay);
