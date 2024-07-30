import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {

  const { state } = useBudget();

  console.log(state.budget)

  const isValid = useMemo(() => state.budget, [state.budget]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-gradient-to-br from-blue-600 to-sky-800 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {
          isValid ? (
            <BudgetTracker />
          ) : (
            <BudgetForm />
          )
        }
      </div>

      {
        isValid && (
          <main className="mx-auto max-w-3xl py-10">
            <FilterByCategory />
            <ExpenseList />
            <ExpenseModal />
          </main>
        )
      }
    </>
  )
}

export default App
