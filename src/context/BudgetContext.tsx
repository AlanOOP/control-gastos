import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { budgetActions, budgetReducer, budgetState, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: budgetState,
    dispatch: Dispatch<budgetActions>,
    totalExpenses: number,
    totalAvailable: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalExpenses = useMemo(() => state.expenses.reduce((acc, expense) => acc + expense.amount, 0), [state.expenses])

    const totalAvailable = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses])

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                totalAvailable
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}