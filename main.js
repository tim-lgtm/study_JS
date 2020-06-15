'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

function start(){
    do{
        money = +prompt('Ваш месячный доход?', '50000');
    } while(isNaN(parseFloat(money))){

        return money; 
    }
}

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mession: 50000,
    period: 12,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке ?');
            let key = [];
            for (let i = 0; i < 2; i++) {
                let sum = 0; 
                key[i] = prompt('Введите обязательную статью расходов?');
                do{
                    sum = prompt('Во сколько это обайдётся ? ')
                }while(!isNumber(sum))
                appData.expenses[key[i]] = +sum;
            }
            
            
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function (){
       for(let key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key];
        }  

      },
      getBudget: function (){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.expensesMonth / 30 ;
    },
    getTargetMonth: function (){
        let result = Math.ceil(appData.mession / appData.budgetMonth);
        if(result > 0){
            console.log('Цель будет достигнута за: ' + result + ' месяцев');
        } else{
            console.log('Произошла ошибка');
        } 
    },
    getStatusIncome: function(){
        if(appData.budgetDay >= 1200 ){
            return( 'У вас высокий уровень дохода' );
        } else if( 1200 > appData.budgetDay && appData.budgetDay >= 600 ){
            return( 'У вас средний уровень дохода ' );
        } else if( appData.budgetDay < 600 && appData.budgetDay > 0) {
            return( 'К сожалению у вас уровень дохода ниже среднего');
        }else if( appData.budgetDay <= 0 ) {
            return( 'Что то пошло не так' );
        }
    }
}




// вызов фунций 
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


// вывод в консоль 
console.log(`Расходы за месяц составляют: ${appData.expensesMonth}`);
console.log('Период равен ' + appData.period + ' месяцев' );
console.log(appData.getStatusIncome());
console.log(appData.addExpenses);






















