let start = document.getElementById('start');
let checkbox = document.querySelector('#deposit-check');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];

// вывод с парвой сторон инпутов 
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

 

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
let resultTargetMonth = document.querySelector('.target_month-value');

//левая сторона 

// месячный доход
let salaryAmount = document.querySelector('.salary-amount');
// дполнителный доход
let incomeTitle = document.getElementsByClassName('income-title')[1];
let expensesItems = document.querySelectorAll('.expenses-items');
let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];


// возможный доход
let additionalIncomeItem = document.getElementsByClassName('additional_income-item')[0];
let additionalIncomeItemTwo = document.querySelector('.additional_income-item')[1];
// обязателные расходы 
let expensesAmount = document.querySelector('.expenses-amount');
let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
// возможные расходы
let tadditionalExpensesItem = document.querySelector('.additional_expenses-item');
// депозит
let depositCheck = document.querySelector('#deposit-check');
let targetAmount = document.querySelector('.target-amount')
let periodSelect = document.querySelector('.period-select')



'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = (str) =>{
    let pattern = new RegExp ('[^а-яё\S]', 'gi');
    return str.match(pattern);
}





let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    parcenetDeposit: 0,
    moneyDeposit: 0,
    mession: 50000,
    period: 12,
    start: function() {
      
      if(salaryAmount.value === ''){
        alert('Поле "Месячный доход" должно быть заполненно');
        return;
      }
      appData.budget = salaryAmount.value;
 
      


        
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getExpenses();
        appData.showResult();
  },
    addExpensesBlock: function(){

      let cloneExpensesItems = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnPlusExpensesAdd);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3){
        btnPlusExpensesAdd.style.display = 'none';
      }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if( itemExpenses !== '' && cashExpenses !== '' ){
                appData.expenses[itemExpenses] = cashExpenses;
            }

        });
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value =  appData.expensesMonth;

    },
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
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function (){
       for(let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
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

start.addEventListener('click', appData.start);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);


// вызов фунций 
// appData.getTargetMonth();
// appData.getInfoDeposit();
// appData.getDataFromArray();


// вывод в консоль 
// console.log(`Расходы за месяц составляют: ${appData.expensesMonth}`);
// console.log('Период равен ' + appData.period + ' месяцев' );
// console.log(appData.getStatusIncome());
// console.log(appData.addExpenses);