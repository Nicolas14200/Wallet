import { Transaction } from "core/domain/entities/Transaction";

export interface TransactionRepository {
    save(transaction: Transaction): Promise<Transaction>;
    getAllTransactionByCustyomerId(id: string): Promise<Transaction[]>
}