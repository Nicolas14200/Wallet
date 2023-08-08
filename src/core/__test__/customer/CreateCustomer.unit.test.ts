import {InMemoryCustomerRepository} from "../adapters/inMemory/InMemoryCustomerRepository";
import {CreateCustomer} from "../../usecase/Customer/CreateCustomer";
import {Customer} from "../../domain/entities/Customer";

describe("Unit - CreateCustomer", () => {
    let customerRepo: InMemoryCustomerRepository;
    let createCustomer: CreateCustomer;
    beforeAll(() => {
        customerRepo = new InMemoryCustomerRepository(new Map());
        createCustomer = new CreateCustomer(customerRepo)
    })
    it("Should create a customer", async () => {
        const customer: Customer = await createCustomer.execute({
            firstname:"John",
            lastname:"Doe",
            birthdate: new Date('August 19, 1975 23:15:30'),
        })
        expect(customer.props.firstname).toEqual("John")
    })
})