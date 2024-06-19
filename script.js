
let display = document.querySelector('[name="display"]');
let previousOperator = null;
let previousOperand = null;

function appendNumber(num) {
    display.value += num;
}

function appendOperator(operator) {
    if (previousOperator) {
        calculateResult();
    }
    previousOperator = operator;
    previousOperand = parseFloat(display.value);
    display.value += operator;
}

function appendFunction(func) {
    display.value += func;
}

function appendPi() {
    display.value += Math.PI.toFixed(6); 
}

function clearDisplay() {
    display.value = '';
    previousOperator = null;
    previousOperand = null;
}

function calculateResult() {
    let currentOperand = parseFloat(display.value.substring(display.value.lastIndexOf(previousOperator) + 1));
    let result = 0;

    switch (previousOperator) {
        case '+':
            result = previousOperand + currentOperand;
            break;
        case '-':
            result = previousOperand - currentOperand;
            break;
        case '*':
            result = previousOperand * currentOperand;
            break;
        case '/':
            if (currentOperand === 0) {
                display.value = "Error: Division by zero";
                return;
            }
            result = previousOperand / currentOperand;
            break;
        case ',': 
            result = Math.pow(previousOperand, currentOperand);
            break;
      
        default:
           
            try {
                result = eval(display.value);
            } catch (error) {
                result = 'Error';
            }
            break;
    }

    display.value = result;
    previousOperator = null;
    previousOperand = result;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } 
    
   
});
