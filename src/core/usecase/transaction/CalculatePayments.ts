import { injectable } from "inversify";
import { Usecase } from "../Usecase";

export interface CalculatePaymentsProps {
    totalAmount: number;
    numberOfPayments: number;
}

@injectable()
export class CalculatePayments implements Usecase<CalculatePaymentsProps, number[]> {

    execute(payload: CalculatePaymentsProps): number[] {
        const individualPayment = Math.floor(payload.totalAmount / payload.numberOfPayments);
        const remainingAmount = payload.totalAmount - (individualPayment * payload.numberOfPayments);
        
        const payments: number[] = [];
        for (let i = 0; i < payload.numberOfPayments; i++) {
            let payment = individualPayment;
            
            if (i === 0) {
                payment += remainingAmount;
            }
            
            payments.push(payment);
        }
        return payments;
    }
}