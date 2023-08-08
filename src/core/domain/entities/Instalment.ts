import { v4 } from 'uuid';

export interface InstalmentProps {
    id: string;
    amount: number;
    is_paid: boolean;
    planned_date: Date;
    paid_date:Date;
    transaction_id: string;
}

export class Instalment {

    props: InstalmentProps
    constructor(props: InstalmentProps){
        this.props = props
    }

    static create(props: {
        amount: number;
        is_paid: boolean;
        planned_date: Date;
        paid_date:Date;
        transaction_id: string;
    })
    {
        return new Instalment({
            id:v4(),
            is_paid: props.is_paid,
            planned_date: props.planned_date,
            paid_date: props.paid_date,
            amount:props.amount,
            transaction_id: props.transaction_id
        })
    }

    triggerInstalment(){
        this.props.is_paid = true;
    }
}