import AmountDisplay from "./AmountDisplay";

import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const BudgetTracker = () => {

    const { state, totalAvailable, totalExpenses, dispatch } = useBudget();

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <div className="w-64 h-64">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            textSize: '20px',
                            pathColor: percentage === 100 ? '#3B82F6' : '#3B82F6',
                            textColor: percentage === 100 ? '#3B82F6' : '#3B82F6',
                            trailColor: '#F5F5F5',
                        })}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full text-white uppercase font-bold rounded-lg p-2 hover:bg-pink-700 transition-all duration-200 ease-in-out"
                    onClick={() => dispatch({ type: 'RESET' })}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={totalAvailable}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}

export default BudgetTracker