import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { createContext, useEffect, useReducer } from "react";
import { db } from "../firebase/configuration";
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
      addIncome: true,
    };
  } else if (action.type == "INITIAL_DATA") {
    let incomeAmount = calculateAmount(action.payload.income);
    let expenseAmount = calculateAmount(action.payload.expense);
    return {
      ...state,
      income: action.payload.income,
      expenses: action.payload.expense,
      incomeAmt: incomeAmount,
      expenseAmt: expenseAmount
    };
  } else if (action.type === "ADD_EXPENSE") {
    let newExpense = calculateAmount([...state.expenses, action.payload]);

    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      expenseAmt: newExpense,
      addExpense: true,
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
    addIncome: false,
    addExpense: false,
  });

  useEffect(() => {
    const updateIncome = async () => {
      try {
        const userDocRef = doc(db, "users", state.userId);
        await updateDoc(userDocRef, {
          "transactions.income": arrayUnion(state.income.at(-1)),
        });
      } catch (error) {
      }
    };
    if (state.addIncome == true) {
      updateIncome();
    }
  }, [state.income]);
  useEffect(() => {
    const updateExpenses = async () => {
      try {
        const userDocRef = doc(db, "users", state.userId);
        await updateDoc(userDocRef, {
          "transactions.expense": arrayUnion(state.expenses.at(-1)),
        });
      } catch (error) {
      }
    };
    if (state.addExpense == true) {
      updateExpenses();
    }
  }, [state.expenses]);

  return (
    <PFTContext.Provider value={{ state, dispatch }}>
      {children}
    </PFTContext.Provider>
  );
}

export default PFTContextProvider;
