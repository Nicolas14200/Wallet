import {Customer} from "../../domain/entities/Customer";
import {InMemoryTransactionRepository} from "../adapters/inMemory/InMemoryTransactionRepository";
import {Transaction} from "../../domain/entities/Transaction";
import {GetAllTransactionByCustomerId} from "../../usecase/transaction/GetAllTransactionByCustomerId";
import { Split } from "../../domain/valuesObjects/Split";
describe('Unit - GetAllTransactionByCustomerId', () => {
    let customer: Customer;
    let transactionRepo: InMemoryTransactionRepository;
    let transaction01: Transaction;
    let transaction02: Transaction;
    let getAllTransactionByCustomerId: GetAllTransactionByCustomerId;
    beforeAll( async () => {
        transactionRepo = new InMemoryTransactionRepository(new Map());
        getAllTransactionByCustomerId = new GetAllTransactionByCustomerId(transactionRepo);
        customer = Customer.create({
            birthdate: new Date(),
            firstname: "LALA",
            lastname: "LOLO",
        })
        transaction01 = Transaction.create({
            is_completed:false,
            is_online:false,
            split:Split.four,
            store_name:"transact001",  
            customer_id:customer.props.id,
            totalAmount: 100
        })
        transaction02 = Transaction.create({
            is_completed:false,
            is_online:false,
            split:Split.four,
            store_name:"transact002",  
            customer_id:customer.props.id,
            totalAmount: 100
        })
        await transactionRepo.save(transaction01);
        await transactionRepo.save(transaction02);
    })
    it("Should return all transaction by a customer id", async () => {
        const transactionByCustomerIdArray: Transaction[] = await getAllTransactionByCustomerId.execute(customer.props.id);
        expect(transactionByCustomerIdArray[0].props.store_name).toEqual("transact001");
        expect(transactionByCustomerIdArray[1].props.store_name).toEqual("transact002")
    })
})