import { Transaction } from "core/domain/entities/Transaction";
import { TransactionRepository } from "core/repository/TransactionRepository";

export class InMemoryTransactionRepository implements TransactionRepository {

    constructor(private readonly _mapTransaction: Map<string, Transaction>){}

    async getAllTransactionByCustyomerId(id: string): Promise<Transaction[]> {
        const transactions: Transaction[] = [];
        for (let transaction of this._mapTransaction.values()) {
            if (transaction.props.customer_id== id) {
                transactions.push(transaction);
            }
        }
        return transactions;
    }

    async save(transaction: Transaction): Promise<Transaction> {
        this._mapTransaction.set(transaction.props.id, transaction);
        return transaction;
    }
    
}