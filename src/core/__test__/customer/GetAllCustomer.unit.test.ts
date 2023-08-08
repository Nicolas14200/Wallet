import { InMemoryCustomerRepository } from "../adapters/inMemory/InMemoryCustomerRepository";
import { GetAllCustomer } from "../../usecase/Customer/GetAllCustomer";
import { Customer } from "../../domain/entities/Customer";

describe('Unit - getAllCustomer', () => {
    let customerRepo: InMemoryCustomerRepository;
    let getAllCustomer: GetAllCustomer;
    beforeAll(async () => {
        customerRepo = new InMemoryCustomerRepository(new Map());
        getAllCustomer = new GetAllCustomer(customerRepo)

        const customerJohn: Customer = Customer.create({
            firstname:"John",
            lastname:"Doe",
            birthdate: new Date('August 19, 1975 23:15:30'),
        })
        const customerKarl: Customer = Customer.create({
            firstname:"Karl",
            lastname:"Marx",
            birthdate: new Date('August 19, 1975 23:15:30'),
        })
        await customerRepo.save(customerJohn);
        await customerRepo.save(customerKarl);
    })
    it("Should return an array of all cutomer", async () => {
        const allCustomer = await getAllCustomer.execute();
        expect(allCustomer[0].props.firstname).toEqual("John")
        expect(allCustomer[1].props.firstname).toEqual("Karl")
    })
})