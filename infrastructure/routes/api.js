import express from "express";

import apiController from "app/controllers/apiController";
import { uploadSingle } from "infrastructure/middlewares/multer";

const router = express.Router();

router.get("/landing-page", apiController.landingPage);
router.get("/detail-page/:id", apiController.detailPage);
router.post("/booking-page", uploadSingle, apiController.bookingPage);

export default router;
