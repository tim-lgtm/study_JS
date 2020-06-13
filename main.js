'use strict';

let money;

function start(){
    do{
        money = +prompt('Ваш месячный доход?', '50000');
    } while(isNaN(parseFloat(money))){

        return money; 
    }
}

start();

let appDate = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mession: 50000,
    period: 12,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appDate.addExpenses = addExpenses.toLowerCase().split(',');
            appDate.deposit = confirm('Есть ли у вас депозит в банке ?');
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function (){
        let sum = 0;
        let quest;
        for (let i = 0; i < 2; i++) {
          expenses[i] = prompt('Введите обязательную статью расходов?', '');
          do {
            quest= prompt('Во сколько это обойдется?', '');
          } while (!isNumber(quest));
          sum += +quest;
        }
        return sum;
      },
    getAccumulatedMonth: function (money, expensesAmount){
        return money - expensesAmount;
    },
    getTargetMonth: function (mession, accumulatedMonth){
        let result = Math.ceil(mession / accumulatedMonth);
        if(result > 0){
            console.log('Цель будет достигнута за: ' + result + ' месяцев');
        } else{
            console.log('Произошла ошибка');
        } 
    },
    getStatusIncome: function(){
        if(budgetDay >= 1200 ){
            return( 'У вас высокий уровень дохода' );
        } else if( 1200 > budgetDay && budgetDay >= 600 ){
            return( 'У вас средний уровень дохода ' );
        } else if( budgetDay < 600 && budgetDay > 0) {
            return( 'К сожалению у вас уровень дохода ниже среднего');
        }else if( budgetDay <= 0 ) {
            return( 'Что то пошло не так' );
        }
    }
}
// console.log(appDate);
appDate.budget = money;

appDate.asking();

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let income = 'фриланс';
// let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// let deposit = confirm('Есть ли у вас депозит в банке ?');

// let showTypeOF = function(data){
//     console.log(data, typeof(data));
// }



// showTypeOF(money);
// showTypeOF(appDate.income);
// showTypeOF(appDate.deposit);



console.log(appDate.addExpenses);



let expenses  = []; // ??????????????





let expensesAmount = appDate.getExpensesMonth()
console.log( 'Обязательные расходы на месяц составят ' + expensesAmount);

let mession = 100000;
console.log( 'Цель заработать ' + mession + ' рублей' );

//вот тут сразу вопрос, можно-ли сделать это через callback функицию? 

let accumulatedMonth = appDate.getAccumulatedMonth(money, expensesAmount );
console.log('Накопления за месяц ' + accumulatedMonth);

let period = 12;
console.log( 'Период равен ' + period + ' месяцев' );


appDate.getTargetMonth(mession, accumulatedMonth);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + budgetDay );



console.log(appDate.getStatusIncome());




