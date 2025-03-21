import dotenv from "dotenv";
import { JWT as GoogleAuth } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

dotenv.config();

const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } =
  process.env;

if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  throw new Error("Missing Google Sheets credentials in environment variables");
}

// Lock system to prevent concurrent access to the same sheet
const sheetLocks = new Map<string, boolean>();

const acquireLock = async (
  sheetName: string,
  timeoutMs: number = 10000
): Promise<boolean> => {
  const startTime = Date.now();
  while (sheetLocks.get(sheetName)) {
    if (Date.now() - startTime > timeoutMs) {
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  sheetLocks.set(sheetName, true);
  console.log(`Lock acquired for sheet: ${sheetName}`);
  return true;
};

const releaseLock = (sheetName: string): void => {
  sheetLocks.delete(sheetName);
  console.log(`Lock released for sheet: ${sheetName}`);
};

const getDoc = async () => {
  const auth = new GoogleAuth({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, auth);

  await doc.loadInfo();

  return doc;
};

export const getSheetData = async (sheetName: string) => {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();

    return rows.map((row) => row.toObject());
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    throw new Error("Failed to fetch data from Google Sheets");
  }
};

export const getSheetDataDynamically = async (
  sheetName: string,
  query: string
) => {
  try {
    const lockAcquired = await acquireLock(sheetName);
    if (!lockAcquired) {
      throw new Error(`Timeout waiting for lock on sheet: ${sheetName}`);
    }

    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[sheetName];

    await sheet.loadCells("A1");

    sheet.getCellByA1("A1").formula = query;

    await sheet.saveUpdatedCells();

    const rows = await sheet.getRows();

    return rows.map((row) => row.toObject());
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    throw new Error("Failed to fetch data from Google Sheets");
  } finally {
    releaseLock(sheetName);
  }
};

export const addRow = async (sheetName: string, data: any) => {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[sheetName];
    await sheet.addRow(data);
  } catch (error) {
    console.error("Error saving Google Sheet data:", error);
    throw new Error("Failed to saving data into Google Sheets");
  }
};
