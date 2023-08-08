import { Customer } from "core/domain/entities/Customer";
import { Usecase } from "../Usecase";
import { CustomerRepository } from "core/repository/CustomerRepository";
import { inject, injectable } from "inversify";
import { CreshIdentifier } from "../CreshIdentifier";

@injectable()
export class GetAllCustomer implements Usecase<void, Customer[]> {

    constructor(
        @inject(CreshIdentifier.customerRepository)
        private readonly _customerRepo: CustomerRepository
        ){}

    execute(): Promise<Customer[]> {
        return this._customerRepo.getAll()
    }

}