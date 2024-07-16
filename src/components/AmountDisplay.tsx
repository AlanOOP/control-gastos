
type AmountDisplayProps = {
    label: string,
    amount: number
}

const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
    return (
        <p className='text-2xl text-blue-600 font-bold'>
            {label}: {''}
            <span className='text-black'>{amount}</span>
        </p>
    )
}

export default AmountDisplay