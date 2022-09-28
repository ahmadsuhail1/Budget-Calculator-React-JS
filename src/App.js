import react, { useEffect, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import ExpenseList from './components/ExpenseList';
import uuid from 'react-uuid';

// const initialExpenses = [
//   { id: uuid(), charge: 'rent', amount: 1600 },
//   { id: uuid(), charge: 'car payment', amount: 400 },
//   { id: uuid(), charge: 'credit card bill', amount: 1200 }
// ]
const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) :[];


function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(()=>{
    localStorage.setItem('expenses',JSON.stringify(expenses));
  },[expenses])

  const chargeHandler = e => {
    setCharge(e.target.value);
  }
  const amountHandler = e => {
    setAmount(e.target.value);
  }
  const alertHandler = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000);
  }
  const submitHandler = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item=>{
          return item.id===id?{...item,charge,amount}:item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        alertHandler({ type: 'success', text: 'item edited' })
      }
      else {
        const sngleExpense = { id: uuid(), charge, amount }
        setExpenses([...expenses, sngleExpense])
        alertHandler({ type: 'success', text: 'item added' })
      }

      setCharge('')
      setAmount('')

    } else {
      alertHandler({ type: 'danger', text: 'invalid data' })
    }
  }
  const clearItems = () => {
    setExpenses([]);
    alertHandler({ type: 'success', text: 'All data cleared' })
  }
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id)
    setExpenses(tempExpenses)
    alertHandler({ type: 'success', text: 'deleted successfully' })
  }
  const handleEdit = (id) => {
    let expense = expenses.find(item=>item.id===id);
    let {charge,amount}= expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      {/* <Alert/> */}
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          amountHandler={amountHandler}
          chargeHandler={chargeHandler}
          submitHandler={submitHandler}
          edit={edit}
        />
        <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} />
      </main>
      <h1>total spending : {" "}<span className='total'>
        ${" "}{expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount))
        }, 0)}
      </span>
      </h1>
    </>
  );
}

export default App;
