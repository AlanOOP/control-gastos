import { v4 as uuidv4 } from 'uuid';
import { DraftExpense } from '../types';

export const formtCurrency = (amount: number) => {
    return new Intl.NumberFormat(
        'en-MX',
        {
            style: 'currency',
            currency: 'MXN'
        }
    ).format(amount)
}


export const createExpense = (DraftExpense: DraftExpense) => {
    return {
        id: uuidv4(),
        ...DraftExpense
    }
}