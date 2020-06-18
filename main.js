'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = (str) =>{
    let pattern = new RegExp ('[^а-яё\S]', 'gi');
    return str.match(pattern);
}


let money;

function start(){
    do{
        money = +prompt('Ваш месячный доход?', '50000');
    } while(isNaN(parseFloat(money))){

        return money; 
    }
}

start();
// debugger
let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    parcenetDeposit: 0,
    moneyDeposit: 0,
    mession: 50000,
    period: 12,
    asking: function(){

        if(confirm('Есть ли у Вас дополнительный источник дохода?')){
            let itemIncome;
            do{
                itemIncome = prompt('Какой у вас дополнительный зарабаток?', 'фриланс');
            }while(isText(itemIncome));


            let cashIncome;
            do{
                cashIncome =   prompt('Сколько Вы на этом зарабатываете?', 10000);
            }while(!isNumber(cashIncome))

            appData.income[itemIncome] = cashIncome;
        }
        

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'машина,  квартира');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке ?');
            let key = [];
            for (let i = 0; i < 2; i++) {
                let sum = 0; 
                do{
                    key[i] = prompt('Введите обязательную статью расходов?');
                }while(isText(key[i]));
                do{
                    sum = prompt('Во сколько это обайдётся ? ');
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
        appData.budgetDay = appData.budgetMonth / 30 ;
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
    }, 
    getInfoDeposit: () =>{
        do{
            appData.parcenetDeposit = prompt('Какая у Вас процентная ставка?' , '10');
        }while(!isNumber(appData.parcenetDeposit))
        do{
            appData.moneyDeposit = prompt('Какая сумма у Вас на депозите?' , 30000);
        }while(!isNumber(appData.moneyDeposit));
    },
    calcSavedMoney: () =>{
        return appData.parcenetDeposit * appData.moneyDeposit;
    },
    getDataFromArray: () =>{
    let arr = [];
      for(let i = 0 ; i < appData.addExpenses.length ; i++){
        arr.push(appData.addExpenses[i].trim()[0].toUpperCase() + appData.addExpenses[i].trim().slice(1).toLowerCase());

      }
        console.log(arr.join(', '));
    }
};



// вызов фунций 
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();
appData.getDataFromArray();


// вывод в консоль 
console.log(`Расходы за месяц составляют: ${appData.expensesMonth}`);
console.log('Период равен ' + appData.period + ' месяцев' );
console.log(appData.getStatusIncome());
console.log(appData.addExpenses);
// appData.getDataFromArray(appData.addExpenses);






















