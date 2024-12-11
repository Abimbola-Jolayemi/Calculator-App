let isOn = false;
const userInput = document.querySelector('.input');


function toggle() {
    isOn = !isOn;
    userInput.value = isOn ? '0' : '';
}


function clearScreen() {
    if (isOn) {
        userInput.value = userInput.value.slice(0, -1);
    }
}


function addNumber(number) {
    const display = userInput;
    if (isOn) {
        if (!isNaN(number)) {
            if (display.value === '0' || display.value === 'Error') {
                display.value = number;
            } else {
                display.value += number;
            }
        }
    }
}


function addOperator(operator) {
    const display = userInput;
    const lastChar = display.value.slice(-1);
    const validOperators = ['+', '-', '*', '/'];

    if (isOn && validOperators.includes(operator) && !isNaN(lastChar) && display.value !== '') {
        display.value += operator;
    }
}


function addDecimalPoint() {
    const display = userInput;
    const lastChar = display.value.slice(-1);
    if (isOn && lastChar !== "." && !isNaN(lastChar)) {
        display.value += ".";
    }
}


function calculateResult() {
    const display = userInput;
    if (isOn) {
        try {
            const input = display.value.replace(/x/g, '*');
            const result = computeExpression(input);
            if (result !== undefined) {
                display.value = result;
            } else {
                display.value = 'Error';
            }
        } catch {
            display.value = 'Error';
        }
    }
}


function computeExpression(expression) {
    const element = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    
    if (!element) return undefined;

    let result = parseFloat(element[0]);
    
    for (let index = 1; index < element.length; index += 2) {
        const operator = element[index];
        const nextNumber = parseFloat(element[index + 1]);

        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                if (nextNumber === 0) {
                    return undefined;
                }
                result /= nextNumber;
                break;
            default:
                return undefined;
        }
    }
    return result;
}

document.addEventListener('keydown', (event) => {
    if (isOn) {
        if (event.key === 'Enter') {
            calculateResult();
            event.preventDefault();
        }
    }
});
