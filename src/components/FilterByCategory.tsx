import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

const FilterByCategory = () => {

    const { dispatch } = useBudget();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: 'FILTER_BY_CATEGORY',
            payload: { id: e.target.value }
        })
    }

    return (
        <div className="shadow bg-white rounded-lg p-10">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category" className="font-bold text-gray-600">Filtrar Gastos:</label>
                    <select
                        name="category"
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded border-slate-200 border-2"
                        onChange={handleChange}
                    >
                        <option value="">-- Todas las categorias</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}

export default FilterByCategory