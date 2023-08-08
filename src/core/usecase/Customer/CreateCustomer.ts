import { Customer } from "../../../core/domain/entities/Customer";
import { Usecase } from "../Usecase";
import { CustomerRepository } from "../../../core/repository/CustomerRepository";
import { inject, injectable } from "inversify";
import { CreshIdentifier } from "../CreshIdentifier";

export interface CreateCustomerProps {
    firstname: string;
    lastname: string;
    birthdate: Date;
}

@injectable()
export class CreateCustomer implements Usecase<CreateCustomerProps, Customer> {

    constructor(
        @inject(CreshIdentifier.customerRepository)
        private readonly _customerRepo: CustomerRepository)
        {}

    async execute(payload: CreateCustomerProps): Promise<Customer> {
        const customer  = Customer.create({
            birthdate: payload.birthdate,
            firstname: payload.firstname,
            lastname: payload.lastname,
        })
        await this._customerRepo.save(customer);
        return customer;
    }

}