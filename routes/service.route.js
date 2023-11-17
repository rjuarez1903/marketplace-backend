import { Router } from "express";
import {
  getAllServices,
  getServicesByUser,
  createService,
  getServiceById,
  deleteService,
  updateService,
} from "../controllers/service.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { createServiceBodyValidator } from "../middlewares/validationResultExpress.js";

const router = Router();

router.get("/user", requireToken, getServicesByUser);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", requireToken, createServiceBodyValidator, createService);
router.patch("/:id", requireToken, createServiceBodyValidator, updateService);
router.delete("/:id", requireToken, deleteService);

export default router;
