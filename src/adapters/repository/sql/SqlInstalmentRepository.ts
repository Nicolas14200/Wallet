import { Instalment } from "core/domain/entities/Instalment";
import { InstalmentRepository } from "core/repository/InstalmentRepository";

export class SqlInstalmentRepository implements InstalmentRepository{
    save(instalment: Instalment): Promise<Instalment> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Instalment[]> {
        throw new Error("Method not implemented.");
    }
    getAllByTransactionId(id: string): Promise<Instalment[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Instalment> {
        throw new Error("Method not implemented.");
    }
    
}