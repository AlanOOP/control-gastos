import AmountDisplay from "./AmountDisplay";
import imgGrafico from '../assets/grafico.jpg'

const BudgetTracker = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src={imgGrafico} alt="" />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full text-white uppercase font-bold rounded-lg p-2 hover:bg-pink-700 transition-all duration-200 ease-in-out"
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={300}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={300}
                />
                <AmountDisplay
                    label="Presupuesto"
                    amount={300}
                />
            </div>
        </div>
    )
}

export default BudgetTracker