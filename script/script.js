const start = document.querySelector('#start');
const cancel = document.querySelector('#cancel');
// const checkbox = document.querySelector('#deposit-check');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
const resultTargetMonth = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
// const incomeTitle = document.getElementsByClassName('income-title')[1];
let expensesItems = document.querySelectorAll('.expenses-items');
const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
// const expensesAmount = document.querySelector('.expenses-amount');
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
// const depositCheck = document.querySelector('#deposit-check');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
const items = document.querySelectorAll('input[type="text"]');
const periodAmount = document.querySelector('.period-amount');





// let isNumber = function (n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };
// let isText = (str) =>{
//     let pattern = new RegExp ('[^а-яё\S]', 'gi');
//     return str.match(pattern);
// };
class AppData {
    constructor() {
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.parcenetDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

    }
    start() {

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getExpensesMonth();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.range();
        this.getBudget();
        this.showResult();

        start.style.display = 'none';


        cancel.style.display = 'block';

        items.forEach(item => {
            item.disabled = true;
        });

    }
    reset() {
        cancel.style.display = 'none';
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

        document.querySelectorAll('.data input[type="text"]').forEach(input => {
            input.disabled = false;
        });

        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.value = '';
        });

        periodSelect.value = 1;

        periodAmount.innerHTML = periodSelect.value;

        incomeItems.forEach((item, i) => {
            if (i !== 0) {
                item.remove();
                btnPlusIncomeAdd.style.display = 'block';
            }
        });

        expensesItems.forEach((item, i) => {
            if (i !== 0) {
                item.remove();
                btnPlusExpensesAdd.style.display = 'block';
            }
        });
    }
    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnPlusExpensesAdd.style.display = 'none';
        }
    }
    getExpenses() {
        const _this = this;
        expensesItems.forEach(item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(',');
        resultTargetMonth.value = Math.ceil(this.getTargetMonth());
        periodSelect.addEventListener('input', () => {
            resultIncomePeriod.value = _this.calcPeriod();
        });
        resultIncomePeriod.value = this.calcPeriod();
    }
    getAddExpenses() {
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }
    addIncomeBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnPlusIncomeAdd.style.display = 'none';
        }
    }
    getIncome() {
        const _this = this;
        incomeItems.forEach(item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        });

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    range() {
        periodAmount.innerHTML = periodSelect.value;
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - +this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
            return ('У вас средний уровень дохода ');
        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay <= 0) {
            return ('Что то пошло не так');
        }
    }
    getInfoDeposit() {
        // do {
        //     this.parcenetDeposit = prompt('Какая у Вас процентная ставка?', '10');
        // } while (!isNumber(this.parcenetDeposit));
        // do {
        //     this.moneyDeposit = prompt('Какая сумма у Вас на депозите?', 30000);
        // } while (!isNumber(this.moneyDeposit));
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    getDataFromArray() {
        const arr = [];
        for (let i = 0; i < this.addExpenses.length; i++) {
            arr.push(this.addExpenses[i].trim()[0].toUpperCase() + this.addExpenses[i].trim().slice(1).toLowerCase());
        }
    }
    eventListeners() {
        const _this = this;
        start.disabled = true;
        salaryAmount.addEventListener('input', () => {
            start.disabled = salaryAmount.value === '';
        });
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));

        btnPlusExpensesAdd.addEventListener('click', _this.addExpensesBlock);
        btnPlusIncomeAdd.addEventListener('click', _this.addIncomeBlock);
        periodSelect.addEventListener('input', _this.range);

    }
}

const appData = new AppData();
appData.eventListeners();
// const appData = new AppData();
console.log('appData: ', appData);

// start.disabled = true;
// salaryAmount.addEventListener('input', () => {
//     start.disabled = salaryAmount.value === '';
// });
// start.addEventListener('click', appData.start.bind(appData));
// cancel.addEventListener('click', appData.reset.bind(appData));

// btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
// btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
// periodSelect.addEventListener('input', appData.range );
