import mysql from "mysql2/promise";
const fs = require('fs').promises;
const path = require('path');
import {Transaction} from "../../core/domain/entities/Transaction";
import { Split } from "../../core/domain/valuesObjects/Split";
import {SqlTransactionRepository} from "../repository/sql/SqlTransactionRepository";
import { Customer } from "../../core/domain/entities/Customer";

describe('Integration - SqlTransactionRepository', () => {
    let transaction: Transaction;
    let sqlTransactionRepository: SqlTransactionRepository;
    let connection: mysql.Connection;
    let customer: Customer;
    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "cresh",
        });

        customer = Customer.create({
            firstname: "Lionel",
            lastname: "Jospin",
            birthdate:new Date("September 22, 2018"),
        })

        transaction = Transaction.create({
            is_completed: false,
            is_online: false,
            split: Split.four,
            store_name: "Carrefour",
            customer_id : customer.props.id
        })
        sqlTransactionRepository = new SqlTransactionRepository(connection);
    })

    it("Should create a table of transaction", async () => {
        await connection.execute(`
        CREATE TABLE IF NOT EXISTS transaction
            (
                id VARCHAR(65) NOT NULL,
                is_online TINYINT(1),
                is_completed TINYINT(1),
                split VARCHAR(65) NOT NULL,
                store_name VARCHAR(65) NOT NULL,
                customer_id VARCHAR(65) NOT NULL
            )`
        )
    })

    it("Should save a transaction", async () => {
        await sqlTransactionRepository.save(transaction);
    })
    it("Should return all trasaction of a customer", async () => {
        transaction = Transaction.create({
            is_completed: false,
            is_online: false,
            split: Split.four,
            store_name: "Carrefour",
            customer_id : customer.props.id
        })
        await sqlTransactionRepository.save(transaction);
        const allTransacOfCutomer = await sqlTransactionRepository.getAllTransactionByCustyomerId(customer.props.id);
        expect(allTransacOfCutomer[0].props.store_name).toEqual("Carrefour")
    })
})