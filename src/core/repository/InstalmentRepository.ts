import { Instalment } from "core/domain/entities/Instalment";

export interface InstalmentRepository {
    save(instalment: Instalment): Promise<Instalment>;
    getAll(): Promise<Instalment[]>;
    getAllByTransactionId(id: string): Promise<Instalment[]>;
    getById(id: string): Promise<Instalment>
}