import { Instalment } from "../../../core/domain/entities/Instalment";
import { Usecase } from "../Usecase";
import { InstalmentRepository } from "../../../core/repository/InstalmentRepository";
import { inject, injectable } from "inversify";
import { CreshIdentifier } from "../CreshIdentifier";

export interface CreateInstalmentProps {
    amount: number;
    is_paid: boolean;
    planned_date: Date;
    paid_date:Date;
    transaction_id: string;
}

@injectable()
export class CreateInstalment implements Usecase<CreateInstalmentProps, Instalment> {

    constructor(
        @inject(CreshIdentifier.instalmentRepository)
        private readonly _instalmentRepository: InstalmentRepository
        ){}

    async execute(props: CreateInstalmentProps): Promise<Instalment> {
        const instalment = Instalment.create({
            amount: props.amount,
            is_paid: props.is_paid,
            paid_date: props.paid_date,
            planned_date: props.planned_date,
            transaction_id: props.transaction_id,
        })
        this._instalmentRepository.save(instalment);
        return instalment;
    }
    
}