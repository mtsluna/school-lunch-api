import {findPaymentById} from "../clients/mercadopagoConnector";
import {addRow} from "../clients/sheetsConnector";

export const receivePaymentHook = async (hookData: any) => {

    console.info(hookData);

    if(hookData.topic !== "payment") {
        return;
    }

    const { id } = hookData;

    const payment = await findPaymentById(id);

    if(payment.status !== 'approved') {
        return;
    }

    const { date, student, products } = payment.metadata;

    const newOrder = {
        date,
        student_name: student.student_name,
        student_surname: student.student_surname,
        student_document: student.student_document,
        student_type: student.student_type,
        father_name: student.father_name,
        father_surname: student.father_surname,
        father_document: student.father_document,
        father_email: student.father_email,
        subscription_enabled: student.subscription_enabled,
        amount: payment.transaction_amount,
        products: `[${products.map((product: { title: string }) => product.title).join(";")}]`,
    };

    await addRow('orders', newOrder);

}