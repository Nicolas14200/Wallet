import { v4 } from 'uuid';
import { Split } from '../valuesObjects/Split';

export interface TransactionProps {
    id: string;
    store_name: string;
    split: Split;
    is_online: boolean;
    is_completed :boolean;
    customer_id: string;
    totalAmount: number;
}

export class Transaction {

    props: TransactionProps
    constructor(props: TransactionProps){
        this.props = props
    }

    static create(props: {
        store_name: string;
        split: Split;
        is_online: boolean;
        is_completed :boolean;
        customer_id: string;
        totalAmount: number;
    })
    {
        return new Transaction({
            id:v4(),
            store_name: props.store_name,
            split: props.split,
            is_online: props.is_online,
            is_completed :props.is_completed,
            customer_id: props.customer_id,
            totalAmount: props.totalAmount
        })
    }
}