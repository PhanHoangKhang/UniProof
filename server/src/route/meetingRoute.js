import express from 'express'
import { createBooking, getBooking, infoBooking } from '../controller/BookingController.js'
import multer from "multer";

const meetingRouter = express.Router()
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now}${file.originalname}`)
    }
})

const upload = multer({storage: storage});

meetingRouter.post('/create', upload.single('file'), createBooking)
meetingRouter.get("/:userId", getBooking);
meetingRouter.get('/info/:id', infoBooking)

export default meetingRouter