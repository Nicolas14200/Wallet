import { Instalment } from "core/domain/entities/Instalment";
import { Usecase } from "../Usecase";
import { InstalmentRepository } from "core/repository/InstalmentRepository";
import { inject, injectable } from "inversify";
import { CreshIdentifier } from "../CreshIdentifier";

@injectable()
export class TriggerInstalment implements Usecase<string, void> {

    constructor(
        @inject(CreshIdentifier.instalmentRepository)
        private readonly _instalmentRepository: InstalmentRepository){}
    
    async execute(instalmentId: string): Promise<void> {
        const instalment: Instalment = await this._instalmentRepository.getById(instalmentId);
        instalment.triggerInstalment();
        await this._instalmentRepository.save(instalment);
        return;
    }

}