import { createContext, useEffect, useReducer } from "react";

export const PFTContext = createContext();

const calculateAmount = (item) => {
  let newAmount = 0;
  item.map(({ amount }) => (newAmount = newAmount + parseInt(amount)));
  return newAmount;
};

const pftReducer = (state, action) => {
  if (action.type === "ADD_INCOME") {
    let newIncome = calculateAmount([...state.income, action.payload]);
    return {
      ...state,
      income: [...state.income, action.payload],
      incomeAmt: newIncome,
    };
  } else if (action.type === "ADD_EXPENSE") {
    let newExpense = calculateAmount([...state.expenses, action.payload]);

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
    return { ...state, incomeAmt: 0, expenseAmt: 0, income: [], expenses: [] };
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
  });

  return (
    <PFTContext.Provider value={{ state, dispatch }}>
      {children}
    </PFTContext.Provider>
  );
}

export default PFTContextProvider;
