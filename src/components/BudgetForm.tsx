import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


const BudgetForm = () => {

    const { dispatch } = useBudget();

    const [budget, setBudget] = useState(0)

    const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget < 1
    }, [budget]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'ADD_BUDGET', payload: { budget } })
    }

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col space-y-5 ">
                <label htmlFor="budget" className="text-4xl text-blue-600  font-bold text-center">Definir Presupuesto</label>
                <input
                    type="number"
                    id="budget"
                    name="budget"
                    placeholder="Ejemplo: 300"
                    className="w-full bg-white border border-gray-400 p-2"
                    value={budget === 0 ? '' : budget}
                    onChange={handleChage}
                />
            </div>

            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white uppercase font-bold transition-all duration-200 ease-in-out disabled:opacity-50"
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm