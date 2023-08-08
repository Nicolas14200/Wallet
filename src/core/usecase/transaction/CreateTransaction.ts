import { TransactionRepository } from "../../../core/repository/TransactionRepository";
import { Transaction } from "../../../core/domain/entities/Transaction";
import { Split } from "../../../core/domain/valuesObjects/Split";
import { Usecase } from "../Usecase";
import {CreateInstalment} from "../../usecase/instalment/CreateInstalment";
import { CalculatePayments } from "./CalculatePayments";
import { inject, injectable } from "inversify";
import { CreshIdentifier } from "../CreshIdentifier";

export interface CreateTransactionProps {
    store_name: string;
    split: Split;
    is_online: boolean;
    is_completed :boolean;
    customer_id: string;
    totalAmount: number;
}

@injectable()
export class CreateTransaction implements Usecase<CreateTransactionProps, Transaction>{

    constructor(
        @inject(CreshIdentifier.transactionRepository)
        private readonly _transactionRepo: TransactionRepository,
        @inject(CreshIdentifier.createInstalment)
        private readonly _createInstalment: CreateInstalment,
        @inject(CreshIdentifier.calculatePayments)
        private readonly _calculatePayments: CalculatePayments){}

    async execute(props: CreateTransactionProps): Promise<Transaction> {
        const transaction = Transaction.create({
            is_completed: props.is_completed,
            is_online: props.is_online,
            split: props.split,
            store_name: props.store_name,
            customer_id: props.customer_id,
            totalAmount: props.totalAmount
        })

        const arrayOfPayment = this._calculatePayments.execute({
            numberOfPayments: transaction.props.split,
            totalAmount: props.totalAmount,
        })

        this._createInstalment.execute({
            amount:arrayOfPayment[0],
            is_paid: true,
            paid_date: new Date(),
            planned_date: new Date(),
            transaction_id: transaction.props.id,
        })

        for(let i = 1 ; i < arrayOfPayment.length ; i++){
            const c = await this._createInstalment.execute({
                amount:arrayOfPayment[i],
                is_paid: false,
                paid_date: new Date(),
                planned_date: new Date(),
                transaction_id: transaction.props.id,
            })
        }
        
        await this._transactionRepo.save(transaction);
        return transaction;
    }
}