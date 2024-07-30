import { createExpense } from "../helpers"
import { Category, DraftExpense, Expense } from "../types"

export type budgetActions =
    { type: 'ADD_BUDGET', payload: { budget: number } } |
    { type: 'SHOW-MODAL' } |
    { type: 'CLOSE-MODAL' } |
    { type: 'ADD_EXPENSE', payload: { expense: DraftExpense } } |
    { type: 'DELETE_EXPENSE', payload: { id: Expense['id'] } } |
    { type: 'GET_EXPENSE_BY_ID', payload: { id: Expense['id'] } } |
    { type: 'EDIT_EXPENSE', payload: { expense: Expense } } |
    { type: 'RESET' } |
    { type: 'FILTER_BY_CATEGORY', payload: { id: Category['id'] } }

export type budgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId?: Expense['id'],
    categoryFilter?: Category['id']
}

const initialBudget = (): number => {
    const budget = localStorage.getItem('budget');
    return budget ? +budget : 0;
}

const initialExpenses = (): Expense[] => {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

export const initialState: budgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    categoryFilter: ''
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
            modal: !state.modal,
            editingId: ''
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

    if (action.type === 'DELETE_EXPENSE') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === 'GET_EXPENSE_BY_ID') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'EDIT_EXPENSE') {
        return {
            ...state,
            expenses: state.expenses.map(expense => {
                if (expense.id === action.payload.expense.id) {
                    return action.payload.expense
                }
                return expense
            }),
            editingId: '',
            modal: false
        }
    }

    if (action.type === 'RESET') {

        localStorage.removeItem('expenses');
        localStorage.removeItem('budget');

        return initialState;
    }

    if (action.type === 'FILTER_BY_CATEGORY') {
        return {
            ...state,
            categoryFilter: action.payload.id
        }
    }

    

    return state;
}