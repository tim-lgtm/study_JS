'use strict';
// добавить кнопку 
// лобавляем элементы с помощью DOM 
let start = document.querySelector('#start');
let cancel = document.querySelector('#cancel');
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
let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let expensesAmount = document.querySelector('.expenses-amount');
let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositCheck = document.querySelector('#deposit-check');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let items = document.querySelectorAll('input[type="text"]');
let periodAmount = document.querySelector('.period-amount');




// функциия проверки на число
let isNumber = function (n) {
    // вернуть не чиссло и не бесконечность 
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// функция проверяет на текст
let isText = (str) =>{
    // создана переменная в которой регулярное выражение буквы от а-яё, глобально и игнорирует регистр 
    let pattern = new RegExp ('[^а-яё\S]', 'gi');
    // как понял match нужен чтобы проверить на регулярку ? правильно или нет 
    return str.match(pattern);
};



// создаём объект с его ключами, по умолчанию ставим значение ключей : 0 , пустой массив , пустой объект

let appData = {
    // бюджет
    budget: 0,
    // доход (основной)
    income: {},
    // доход в месяц
    incomeMonth: 0,
    // дополнительный доход 
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
    //   debugger;
    
      appData.budget = +salaryAmount.value;
      

 
      
      
      
      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getIncome();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.range();
      appData.getBudget();
      appData.showResult();



      
    
    start.style.display =  'none';
    
    
    cancel.style.display = 'block';
    
    items.forEach(function(item){
        item.disabled = true;
    });
    },
    reset: function() {
        cancel.style.display =  'none';
        start.style.display = 'block';
        this.budget = 0,
        this.income = {},
        this.incomeMonth = 0,
        this.addIncome = [],
        this.expenses = {},
        this.addExpenses = [],
        this.deposit = false,
        this.parcenetDeposit = 0,
        this.moneyDeposit = 0,
        this.budgetDay = 0,
        this.budgetMonth = 0,
        this.expensesMonth = 0,
        
        items.forEach(function(item){
            item.disabled = false;
        });
        
        items.forEach(function(item){
            item.value = '';
        });

        periodSelect.value = 1;

        periodAmount.innerHTML = periodSelect.value;
        
        incomeItems.forEach((item, i) =>{
            if( i !== 0){
                item.remove();
                btnPlusIncomeAdd.style.display = 'block';
            }
        });

        expensesItems.forEach((item, i) =>{
            if( i !== 0){
                item.remove();
                btnPlusExpensesAdd.style.display = 'block';
            }
        });

        
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
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value =  this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(',');
        resultTargetMonth.value = Math.ceil(this.getTargetMonth());
        periodSelect.addEventListener('input', function(){
            resultIncomePeriod.value = appData.calcPeriod();
        });
        resultIncomePeriod.value = this.calcPeriod();
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
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
    
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function (){
       for(let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
        }  

    },
    range: function(){
        periodAmount.innerHTML = periodSelect.value;
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - +this.expensesMonth;

        this.budgetDay = Math.ceil(this.budgetMonth / 30) ;
    },
    getTargetMonth: function (){
        return targetAmount.value / this.budgetMonth;
       
    },
    getStatusIncome: function(){
        if(this.budgetDay >= 1200 ){
            return( 'У вас высокий уровень дохода' );
        } else if( 1200 > this.budgetDay && this.budgetDay >= 600 ){
            return( 'У вас средний уровень дохода ' );
        } else if( this.budgetDay < 600 && this.budgetDay > 0) {
            return( 'К сожалению у вас уровень дохода ниже среднего');
        }else if( this.budgetDay <= 0 ) {
            return( 'Что то пошло не так' );
        }
    }, 
    getInfoDeposit: function(){
        do{
            this.parcenetDeposit = prompt('Какая у Вас процентная ставка?' , '10');
        }while(!isNumber(this.parcenetDeposit));
        do{
            this.moneyDeposit = prompt('Какая сумма у Вас на депозите?' , 30000);
        }while(!isNumber(this.moneyDeposit));
    },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    },
    getDataFromArray: function()   {
    let arr = [];
      for(let i = 0 ; i < this.addExpenses.length ; i++){
        arr.push(this.addExpenses[i].trim()[0].toUpperCase() + this.addExpenses[i].trim().slice(1).toLowerCase());
      }
    }
};

start.disabled = true;
salaryAmount.addEventListener('input', () => {
    start.disabled = salaryAmount.value === '';
});
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

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