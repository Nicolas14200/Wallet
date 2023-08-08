import { Split } from "core/domain/valuesObjects/Split";
import { Transaction } from "../../../core/domain/entities/Transaction";
import { TransactionRepository } from "../../../core/repository/TransactionRepository";
import mysql from "mysql2/promise";

export class SqlTransactionRepository implements TransactionRepository {

    constructor(private readonly _connection: mysql.Connection){}

    async getAllTransactionByCustyomerId(id: string): Promise<Transaction[]> {

        const rows: mysql.RowDataPacket[] = await this._connection.execute(`
            SELECT * FROM transaction WHERE customer_id = '${id}'
        `) as mysql.RowDataPacket[];
        
        const newArrayOfTransaction: Transaction[] = rows[0].map((transac: { customer_id: string; 
                                                                             id: string; 
                                                                             is_completed: boolean; 
                                                                             is_online: boolean; 
                                                                             split: Split; 
                                                                             store_name: string; })=> {
            let transaction = new Transaction({
                customer_id: transac.customer_id,
                id: transac.id,
                is_completed: transac.is_completed,
                is_online: transac.is_online,
                split: transac.split,
                store_name: transac.store_name,
            })
            return transaction;
        }) as [];
        return newArrayOfTransaction
    }

    async save(transaction: Transaction): Promise<Transaction> {
        await this._connection.execute(`
        INSERT INTO transaction (id, is_online, is_completed, split, store_name, customer_id)
        VALUES (
            '${transaction.props.id}',
            '${transaction.props.is_online}',
            '${transaction.props.is_completed}',
            '${transaction.props.split}',
            '${transaction.props.store_name}',
            '${transaction.props.customer_id}'
            )
        `);
        return transaction
    }
}