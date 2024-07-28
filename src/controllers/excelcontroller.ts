import { Request, Response } from 'express';
import ExcelService from '../services/excelservice';
import path from 'path';
import fs from 'fs';

export default class ExcelController {
  static async processExcel(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const filePath = path.resolve(file.path);
      await ExcelService.processExcelFile(filePath);
      fs.unlinkSync(filePath); // Clean up the uploaded file
      res.status(200).json({ message: 'Excel data processed successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error processing Excel file', error: error.message });
    }
  }
}
