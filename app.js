
//BUDGET LOGIC
var budgetController = (function () {
    //code

    return {

    }
})();


//UI LOGIC
var UIController = (function () {
    //code
    var  DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }



    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();


//GLOBAL CONTRLLER
var controller = (function (budgetCtrl, UICtrl) {
    //code
    var DOMs = UICtrl.getDOMstrings();


    var ctrlAddItem = function () {
        //1. get input data
        var input = UICtrl.getInput();
        console.log(input);
        //2. add to budget ctrl

        //3. add to UI

        //4. calculate budget

        //5. display budget on UI
        console.log('hello world!');
    };

    document.querySelector(DOMs.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (e) {
        if (e.which === 13 || e.keyCode === 13) { ctrlAddItem(); }
    });

})(budgetController, UIController);