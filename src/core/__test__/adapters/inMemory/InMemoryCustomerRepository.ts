import { Customer } from "core/domain/entities/Customer";
import { CustomerRepository } from "core/repository/CustomerRepository";

export class InMemoryCustomerRepository implements CustomerRepository {

    constructor(private readonly _mapCustomer: Map<string, Customer>){}

    async save(customer: Customer): Promise<Customer> {
        this._mapCustomer.set(customer.props.id, customer);
        return customer;
    }

    async getAll(): Promise<Customer[]> {
        return Array.from(this._mapCustomer.values())
    }
}