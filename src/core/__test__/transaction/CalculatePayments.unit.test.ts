import {CalculatePayments} from "../../usecase/transaction/CalculatePayments";

describe('Unit - CalculatePayment', () => {
    let calculatePayments: CalculatePayments;
    beforeAll(() => {
        calculatePayments = new CalculatePayments();
    })
    it("Should return a array of payment for instalment", async () => {
        const arrayOfPayment = calculatePayments.execute({
            numberOfPayments: 3,
            totalAmount: 100,
        })
        console.log(arrayOfPayment)
    })
})