import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { createContext, useReducer } from "react";
import {db} from '../firebase/configuration';
export const PFTContext = createContext();

const calculateAmount = (item) => {
  let newAmount = 0;
  item.map(({ amount }) => (newAmount = newAmount + parseInt(amount)));
  return newAmount;
};

const pftReducer = (state, action) => {
  if (action.type === "ADD_INCOME") {
    let newIncome = calculateAmount([...state.income, action.payload]);
    // try{
    //   const userDocRef = doc(db, "users", state.userId);
    //   await updateDoc(userDocRef,{
    //       "transactions.income": arrayUnion(action.payload)
    //   })
    // }catch(error){
    //   console.log('error', error);
    // }
    return {
      ...state,
      income: [...state.income, action.payload],
      incomeAmt: newIncome,
    };
  }else if(action.type == 'INITIAL_DATA'){
    return {...state, income: action.payload.income, expenses:action.payload.expense}
  }
  
  else if (action.type === "ADD_EXPENSE") {
    let newExpense = calculateAmount([...state.expenses, action.payload]);
    // try{
    //   const userDocRef = doc(db, "users", state.userId);
    //   await updateDoc(userDocRef,{
    //       "transactions.expense": arrayUnion(action.payload)
    //   })
    // }catch(error){
    //   console.log('error', error);
    // }
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      expenseAmt: newExpense,
    };
  } else if (action.type === "CALCULATE_EXPENSE") {
    return { ...state, expenseAmt: action.payload };
  } else if (action.type === "CALCULATE_INCOME") {
    return { ...state, incomeAmt: action.payload };
  } else if (action.type === "RESET_BALANCE") {
    return {
      ...state,
      incomeAmt: 0,
      expenseAmt: 0,
      income: [],
      expenses: [],
      userId: "",
      email: "",
    };
  } else if (action.type === "SET_USER_CREDENTIALS") {
    console.log('hello');
    return {
      ...state,
      userId: action.payload.userId,
      email: action.payload.email,
      authenticated: true,
    };
  }
  return state;
};

function PFTContextProvider({ children }) {
  const [state, dispatch] = useReducer(pftReducer, {
    expenses: [],
    income: [],
    currentBalance: 0,
    expenseAmt: 0,
    incomeAmt: 0,
    authenticated: false,
  });

  return (
    <PFTContext.Provider value={{ state, dispatch }}>
      {children}
    </PFTContext.Provider>
  );
}

export default PFTContextProvider;
