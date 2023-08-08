import { Customer } from "core/domain/entities/Customer";

export interface CustomerRepository {
    save(customer: Customer): Promise<Customer>;
    getAll(): Promise<Customer[]>;
}