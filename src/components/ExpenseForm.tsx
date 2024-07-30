import { categories } from "../data/categories"

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    });

    const [previousAmount, setPreviousAmount] = useState(0);

    const [error, setError] = useState('');

    const { state, dispatch, totalAvailable } = useBudget();

    useEffect(() => {
        if (state.editingId) {
            const expense = state.expenses.find(expense => expense.id === state.editingId);
            if (expense) {
                setExpense(expense);
                setPreviousAmount(expense.amount);
            }
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setExpense({
            ...expense,
            //validar si es un input de tipo number
            [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (expense.amount < 1) {
            setError('La cantidad debe ser mayor a 0');
            return;
        }

        if ((expense.amount - previousAmount) > totalAvailable) {
            setError('La cantidad supera el presupuesto disponible');
            return;
        }

        if (state.editingId) {
            console.log('editando')
            dispatch({ type: 'EDIT_EXPENSE', payload: { expense: { id: state.editingId, ...expense } } })
            return ;
        }

        dispatch({ type: 'ADD_EXPENSE', payload: { expense } })

        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })

        setError('');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <legend className="uppercase text-center text-2xl font-extrabold border-b-4 border-blue-500">
                {state.editingId ? 'Editar Gasto' : 'Agregar Gasto'}
            </legend>

            {
                error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )
            }

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    name="expenseName"
                    placeholder="Ejemplo: Transporte"
                    className="p-2 bg-slate-100"
                    value={expense.expenseName}
                    onChange={handleChange}

                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Ejemplo: 300"
                    className="p-2 bg-slate-100"
                    value={expense.amount === 0 ? '' : expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria:</label>
                <select
                    id="category"
                    name="category"
                    className="p-2 bg-slate-100"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione una opción</option>
                    {
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Fecha Gasto:</label>
                <DatePicker
                    className={'p-2 bg-slate-100'}
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer font-bold w-full text-white uppercase rounded-lg p-2 hover:bg-blue-700 transition-all duration-300 ease-in-out"
                value={state.editingId ? 'Editar Gasto' : 'Agregar Gasto'}
            />
        </form>
    )
}

export default ExpenseForm