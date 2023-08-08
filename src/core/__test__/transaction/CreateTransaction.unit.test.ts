import {Transaction} from "../../domain/entities/Transaction";
import { Split } from "../../domain/valuesObjects/Split";
import {InMemoryTransactionRepository} from "../adapters/inMemory/InMemoryTransactionRepository";
import {CreateTransaction} from "../../usecase/transaction/CreateTransaction";
import { CalculatePayments } from "../../usecase/transaction/CalculatePayments";
import {CreateInstalment} from "../../usecase/instalment/CreateInstalment";
import {InMemoryInstalmentRepository} from "../adapters/inMemory/InMemoryInstalmentRepository";
describe("Unit - CreateTransaction", () => {
    let transaction: Transaction;
    let transactionRepo: InMemoryTransactionRepository; 
    let createTransaction: CreateTransaction;
    let createInstalment: CreateInstalment;
    let calculatePayments: CalculatePayments;
    let instalmentRepository : InMemoryInstalmentRepository;

    beforeAll(async () => {
        transactionRepo = new InMemoryTransactionRepository(new Map());
        instalmentRepository = new InMemoryInstalmentRepository(new Map());
        createInstalment = new CreateInstalment(instalmentRepository);
        calculatePayments = new CalculatePayments();
        createTransaction = new CreateTransaction(transactionRepo, createInstalment, calculatePayments);
    })

    it("Should create a transaction", async () => {
        transaction = await createTransaction.execute({
            is_completed: false,
            is_online: true,
            split: Split.four,
            store_name: "Carrefour",
            customer_id :"CUSTOMER_ID",
            totalAmount: 100,
        });
        console.log(await instalmentRepository.getAll())
        expect(transaction.props.store_name).toEqual("Carrefour")
    })
})