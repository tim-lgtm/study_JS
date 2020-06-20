let start = document.getElementById('start');
console.log('start: ', start);

let checkbox = document.querySelector('#deposit-check');
console.log('checkbox: ', checkbox);

let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
console.log('budgetDayValue: ', budgetDayValue);


// вывод с парвой сторон инпутов 
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
console.log('expensesMonthValue: ', expensesMonthValue);

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
console.log('additionalIncomeValue: ', additionalIncomeValue);

let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
console.log('additionalExpensesValue: ', additionalExpensesValue);

let resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
console.log('resultIncomePeriod: ', resultIncomePeriod);

let resultTargetMonth = document.querySelector('.target_month-value');
console.log('resultTargetMonth: ', resultTargetMonth);

//левая сторона 

// месячный доход
let salaryAmount = document.querySelector('.salary-amount');
console.log('salaryAmount: ', salaryAmount);

// дполнителный доход
let incomeTitle = document.getElementsByClassName('income-title')[1];
console.log('incomeTitle: ', incomeTitle);

let incomeAmount = document.querySelector('.income-amount')
console.log(' incomeAmount: ', incomeAmount);

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
console.log('btnPlusIncomeAdd: ', btnPlusIncomeAdd);


// возможный доход
let additionalIncomeItem = document.getElementsByClassName('additional_income-item')[0];
console.log('additionalIncomeItem: ', additionalIncomeItem);

let additionalIncomeItemTwo = document.querySelector('.additional_income-item')[1];
console.log('additionalIncomeItemTwo: ', additionalIncomeItemTwo);

// обязателные расходы 

let expensesAmount = document.querySelector('.expenses-amount');
console.log('expensesAmount: ', expensesAmount);

let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
console.log('btnPlusExpensesAddd: ', btnPlusExpensesAdd);

// возможные расходы
let tadditionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('tadditionalExpensesItem: ', tadditionalExpensesItem);

// депозит
let depositCheck = document.querySelector('#deposit-check');
console.log('depositCheck: ', depositCheck);

let targetAmount = document.querySelector('.target-amount')
console.log('targetAmount: ', targetAmount);

let periodSelect = document.querySelector('.period-select')
console.log('periodSelect: ', periodSelect);