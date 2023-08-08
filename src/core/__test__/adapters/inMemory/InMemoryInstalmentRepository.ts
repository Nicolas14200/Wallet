import { Instalment } from "../../../../core/domain/entities/Instalment";
import { InstalmentRepository } from "../../../../core/repository/InstalmentRepository";

export class InMemoryInstalmentRepository implements InstalmentRepository {

    constructor(private readonly _mapInstalment: Map<string, Instalment>){}

    async getById(id: string): Promise<Instalment> {
        const instalment: Instalment = this._mapInstalment.get(id)
        return instalment;
    }

    async getAllByTransactionId(id: string): Promise<Instalment[]> {
        const transactions: Instalment[] = [];
        for (let transaction of this._mapInstalment.values()) {
            if (transaction.props.transaction_id === id) {
                transactions.push(transaction);
            }
        }
        return transactions;
    }

    async save(instalment: Instalment): Promise<Instalment> {
        this._mapInstalment.set(instalment.props.id, instalment);
        return instalment;
    }

    async getAll(): Promise<Instalment[]>{
        return Array.from(this._mapInstalment.values())
    }
    
}