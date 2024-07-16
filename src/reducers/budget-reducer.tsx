import { createExpense } from "../helpers"
import { DraftExpense, Expense } from "../types"

export type budgetActions =
    { type: 'ADD_BUDGET', payload: { budget: number } } |
    { type: 'SHOW-MODAL' } |
    { type: 'CLOSE-MODAL' } |
    { type: 'ADD_EXPENSE', payload: { expense: DraftExpense } }

export type budgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
}

export const initialState: budgetState = {
    budget: 0,
    modal: false,
    expenses: []
}


export const budgetReducer = (state: budgetState = initialState, action: budgetActions) => {

    if (action.type === 'ADD_BUDGET') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if (action.type === 'SHOW-MODAL') {
        return {
            ...state,
            modal: !state.modal
        }
    }

    if (action.type === 'CLOSE-MODAL') {
        return {
            ...state,
            modal: !state.modal
        }
    }

    if (action.type === 'ADD_EXPENSE') {

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    return state;
}