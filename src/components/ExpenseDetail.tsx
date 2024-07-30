
import { useMemo } from 'react';
import { formatDate } from '../helpers';
import { Expense } from '../types'
import AmountDisplay from './AmountDisplay';
import { categories } from '../data/categories';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import Swal from 'sweetalert2'
import { useBudget } from '../hooks/useBudget';

const ExpenseDetail = (expense: Expense) => {

    const { id, expenseName, amount, category, date } = expense;

    const { dispatch } = useBudget();

    const categoryInfo = useMemo(() => categories.filter((cat) => cat.id === category)[0], [expense]);

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_EXPENSE', payload: { id } })
                Swal.fire(
                    'Eliminado!',
                    'Tu gasto ha sido eliminado.',
                    'success'
                )
            }
        })
    }

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'GET_EXPENSE_BY_ID', payload: { id } })}

            >
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={handleDelete}

            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='bg-white shadow-lg p-10 border-b border-gray-200 flex items-center gap-5 w-full'>
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="imagen icono" className='w-20' />
                    </div>
                    <div className='flex-1 space-y-3'>
                        <p className='text-sm font-bold uppercase text-slate-500 '>{categoryInfo.name}</p>
                        <p>{expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(date?.toString() ?? '')}</p>
                    </div>
                    <AmountDisplay
                        amount={amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail