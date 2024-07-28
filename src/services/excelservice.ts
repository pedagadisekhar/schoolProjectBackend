import * as XLSX from 'xlsx';
import path from 'path';
import { ClassData, FeesData } from '../Models/classmodel';
import Database from '../db/Database'; // Ensure you have a pool configured for database connections

const EXCEL_FILE_PATH = path.join(__dirname, '..', 'data', 'data.xlsx'); // Adjust path as needed

export default class ExcelService {
  private static db = Database.getInstance(); // Initialize database instance

  static async processExcelFile(filePath: string) {
    const workbook = XLSX.readFile(filePath);

    // Process Sheet 1
    const classSheet = workbook.Sheets['Sheet1'];
    const classData: ClassData[] = XLSX.utils.sheet_to_json(classSheet);

    // Process Sheet 2
    const feesSheet = workbook.Sheets['Sheet2'];
    const feesData: FeesData[] = XLSX.utils.sheet_to_json(feesSheet);

    try {
      // Insert data into ClassTableMaster
      for (const data of classData) {
        console.log('Inserting class data:', data);
        await this.insertClass(data);
      }

      // Insert data into FeesTable
      for (const data of feesData) {
        console.log('Inserting fees data:', data);
        await this.insertFees(data);
      }

      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      throw error;
    }
  }

  private static async insertClass(classData: ClassData) {

    console.log('classdata:',classData)
    const query = 'CALL InsertIntoClassTableMaster(?, ?, ?, ?, ?, ?, ?)';
    const values = [
      classData.className,
      classData.strength,
      classData.total_strength,
      classData.isactive,
      classData.created_by,
      classData.Territory,
      classData.TerritoryId,
    ];

    try {
      const [result] = await this.db.execute(query, values);
      return result;
    } catch (error) {
      console.error('Error inserting class data:', error);
      throw error;
    }
  }

  private static async insertFees(feesData: FeesData) {
    console.log('feesData:',feesData)
    const query = 'CALL InsertIntoFeesTable(?, ?, ?, ?)';
    const values = [
      feesData.className,
      feesData.ClassId,
      feesData.total_fees,
      feesData.paid_fees,
    ];

    try {
      const [result] = await this.db.execute(query, values);
      return result;
    } catch (error) {
      console.error('Error inserting fees data:', error);
      throw error;
    }
  }
}
