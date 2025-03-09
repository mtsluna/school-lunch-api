import { getSheetData } from "../clients/sheetsConnector";

export const getCatalogByDateAndStudentType = async (date: string, studentType: string) => {
    const data = await getSheetData('menus');

    const filteredData = data.filter((item: any) =>
        (item.day === date || item.day === "all") &&
        (item.student_type === studentType || item.student_type === "all")
    );

    const categories = [...new Set(filteredData.map(item => item.category))];

    return categories.map((category) => ({
        name: category,
        products: filteredData.filter((item: any) => item.category === category)
    }));
};