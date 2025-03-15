import { getSheetDataDynamically } from "../clients/sheetsConnector";
import { getStudentsByFatherEmail } from "./studentService";

export const getOrdersByFatherEmailAndDate = async (
  fatherEmail: string,
  date: string
) => {
  const students = await getStudentsByFatherEmail(fatherEmail);

  if (students.length == 0) return [];

  const studentCondition = students
    .map((student) => `D = ${student.student_document}`)
    .join(" OR ");

  return await getSheetDataDynamically(
    "orders search",
    `=QUERY(orders!A:AAA, "SELECT * WHERE  (${studentCondition}) AND A = date '" & TEXT("${date}", "yyyy-MM-dd") & "'", 1)`
  );
};

export const getOrderByStudentDocumentAndDate = async (
  studentDocument: string,
  date: string
) => {
  return await getSheetDataDynamically(
    "orders search",
    `=QUERY(orders!A:AAA, "SELECT * WHERE  D = ${studentDocument} AND A = date '" & TEXT("${date}", "yyyy-MM-dd") & "'", 1)`
  );
};
