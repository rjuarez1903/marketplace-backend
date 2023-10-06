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

// GET      /api/v1/serviceContracts/:serviceId     all contracts of a service
// GET      /api/v1/serviceContracts/:userId        all contracts of a user
// POST     /api/v1/serviceContracts/:serviceId     create contract
// PATCH    /api/v1/serviceContracts/:id            update contract

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
