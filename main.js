'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке ?');

let showTypeOF = function(data){
    console.log(data, typeof(data));
}

function start(){
    do{
        money = +prompt('Ваш месячный доход?', '50000');
    } while(!isNumber(money));
};
start();

showTypeOF(money);
showTypeOF(income);
showTypeOF(deposit);


console.log( addExpenses.split(', ' ) );
console.log( addExpenses.toLocaleLowerCase() );
console.log( addExpenses.length );



let expenses1 = prompt('Введите обязательную статью расходов', 'Курсы ');
let amounth1; 
let expenses2 = prompt('Введите ещё одну обязательную статью расходов', 'Книги');
let amounth2;


function getExpensesMonth(amounth1, amounth2){
    do{
        amounth1 = +prompt('Во сколько обойдётся?', '5000');
        amounth2 = +prompt('Во сколько это обойдётся?', '2000');
    }while(isNaN(parseFloat(amounth1, amounth2)));
        console.log(amounth1);
        return amounth1 + amounth2;
}
let expensesAmount = getExpensesMonth()
console.log( 'Обязательные расходы на месяц составят ' + expensesAmount);

let mession = -100000;
console.log( 'Цель заработать ' + mession + ' рублей' );

//вот тут сразу вопрос, можно-ли сделать это через callback функицию? 
function getAccumulatedMonth(money, expensesAmount){
    return money - expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth(start(), expensesAmount );
console.log('Накопления за месяц ' + accumulatedMonth);

let period = 12;
console.log( 'Период равен ' + period + ' месяцев' );

function getTargetMonth(mession, accumulatedMonth){
    let result = Math.ceil(mession / accumulatedMonth);
    if(result > 0){
        console.log('Цель будет достигнута за: ' + result + ' месяцев');
    } else{
        console.log('Произошла ошибка');
    } 
};
getTargetMonth(mession, accumulatedMonth);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + budgetDay );


let getStatusIncome = function(){
    if(budgetDay >= 1200 ){
        return( 'У вас высокий уровень дохода' );
    } else if( 1200 > budgetDay && budgetDay >= 600 ){
        return( 'У вас средний уровень дохода ' );
    } else if( budgetDay < 600 && budgetDay > 0) {
        return( 'К сожалению у вас уровень дохода ниже среднего');
    }else if( budgetDay <= 0 ) {
        return( 'Что то пошло не так' );
    }
};
console.log(getStatusIncome());




