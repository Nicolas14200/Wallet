import { Instalment } from "../../domain/entities/Instalment";
import { Usecase } from "../Usecase";
import { InstalmentRepository } from "../../repository/InstalmentRepository";
import { inject, injectable } from "inversify";
import { CreshIdentifier } from "../CreshIdentifier";

@injectable()
export class GetInstalmentByTransactionId implements Usecase<string, Instalment[]> {

    constructor(
        @inject(CreshIdentifier.instalmentRepository)
        private readonly _instalmentRepository: InstalmentRepository)
        {}

    async execute(transactionId: string): Promise<Instalment[]> {
        return this._instalmentRepository.getAllByTransactionId(transactionId)
    }
 
}