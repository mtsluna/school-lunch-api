import {getSheetDataDynamically} from "../clients/sheetsConnector";

export const getOrdersByFatherDocumentAndStudentDocumentAndDate = async (fatherDocument: string, date: string) => {
    return  await getSheetDataDynamically('orders search', `=QUERY(orders!A:AAA, "SELECT * WHERE H = ${fatherDocument} AND A = date '" & TEXT("${date}", "yyyy-MM-dd") & "'", 1)`);
};