let start = document.getElementById('start');
let checkbox = document.querySelector('#deposit-check');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
let resultTargetMonth = document.querySelector('.target_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.getElementsByClassName('income-title')[1];
let expensesItems = document.querySelectorAll('.expenses-items');
console.log('expensesItems: ', expensesItems);
let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let expensesAmount = document.querySelector('.expenses-amount');
let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositCheck = document.querySelector('#deposit-check');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
console.log('periodSelect: ', periodSelect);
let incomeItems = document.querySelectorAll('.income-items');
console.log('incomeItems: ', incomeItems);




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
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    parcenetDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
      
        if(salaryAmount.value === ''){
        alert('Поле "Месячный доход" должно быть заполненно');
        return;
    }
      appData.budget = +salaryAmount.value;
 
      


        
      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getIncome();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.range();
      appData.getBudget();
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
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(',');
        resultTargetMonth.value = Math.ceil(appData.getTargetMonth());
        periodSelect.addEventListener('input', function(){
            resultIncomePeriod.value = appData.calcPeriod();
        });
        resultIncomePeriod.value = appData.calcPeriod();
        console.log('periodSelect: ', periodSelect);
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    addIncomeBlock: function(){
        let cloneIncomeItems= incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3){
        btnPlusIncomeAdd.style.display = 'none';
      }
    },
    getIncome: function (){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });
    
        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key]
        }
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue)
            }
        });
    },
    getExpensesMonth: function (){
       for(let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
        }  

    },
    range: function(){
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.innerHTML = periodSelect.value;
        console.log('periodAmount: ', periodAmount);
        console.log('periodSelect.value: ', periodSelect.value);
        // resultIncomePeriod.innerHTML  = periodAmount.value;
    },
    getBudget: function (){
        appData.budgetMonth = appData.budget + appData.incomeMonth - +appData.expensesMonth;

        appData.budgetDay = Math.ceil(appData.budgetMonth / 30) ;
    },
    getTargetMonth: function (){
        return targetAmount.value / appData.budgetMonth;
       
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
    calcPeriod: () => {
        return appData.budgetMonth * periodSelect.value;
        
    },
    getDataFromArray: () => {
    let arr = [];
      for(let i = 0 ; i < appData.addExpenses.length ; i++){
        arr.push(appData.addExpenses[i].trim()[0].toUpperCase() + appData.addExpenses[i].trim().slice(1).toLowerCase());

      }
        console.log(arr.join(', '));
    }
};

salaryAmount.addEventListener('input', () =>{
    start.disabled = salaryAmount.value === '';
    start.addEventListener('click', appData.start);
})


btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.range );


// вызов фунций 
// appData.getTargetMonth();
// appData.getInfoDeposit();
// appData.getDataFromArray();


// вывод в консоль 
// console.log(`Расходы за месяц составляют: ${appData.expensesMonth}`);
// console.log('Период равен ' + appData.period + ' месяцев' );
// console.log(appData.getStatusIncome());
// console.log(appData.addExpenses);