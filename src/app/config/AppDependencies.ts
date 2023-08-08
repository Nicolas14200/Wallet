import { SqlCustomerRepository } from "adapters/repository/sql/SqlCustomerRepository";
import { CreshIdentifier } from "core/usecase/CreshIdentifier";
import { Container } from "inversify";
import mysql from "mysql2/promise";

let connection: Promise<mysql.Connection> =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cresh",
});
export class AppDependencies extends Container {
    async init(){
        this.bind(CreshIdentifier.customerRepository).toConstantValue(new SqlCustomerRepository(await connection))
    }
}