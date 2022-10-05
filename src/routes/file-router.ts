import {Response, Router} from 'express';
import multer from "multer";
import * as path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});

const upload = multer({storage});

export const p = {
    upload: '/',
} as const;

router.post(p.upload, upload.single("file"), async (req, res: Response) => {
    res.status(200).json({url: req.file?.path}).end()
});

export default router;
