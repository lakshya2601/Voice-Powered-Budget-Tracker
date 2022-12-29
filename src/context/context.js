import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer.js";


const initalState = JSON.parse(localStorage.getItem('transactions'))|| []; 

export const ExpenseTrackerContext = createContext(initalState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initalState);

    //Action Creators
    const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    const addTransaction = (transaction) => dispatch({type: 'ADD_TRANSACTION', payload: transaction});
    
    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense' ? acc- currVal.amount : acc +currVal.amount)
    }, 0);

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )

}