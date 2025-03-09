import {MercadoPagoConfig, Preference, Payment} from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

if (!MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error("Missing Mercado Pago credentials in environment variables");
}

export const findPaymentById = async (id: string) => {
    const client = new MercadoPagoConfig({  accessToken: MERCADOPAGO_ACCESS_TOKEN });

    const payment = new Payment(client);

    return await payment.get({
        id
    })
}

export const createPreference = async (date: string, student: any, products: Array<any>) => {
    const client = new MercadoPagoConfig({  accessToken: MERCADOPAGO_ACCESS_TOKEN });
    const preference = new Preference(client);

    const items = products.map((product: any) => ({
        title: product.title,
        description: product.description,
        quantity: 1,
        unit_price: parseFloat(product.price),
    }));

    // Create preference
    const body = {
        items: items,
        back_urls: {
            success: "http://www.your-site.com/success",
            failure: "http://www.your-site.com/failure",
            pending: "http://www.your-site.com/pending",
        },
        auto_return: "approved",
        metadata: {
            date,
            student,
            products
        },
        notification_url: 'https://school-lunch-api-production.up.railway.app/webhook/mercadopago'
    };

    // @ts-ignore
    const response = await preference.create({ body });

    return response.init_point;
}