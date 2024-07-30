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

export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return date.toLocaleDateString('es-MX', options)
}