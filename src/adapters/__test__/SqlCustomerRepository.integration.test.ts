import mysql from "mysql2/promise";
const fs = require('fs').promises;
const path = require('path');
import { Customer } from "../../core/domain/entities/Customer";
import { SqlCustomerRepository } from "../../adapters/repository/sql/SqlCustomerRepository";

describe("Integration - SqlCustomerRepository", () => {
    let customerKarl: Customer;
    let customerJohn: Customer;
    let sqlCustomerRepository: SqlCustomerRepository;
    let connection: mysql.Connection;
    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "cresh",
        });

        sqlCustomerRepository = new SqlCustomerRepository(connection);
        
        customerKarl = Customer.create({
            firstname: "Karl",
            lastname: "Marx",
            birthdate: new Date("May 5, 1818")
        })
        const customerJohn: Customer = Customer.create({
            firstname:"John",
            lastname:"Doe",
            birthdate: new Date('August 19, 1975 23:15:30'),
        })
        await sqlCustomerRepository.save(customerJohn);
        await sqlCustomerRepository.save(customerKarl);
        
    })

    it('Should create a table of customer', async () => {
        await connection.execute(`
            DROP TABLE IF EXISTS customer
            CREATE TABLE IF NOT EXISTS customer
            (
                id VARCHAR(65) NOT NULL,
                firstname VARCHAR(65) NOT NULL,
                lastname VARCHAR(65) NOT NULL,
                birthdate VARCHAR(65) NOT NULL
            )`
        );
    })

    it("Should return all customer in a array", async () => {
        const allCustomer = await sqlCustomerRepository.getAll()
        console.log("ICI ==========>", allCustomer)
        expect(allCustomer[0].props.firstname).toEqual("Karl")
        expect(allCustomer[0].props.firstname).toEqual("Karl")
    })
})