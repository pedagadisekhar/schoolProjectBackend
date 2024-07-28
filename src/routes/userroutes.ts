import { Router } from 'express';
import UserController from '../controllers/usercontroller';
import ClassController from '../controllers/ClassController';
import ExcelController from '../controllers/excelcontroller';
// import ExcelController from '../controllers/excelController';
import multer from 'multer';
import fs from 'fs';
import path from 'path';


const router = Router();
const userController = new UserController();


const uploadDir = path.join(__dirname, '..', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });


router.get('/user/:id', userController.getUser.bind(userController));
router.post('/class', ClassController.insertClass);
// router.post('/process-excel', ExcelController.uploadFile);
router.post('/processexcel', upload.single('file'), ExcelController.processExcel);



export default router;
