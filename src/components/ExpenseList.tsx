import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {

    const { state, state: { expenses } } = useBudget();

    const category = useMemo(() => state.categoryFilter, [state.categoryFilter]);

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

    return (
        <div className="mt-10 bg-white shadow rounded-lg p-5">
            {
                isEmpty ? (
                    <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p>
                ) :
                    (
                        expenses
                            .filter(expense => category ? expense.category === category : expense)
                            .map(expense => (
                                <ExpenseDetail key={expense.id} {...expense} />
                            ))
                    )
            }
        </div>
    )
}

export default ExpenseList