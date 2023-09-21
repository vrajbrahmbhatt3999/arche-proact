import React from 'react';
import { ACTIONS } from '../Calculator';
import '../calculator.css';

const DigitButton = ({dispatch,digit}) => {
    return (
        <>
        <button onClick={()=>{dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}}); console.log('clicked')}}>{digit}</button>
        </>
    )
}


export default DigitButton