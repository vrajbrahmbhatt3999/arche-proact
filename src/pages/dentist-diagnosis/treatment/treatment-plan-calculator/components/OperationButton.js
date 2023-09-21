import React from 'react';
import { ACTIONS } from '../Calculator';
import '../calculator.css';

const OperationButton = ({dispatch,operation}) => {
    return (
        <>
        <button className='operations' onClick={()=>{dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}}); console.log('clicked')}}>{operation}</button>
        </>
    )
}


export default OperationButton