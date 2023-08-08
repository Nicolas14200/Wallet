export class CreshIdentifier {
    static readonly customerRepository = Symbol.for("customerRepository");
    static readonly transactionRepository = Symbol.for("transactionRepository");
    static readonly instalmentRepository = Symbol.for("instalmentRepository");
    static readonly createInstalment = Symbol.for("createInstalment");
    static readonly calculatePayments = Symbol.for("calculatePayments");

}