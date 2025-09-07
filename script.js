function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return b === 0 ? "ERROR" : a / b;
}
// console.log(divide(8, 4))

function operate(operand1, operator, operand2){
    let num1 = Number(operand1);
    let num2 = Number(operand2);
    if(operator === '+'){
      let result = add(num1, num2);
      if(!Number.isInteger(result)){ /*check if the result is an integer or a float*/
        return result.toFixed(3);
      }
      else{
        return result;
      }
    }
    else if(operator === '-'){
      let result = subtract(num1, num2);
      if(!Number.isInteger(result)){ /*check if the result is an integer or a float*/
        return result.toFixed(3);
      }
      else{
        return result;
      }
    }
     else if(operator === '/'){
        if (num2 === 0){ 
            return "Nice try Einstein. Can't divide by zero!";
        }
     let result = divide(num1, num2);
     if(!Number.isInteger(result)){ /*check if the result is an integer or a float*/
        return result.toFixed(3);
      }
      else{
        return result;
      }
    }
     else if(operator === 'x'){
     let result = multiply(num1, num2);
     if(!Number.isInteger(result)){ /*check if the result is an integer or a float*/
        return result.toFixed(3);
      }
      else{
        return result;
      }
    }
}

const calcContent = document.querySelector('.calcContent')
const equalTo = document.querySelector('.equal');
const eraser = document.querySelector('.delete');
const clear = document.querySelector('.clear');
const division = document.querySelector('.divide');
const multiplication = document.querySelector('.multiply');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const decimal = document.querySelector('.decimal');
const numButtons = document.querySelectorAll('.button');


function evaluateExp(exp){
    exp = exp.replace(/([+\-x/])$/, ''); /* replace the last operator with empty space */

    let parts = exp.split(/([+\-x/])/);
    if(parts.length !== 3) return null;

    let num1 = parseFloat(parts[0]);
    let op = parts[1];
    let num2 = parseFloat(parts[2]);

    if(isNaN(num1) || isNaN(num2)) return null;

    switch(op){
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case 'x': return num1 * num2;
        case '/': return num2 === 0 ? "Nice try Einstein. Can't divide by zero!" : num1 / num2;
    }
}
let currentExp;
let justEvaluated = false;
let clickCount = 0;
function addOperator(op){
  justEvaluated = false;
  clickCount = 0;
    if (currentExp === '' || currentExp === '0') return;

    const lastChar = calcContent.innerText.slice(-1);
    const operators = [ '+', '-', 'x', '/'];

    if(operators.includes(lastChar)){
      currentExp = calcContent.innerText.slice(0,-1) + op;
      calcContent.innerText = currentExp;
      return;
    } else{
    currentExp = calcContent.innerText + op;
     calcContent.innerText = currentExp; 
  }
   
    
    let parts = currentExp.split(/([+\-x/])/);
    parts = parts.filter(part => part.trim() !== '');
    if (parts.length >= 3){
        let result = evaluateExp(currentExp);
        if(result !== null){
          
            calcContent.innerText = result + op;
            
            currentExp = result + op;
        }
        else {
            calcContent.innerText = 'invalid';
            // currentExp = ''
        }
    }
    
}
plus.addEventListener('click', () => {
    addOperator('+');
});
minus.addEventListener('click', () => {
    addOperator('-');
});
multiplication.addEventListener('click', () => {
    addOperator('x');
});
division.addEventListener('click', () => {
    addOperator('/');
});


decimal.addEventListener('click', (e) => {
  if(clickCount < 1){
    clickCount++;
  const value = e.target.innerText; 
  calcContent.innerText += value;
  }
})


numButtons.forEach(button => 
    button.addEventListener('click', (e) => {
      
        const value = e.target.innerText; /*this gets the textcontent of each button */
        
        if(justEvaluated === true){
          
        calcContent.innerText = '';
        justEvaluated = false;
        }

        calcContent.innerText += value;
        
    } )
)


    clear.addEventListener('click', () => {
         calcContent.innerText = "";
    })
    
    equalTo.addEventListener('click', () => {  
         if(calcContent.innerText.includes('/')){
                const splitInput = calcContent.innerText.split('/');
              calcContent.innerText =  operate(splitInput[0], '/', splitInput[1])
            }
            if(calcContent.innerText.includes('x')){
                 const splitInput = calcContent.innerText.split('x');
                calcContent.innerText = operate(splitInput[0], 'x', splitInput[1])
            }
            if(calcContent.innerText.includes('+')){
                 const splitInput = calcContent.innerText.split('+');
                calcContent.innerText = operate(splitInput[0], '+', splitInput[1]);
            }
            if(calcContent.innerText.includes('-')){
                 const splitInput = calcContent.innerText.split('-');
                calcContent.innerText = operate(splitInput[0], '-', splitInput[1])
            }

            justEvaluated = true;
    })
    eraser.addEventListener('click', () => {
          let textArray = calcContent.innerText.split('');
          let newDisplay = textArray.splice(-1, 1);
            calcContent.innerText = textArray.join(''); 
    })



