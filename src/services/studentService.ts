import { getSheetData } from "../clients/sheetsConnector";

export const getStudentsByFatherEmail = async (email: string) => {
  const data = await getSheetData("students");

  return data.filter((student: any) => student.father_email === email);
};

export const getStudentsByFatherEmailAndFatherDocumentAndStudentDocument =
  async (fatherEmail: string, studentDocument: string) => {
    const data = await getSheetData("students");

    return data.filter(
      (student: any) =>
        student.father_email === fatherEmail &&
        student.student_document === studentDocument
    );
  };
