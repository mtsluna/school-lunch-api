import {getStudentsByFatherEmailAndFatherDocumentAndStudentDocument} from "./studentService";
import {createPreference} from "../clients/mercadopagoConnector";
import {addRow} from "../clients/sheetsConnector";

export const postCheckout = async (checkoutData: any) => {
    try {
        const amount = checkoutData.products.reduce((total: number, { price }: { price: number }) => {
            return total + (+price);
        }, 0);

        const [student] = await getStudentsByFatherEmailAndFatherDocumentAndStudentDocument(
            checkoutData.father_email,
            checkoutData.father_document,
            checkoutData.student_document
        );

        if(!student) {
            throw new Error(`Error searching student: ${checkoutData.father_email} ${checkoutData.father_document} ${checkoutData.student_document}`);
        }

        if(JSON.parse(student.subscription_enabled.toLowerCase())) {
            const newOrder = {
                student_name: student.student_name,
                student_surname: student.student_surname,
                student_document: student.student_document,
                student_type: student.student_type,
                father_name: student.father_name,
                father_surname: student.father_surname,
                father_document: student.father_document,
                father_email: student.father_email,
                subscription_enabled: student.subscription_enabled,
                amount: amount,
                products: `[${checkoutData.products.map((product: { title: string }) => product.title).join(";")}]`,
            };

            await addRow('orders', newOrder);

            return {
                flow: 'RESUME', preference: undefined
            }
        }

        const preference = await createPreference(student, checkoutData.products)

        return { flow: 'MERCADOPAGO', preference };
    } catch (error) {
        console.error("Error posting checkout:", error);
        throw new Error("Failed to post checkout to Google Sheets");
    }
};