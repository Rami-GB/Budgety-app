
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
        inputBtn: '.add__btn'
    }



    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
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