
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
        }
    }


    return {
        addItem: function (type, des, val) {
            var newItem, id;

            console.log(type);
            //creat ID
            id = 0;
            //if (data.allItems[type].length > 0) id = data.allItems[type][data.allItems[type].length - 1].id;

            //creat element based on type
            newItem = (type === 'exp') ? new Expense(id, des, val) : new Income(id, des, val);

            //push to data Structure
            data.allItems[type].push(newItem);

            return newItem;
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
        ExpenseContainer: '.expenses__list'
    }



    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        addListItem: function (obj, type) {
            var html, element;


            //BUILD THE MARKUP
            if (type === 'exp') {
                element = DOMstrings.ExpenseContainer;

                html = `<div class="item clearfix" id="expense-${obj.id}">
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

                html = `<div class="item clearfix" id="income-${obj.id}">
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

        clearFields: function () {
            var nodeList, list;

            nodeList = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);
            list = Array.from(nodeList);

            list.forEach(e => { e.value = '' });

            list[0].focus();
        },

        getDOMstrings: function () {
            return DOMstrings;
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
    };

    var ctrlAddItem = function () {
        //1. get input data
        var input = UICtrl.getInput();

        //2. add to budget ctrl
        var newItem = budgetController.addItem(input.type, input.description, input.value);

        //3. add to UI
        UICtrl.addListItem(newItem, input.type);

        //4.clear fields
        UICtrl.clearFields();

        //4. calculate budget

        //5. display budget on UI
    };


    return {
        init: function () {
            console.log('app has started.');
            setupEventListners();
        }
    }

})(budgetController, UIController);

controller.init();