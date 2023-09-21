import './calculator.css';
import { FC, useReducer } from 'react';
import DigitButton from './components/DigitButton.js';
import OperationButton from './components/OperationButton.js';
import { CloseIcon } from '../../../../components/common/svg-components';

export const ACTIONS = {
    ADD_DIGIT: 'add_digit',
    CHOOSE_OPERATION: 'choose_operation',
    CLEAR: 'clear-digit',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
    CALCULATE_PERCENTAGE:'calculate-percentage',
    ADD_PLUS_MINUS_SIGN:'add-plus-minus-sign'
}


const reducer = (state:any, action:any) => {

    switch (action.type) {
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite === true){
                return {
                    ...state,
                    currentOperand:action.payload.digit,
                    overwrite:false
                }
            }
            if (action.payload.digit == "0" && state.currentOperand == "0") return state
            if (action.payload.digit == "." && state.currentOperand.includes('.')) return state
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
            }

        case ACTIONS.CLEAR:
            return {}
        
        case ACTIONS.CHOOSE_OPERATION:
            if((state.currentOperand === null || state.currentOperand === undefined) && (state.previousOperand === null || state.previousOperand === undefined)) return state

            if(state.currentOperand === null || state.currentOperand === undefined){
                return {
                    ...state,
                    operation:action.payload.operation
                }
            }

            if(state.previousOperand === null || state.previousOperand === undefined){
                return {
                    ...state,
                    operation:action.payload.operation,
                    previousOperand:state.currentOperand,
                    currentOperand:null,
                } 
            }

            return {
                ...state,
                previousOperand:evaluate(state),
                currentOperand:null,
                operation:action.payload.operation
            }

        case ACTIONS.EVALUATE:
            if(state.previousOperand === null || state.previousOperand === undefined || state.currentOperand === null || state.currentOperand === undefined || state.operation === null || state.operation === undefined){
                return state
            }

            return {
                ...state,
                overwrite:true,
                previousOperand:null,
                operation:null,
                currentOperand:evaluate(state)
            }

        case ACTIONS.CALCULATE_PERCENTAGE:
            return {
                ...state,
                overwrite:true,
                previousOperand:null,
                operation:null,
                currentOperand:((state.currentOperand*1)/100)
            }

        case ACTIONS.ADD_PLUS_MINUS_SIGN:
            
            return {
                ...state,
                overwrite:true,
                previousOperand:null,
                operation:null,
                currentOperand: state.currentOperand ? state.currentOperand * -1 : 0
            }

    }
}



const evaluate = ({currentOperand, operation, previousOperand}:{currentOperand:any, operation:any, previousOperand:any}) =>{
    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    if(isNaN(previous) || isNaN(current)) return ""

    let computation = 0;
    switch (operation) {
        case "+":
            computation = previous + current
            break;

        case "-":
            computation = previous - current
            break;

        case "x":
            computation = previous * current
            break;

        case "÷":
            computation = previous / current
            break;
    }

    return computation.toString()
}

interface ICalculatorDialog {
    handleClose?: any;
}

const Calculator:FC<ICalculatorDialog> = ({handleClose}) => {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

    const INTEGER_FORMATTER =   new Intl.NumberFormat("en-us",{
        maximumFractionDigits:0
    })

    const formattedValue = (operand : any) => {
        if(operand == null || operand == undefined) return;
        const [integer, decimal] = operand?.split(",")
        if(decimal == null || decimal == undefined) return INTEGER_FORMATTER.format(integer)
    }
    return (
        <div className='dialog'>

            <div className='calculator-wrapper'>
                <div className='iconContainer'>
                    <CloseIcon fillColor="#02BF90" handleClick={handleClose}/>
                </div>
                <div className="calculator-grid">
                    <div className="calculator-output">
                        <div className="previous-operand">{(previousOperand)} {operation}</div>
                        <div className="current-operand">{(currentOperand)}</div>
                    </div>
                    <button className='clear' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>C</button>
                    <button className='operations' onClick={() => dispatch({ type: ACTIONS.ADD_PLUS_MINUS_SIGN,payload:{operation:'+/-'} })}>+/-</button>

                    <button className='operations' onClick={() => dispatch({ type: ACTIONS.CALCULATE_PERCENTAGE,payload:{operation:'%'} })}>%</button>
                    <OperationButton operation="÷" dispatch={dispatch} />

                    <DigitButton digit="7" dispatch={dispatch} />
                    <DigitButton digit="8" dispatch={dispatch} />
                    <DigitButton digit="9" dispatch={dispatch} />

                    <OperationButton operation="x" dispatch={dispatch} />

                    <DigitButton digit="4" dispatch={dispatch} />
                    <DigitButton digit="5" dispatch={dispatch} />
                    <DigitButton digit="6" dispatch={dispatch} />

                    <OperationButton operation="-" dispatch={dispatch} />

                    <DigitButton digit="1" dispatch={dispatch} />
                    <DigitButton digit="2" dispatch={dispatch} />
                    <DigitButton digit="3" dispatch={dispatch} />

                    <OperationButton operation="+" dispatch={dispatch} />
                    <DigitButton digit="." dispatch={dispatch} />

                    <DigitButton digit="0" dispatch={dispatch} />
                    <button className="span-two equal-to" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator