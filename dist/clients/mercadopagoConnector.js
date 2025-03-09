"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreference = exports.findPaymentById = void 0;
const mercadopago_1 = require("mercadopago");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MERCADOPAGO_ACCESS_TOKEN } = process.env;
if (!MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error("Missing Mercado Pago credentials in environment variables");
}
const findPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mercadopago_1.MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });
    const payment = new mercadopago_1.Payment(client);
    return yield payment.get({
        id
    });
});
exports.findPaymentById = findPaymentById;
const createPreference = (student, products) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mercadopago_1.MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });
    const preference = new mercadopago_1.Preference(client);
    const items = products.map((product) => ({
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
            student,
            products
        },
        notification_url: 'https://my-app.com.ar/mercadopago/weebhook'
    };
    // @ts-ignore
    const response = yield preference.create({ body });
    return response.init_point;
});
exports.createPreference = createPreference;
