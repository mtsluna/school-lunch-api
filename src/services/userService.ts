import { getStudentsByFatherEmail } from "./studentService";

export interface User {
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const students = await getStudentsByFatherEmail(email);
    if (students.length === 0) return null;

    const student = students[0];

    return {
      email: student.father_email,
      password: student.father_document,
    };
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Failed to find user");
  }
};
