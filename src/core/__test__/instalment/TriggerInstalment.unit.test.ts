import { Instalment } from "../../domain/entities/Instalment";
import { InMemoryInstalmentRepository } from "../adapters/inMemory/InMemoryInstalmentRepository";
import { TriggerInstalment } from "../../usecase/instalment/TriggerInstalment";

describe('Unit - TriggerInstalment', () => {
    let instalment: Instalment;
    let instalmentRepository : InMemoryInstalmentRepository;
    let triggerInstalment: TriggerInstalment;

    beforeAll( async () => {
        instalmentRepository = new InMemoryInstalmentRepository(new Map());
        triggerInstalment = new TriggerInstalment(instalmentRepository);
        instalment = Instalment.create({
            amount: 25,
            is_paid: false,
            paid_date: new Date(),
            planned_date: new Date(),
            transaction_id: "TRANSACTION_ID",
        })
        await instalmentRepository.save(instalment)
    })
    
    it("Should change the props is_paid of Instalment to true", async () => {
        await triggerInstalment.execute(instalment.props.id);
        const instalmentTrigger = await instalmentRepository.getById(instalment.props.id);
        expect(instalmentTrigger.props.is_paid).toEqual(true)
    })
})