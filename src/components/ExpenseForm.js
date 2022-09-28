import React from 'react'
import {MdSend} from 'react-icons/md'

const ExpenseForm = ({amount,charge,amountHandler,chargeHandler,submitHandler,edit}) => {
  return (
    <>
    <form onSubmit={submitHandler}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>charge</label>
          <input type='text' className='form-control' id='charge' name='charge' placeholder='e.g. rent' value={charge} onChange={chargeHandler}/>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>amount</label>
          <input type='number' className='form-control' id='amount' name='amount' placeholder='e.g. 100' value={amount} onChange={amountHandler}/>
        </div>
      </div>
      <button type='submit' className='btn'>{edit?"Edit":"Submit"} <MdSend className='btn-icon'/></button>
    </form>
    </>
  )
}

export default ExpenseForm;
