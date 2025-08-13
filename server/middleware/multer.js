import multer from "multer";

const upload = multer({storage: multer.diskStorage({})})

export default upload;

//created upload middleware using multer package