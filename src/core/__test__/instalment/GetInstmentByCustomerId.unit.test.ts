import { Transaction } from "../../domain/entities/Transaction";
import { Split } from "../../domain/valuesObjects/Split";
import { CreateInstalment } from "../../usecase/instalment/CreateInstalment";
import { CalculatePayments } from "../../usecase/transaction/CalculatePayments";
import { CreateTransaction } from "../../usecase/transaction/CreateTransaction";
import { InMemoryInstalmentRepository } from "../adapters/inMemory/InMemoryInstalmentRepository";
import { InMemoryTransactionRepository } from "../adapters/inMemory/InMemoryTransactionRepository";

describe('Unit - GetInstalmentByTransactionId', () => {
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
    it("Should return an array of instalment by transaction id", async () => {
        transaction = await createTransaction.execute({
            is_completed: false,
            is_online: true,
            split: Split.four,
            store_name: "Carrefour",
            customer_id :"CUSTOMER_ID",
            totalAmount: 100,
        });
        const instalmentsArrray = await instalmentRepository.getAllByTransactionId(transaction.props.id);
        console.log(instalmentsArrray);
        expect(instalmentsArrray[0].props.amount).toEqual(25);
    })
})