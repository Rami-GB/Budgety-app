
//BUDGET LOGIC
var budgetController = (function () {
    //code
    function Expense(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    function Income(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }

    var calcTotal = function (type) {
        var sum = 0;

        data.allItems[type].forEach(e => {
            sum += e.value;
        });

        data.totals[type] = sum;
    }


    return {
        addItem: function (type, des, val) {
            var newItem, id;

            //creat ID
            id = 0;
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            };

            //creat element based on type
            newItem = (type === 'exp') ? new Expense(id, des, val) : new Income(id, des, val);

            //push to data Structure
            data.allItems[type].push(newItem);

            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItems[type].map(e => {
                return e.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) data.allItems[type].splice(index, 1);
        },

        calculateBudget: function () {
            //calculate total inc and total exp
            calcTotal('exp');
            calcTotal('inc');
            //calculate budget
            data.budget = data.totals.inc - data.totals.exp;
            //calculate percentage
            data.percentage = Math.round(((data.totals.exp / data.totals.inc) * 100 || -1), 2);
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () { return data }
    }
})();


//UI LOGIC
var UIController = (function () {
    //code
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        ExpenseContainer: '.expenses__list',
        itemsContainer: '.container'
    }



    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }
        },

        addListItem: function (obj, type) {
            var html, element;


            //BUILD THE MARKUP
            if (type === 'exp') {
                element = DOMstrings.ExpenseContainer;

                html = `<div class="item clearfix" id="exp-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${obj.value}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            } else {
                element = DOMstrings.incomeContainer;

                html = `<div class="item clearfix" id="inc-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${obj.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            }

            //INSERT MARKUP TO THE RIGHT PLACE
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },

        deleteListItem: function(itemID) {
            var el = document.getElementById(itemID);

            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            var nodeList, list;

            nodeList = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);
            list = Array.from(nodeList);

            list.forEach(e => { e.value = '' });

            list[0].focus();
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        displayBudget: function (obj) {
            var html;

            html = `<div class="budget__title">
                 Available Budget in <span class="budget__title--month">%Month%</span>:
                </div>
        
                <div class="budget__value">${obj.budget}</div>
        
                <div class="budget__income clearfix">
                    <div class="budget__income--text">Income</div>
                    <div class="right">
                    <div class="budget__income--value">+ ${obj.totalInc}</div>
                    <div class="budget__income--percentage">&nbsp;</div>
                </div>
             </div>
        
             <div class="budget__expenses clearfix">
                 <div class="budget__expenses--text">Expenses</div>
                 <div class="right clearfix">
                     <div class="budget__expenses--value">- ${obj.totalExp}</div>
                     <div class="budget__expenses--percentage">${obj.percentage}%</div>
                   </div>
             </div>
             </div>`;

            document.querySelector('.budget').innerHTML = html;
        }
    }
})();


//GLOBAL CONTRLLER
var controller = (function (budgetCtrl, UICtrl) {
    //code
    var setupEventListners = function () {
        var DOMs = UICtrl.getDOMstrings();

        document.querySelector(DOMs.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (e) {
            if (e.which === 13 || e.keyCode === 13) { ctrlAddItem(); }
        });

        document.querySelector(DOMs.itemsContainer).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function () {
        var budget;
        //1. calculate budget
        budgetCtrl.calculateBudget();
        //2.return budget
        budget = budgetCtrl.getBudget();
        //3. display budget on UI
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function () {
        //1. get input data
        var input = UICtrl.getInput();

        if (input && input.value && input.value !== 0) {
            //2. add to budget ctrl
            var newItem = budgetController.addItem(input.type, input.description, input.value);

            //3. add to UI
            UICtrl.addListItem(newItem, input.type);

            //4.clear fields
            UICtrl.clearFields();

            //4. calculate budget and update budget
            updateBudget();
        }
    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, id, type;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        console.log(itemID);

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            //1. delete item from data structure
            budgetCtrl.deleteItem(type, id);
            //2. delete item from UI
            UICtrl.deleteListItem(itemID);
            //3. update and display budget
            updateBudget();
        }
    };


    return {
        init: function () {
            console.log('app has started.');
            UICtrl.displayBudget(budgetCtrl.getBudget());
            setupEventListners();
        }
    }

})(budgetController, UIController);

controller.init();