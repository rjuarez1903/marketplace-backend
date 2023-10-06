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

// GET      /api/v1/services          all services
// GET      /api/v1/services/user     all services of a user
// GET      /api/v1/services/:id      single service
// POST     /api/v1/services          create service
// PATCH    /api/v1/services/:id      update service
// DELETE   /api/v1/services/:id      delete service

router.get("/user", requireToken, getServicesByUser);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", requireToken, createServiceBodyValidator, createService);
router.patch("/:id", requireToken, createServiceBodyValidator, updateService);
router.delete("/:id", requireToken, deleteService);

export default router;
