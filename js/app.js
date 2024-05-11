

const splitter = {
    billAmount: 0,
    tipPercentage: 0,
    numberOfPeople:0,
    tipPerPerson:0,
    totalPerPerson:0,

    setTipPerPerson() {
            let temp = Number((this.billAmount * this.tipPercentage) / this.numberOfPeople);
            this.tipPerPerson = +temp.toFixed(2);
    },

    setTotalPerPerson() {
        
            let temp = (this.billAmount / this.numberOfPeople) + this.tipPerPerson;
            this.totalPerPerson = +temp.toFixed(2);
    },

    checkValues() {
        if(this.billAmount && this.tipPercentage && this.numberOfPeople) {
            return true;
        } else {
            return false;
        }
    }
};

const tipPerPersonAmountEl = $('.tip-per-person-amount');
const totalPerPersonAmountEl = $('.total-per-person-amount');

$(document).ready(function () {
    // start the app
    app();
    
    // theme toggler
    toggleTheme();
});

function checkForZeroes (value, target) {
    // make an error message appear and disappear
    // check color of input to invalid
    if(value=== 0) {
        const div = $(target).closest('div');
        $(div).find('.error').removeClass('hide')
        setTimeout(() => {
            $(div).find('.error').addClass('hide');
        }, 1200);
        $(target).val('');
        return true;
    }
};

function getCalculations() {
    // run this when all the values needed are stored
    if(splitter.checkValues()) {
        splitter.setTipPerPerson();
        splitter.setTotalPerPerson();
        tipPerPersonAmountEl.text(`$${splitter.tipPerPerson}`);
        totalPerPersonAmountEl.text(`$${splitter.totalPerPerson}`);
    }
}

function setupValues(id, value,target) {
    if(!checkForZeroes(value, target)) {

        if(id === 'bill-amount') {
            splitter.billAmount = value;
        }
    
        if(id === 'custom-tip-amount') {
            splitter.tipPercentage = value / 100;
        }
    
        if(id === 'number-of-people') {
            splitter.numberOfPeople = value;
        }

    }
};


function resetValues () {
    $(tipPerPersonAmountEl).text('$0.00');
    $(totalPerPersonAmountEl).text('$0.00');
    splitter.billAmount = 0;
    splitter.tipPercentage = 0;
    splitter.numberOfPeople = 0;
    $('input').val('');
}

function toggleTheme() {
    $('.theme-buttons button').on('click', e => {
        let currentTheme = $('body').data('theme');
        let id = $(e.target).closest('button').attr('id')
        if(currentTheme === 'light-theme' && id === 'dark-theme') {
            $('body').attr('data-theme', 'dark-theme') 
        } else {
            $('body').attr('data-theme', 'light-theme') 
        }
    })
}

function app () {
    $('input').on('input', e => {
        const target = $(e.target);
        console.log(target)
        const inputID = $(target).attr('id');
        const inputValue = Number($(target).val()); 
        setupValues(inputID, inputValue, target);

        // run this when all the values needed are stored
        getCalculations();
        
    });

    $('.app-wrapper button').click(function (e) { 
        const buttonClass = $(e.target).attr('class');
        // reset vakues
        if(buttonClass === 'btn-reset'){
            resetValues();
        }

        if(buttonClass === 'btn-tip') {
            // get the value stored in data-tip attribute
            splitter.tipPercentage = Number($(e.target).data('tip') / 100);
            getCalculations();
        }
        
    });
}