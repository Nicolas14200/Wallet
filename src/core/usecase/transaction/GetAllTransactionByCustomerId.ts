import { Transaction } from "../../../core/domain/entities/Transaction";
import { Usecase } from "../Usecase";
import { TransactionRepository } from "../../../core/repository/TransactionRepository";
import { inject, injectable } from "inversify";
import { CreshIdentifier } from "../CreshIdentifier";

@injectable()
export class GetAllTransactionByCustomerId implements Usecase<string, Transaction[]> {

    constructor(
        @inject(CreshIdentifier.transactionRepository)
        private readonly _transactionRepo: TransactionRepository)
        {}

    async execute(id: string): Promise<Transaction[]> {
        return this._transactionRepo.getAllTransactionByCustyomerId(id);
    }  
}