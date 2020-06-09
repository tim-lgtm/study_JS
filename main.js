'use strict';

let money = +prompt('Ваш месячный доход?', '50000');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке ?');

let showTypeOF = function(data){
    console.log(data, typeof(data));
}

showTypeOF(money);
showTypeOF(income);
showTypeOF(deposit);


console.log( addExpenses.split(', ' ) );
console.log( addExpenses.toLocaleLowerCase() );
console.log( addExpenses.length );



let expenses1 = prompt('Введите обязательную статью расходов', 'Курсы ');
let amounth1 = +prompt('Во сколько это обойдётся?', '5000')
let expenses2 = prompt('Введите ещё одну обязательную статью расходов', 'Книги');
let amounth2 = +prompt('Во сколько это обойдётся?', '2000')
function getExpensesMonth(amounth1, amounth2){
    return amounth1 + amounth2;
}
console.log( 'Обязательные расходы на месяц составят ' + getExpensesMonth(amounth1, amounth2));

let mession = 100000;
console.log( 'Цель заработать ' + mession + ' рублей' );

//вот тут сразу вопрос, можно-ли сделать это через callback функицию? 
function getAccumulatedMonth(money, amounth1, amounth2  ){
    return money - amounth1 - amounth2;
}
let accumulatedMonth = getAccumulatedMonth(money, amounth1, amounth2)
console.log('Накопления за месяц ' + accumulatedMonth);

let period = 12;
console.log( 'Период равен ' + period + ' месяцев' );

function getTargetMonth(mession, accumulatedMonth){
    return Math.ceil(mession / accumulatedMonth); 
}
console.log( 'Чтобы накопить,  вам потребуется: ' + getTargetMonth(mession, accumulatedMonth ) + ' месяцев');

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




