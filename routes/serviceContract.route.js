import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import {
  getContractsByServiceId,
  getContractsByUser,
  createContract,
  updateContract,
} from "../controllers/serviceContract.controller.js";
import {
  createServiceContractBodyValidator,
  updateServiceContractBodyValidator,
} from "../middlewares/validationResultExpress.js";

const router = Router();

router.get("/user", requireToken, getContractsByUser);
router.get("/:serviceId", getContractsByServiceId);
router.post("/:serviceId", createServiceContractBodyValidator, createContract);
router.patch(
  "/:id",
  requireToken,
  updateServiceContractBodyValidator,
  updateContract
);

export default router;
