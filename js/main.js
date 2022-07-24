const displayBtn = document.querySelectorAll(".displayBtn")
const inputValue = document.querySelector('.container_display_input_value')
const equalBtn = document.querySelector('#btnEqual')
const outputValue = document.querySelector('.container_display_output_value')

let input = []

const htmlEntities = {
    minus: '&#8722',
    multiply: '&#215',
    divide: '&#247',
    decimal: '&#8226'
}

const createEntityArray = () => {
    let txt = document.createElement('textarea')
    for (let entity in htmlEntities) {
        txt.innerHTML = htmlEntities[entity]
        htmlEntities[entity] = txt.value
    }
    console.log(htmlEntities)
}


const getInput = () => {
    displayBtn.forEach(button => {
        button.addEventListener('click', () => {
            if ( input.length === 0 ) inputValue.textContent = ""
            createOperationArray(button.textContent)
            displayInput(button.textContent)
        })
    })
}

const displayInput = (input) => {
    let txt = document.createElement('textarea')
    txt.innerHTML = htmlEntities.decimal
    let currentInput = inputValue.textContent
    let newInput
    input === txt.value ? newInput = "." : newInput = input
    currentInput = currentInput.concat(newInput)
    inputValue.textContent = currentInput
}

const createOperationArray = (value) => {
    let inputValue
    switch (value) {
        case htmlEntities.multiply:
            inputValue = '*'
            break
        case htmlEntities.minus:
            inputValue = '-'
            break
        case htmlEntities.divide:
            inputValue = '/'
            break
        case htmlEntities.decimal:
            inputValue = '.'
            break
        default:
            inputValue = value
    }
    input.push(inputValue)
}

equalBtn.addEventListener('click', ()=> {
    const answer = calculate()
    while (input.length > 0) {
        input.pop()
    }
    console.log(answer)
    outputValue.textContent = answer
})

const calculate = () => {
    let operationString = input.join("")
    let answer
    try {
        answer = eval(operationString)
    } catch (e) {
       if (e instanceof SyntaxError) {
           answer = 'SyntaxError'
       }
    }
    return answer
}




createEntityArray()
getInput()
