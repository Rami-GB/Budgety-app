
//BUDGET LOGIC
var budgetController = (function () {
    //code

    return {

    }
})();


//UI LOGIC
var UIController = (function () {
    //code

    return {

    }
})();


//GLOBAL CONTRLLER
var controller = (function (budgetCtrl, UICtrl) {
    //code
    var ctrlAddItem = function () {
        //1. get input data

        //2. add to budget ctrl

        //3. add to UI

        //4. calculate budget

        //5. display budget on UI
        console.log('hello world!');
    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (e) {
        if(e.which === 13  ||  e.keyCode === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);