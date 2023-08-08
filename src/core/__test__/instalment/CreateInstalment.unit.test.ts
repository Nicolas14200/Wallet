import { Instalment } from "../../domain/entities/Instalment";
import {InMemoryInstalmentRepository} from "../adapters/inMemory/InMemoryInstalmentRepository"

describe("Unit - CreateInstalment", () => {
    let instalmentRepo: InMemoryInstalmentRepository;
    let instalment: Instalment;
    beforeAll(() => {
        instalmentRepo = new InMemoryInstalmentRepository(new Map());
        instalment = Instalment.create({
            amount: 10,
            is_paid: true,
            paid_date: new Date(),
            planned_date: new Date(),
            transaction_id: "TRANSACTION_FAKE_ID",
        })
    })
    it("Should create a instalment", async () => {
        const newInstalment = await instalmentRepo.save(instalment);
        expect(newInstalment.props.transaction_id).toEqual("TRANSACTION_FAKE_ID")
    })
})