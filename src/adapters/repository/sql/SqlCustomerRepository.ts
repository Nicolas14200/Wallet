import { Customer } from "../../../core/domain/entities/Customer";
import { CustomerRepository } from "../../../core/repository/CustomerRepository";
import mysql from "mysql2/promise";

export interface CustomerProps {
    id: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
}

export class SqlCustomerRepository implements CustomerRepository {

    constructor(private readonly _connection: mysql.Connection){}

    async getAll(): Promise<Customer[]> {
        const rows: mysql.RowDataPacket[] = await this._connection.execute(`
            SELECT id, firstname, lastname, birthdate
            FROM customer
        `) as mysql.RowDataPacket[];
        const newMapOfCustomer: Customer[] = rows[0].map((sqlCustomer)=> {
            let customer = new Customer ({
                id: sqlCustomer.id,
                birthdate: sqlCustomer.birthdate,
                firstname: sqlCustomer.firstname,
                lastname: sqlCustomer.lastname,
            })
            return customer;
        }) as [];
        return newMapOfCustomer;
    }

    async save(customer: Customer): Promise<Customer> {
        await this._connection.execute(`
        INSERT INTO customer (id, firstname, lastname, birthdate)
        VALUES (
            '${customer.props.id}',
            '${customer.props.firstname}',
            '${customer.props.lastname}',
            '${customer.props.birthdate}'
            )
            `);
        return customer
    }
}