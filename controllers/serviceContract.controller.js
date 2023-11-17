import * as ServiceContractService from '../services/serviceContract.service.js';
import { handleErrorResponse } from "../utils/handleErrorResponse.js";

export const getContractsByServiceId = async (req, res) => {
  try {
    const service = await ServiceContractService.findServiceById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    const contracts = await ServiceContractService.findContractsByServiceId(req.params.serviceId);
    return res.json({ contracts });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getContractsByUser = async (req, res) => {
  try {
    const contracts = await ServiceContractService.findContractsByUserId(req.userId);
    const contractsWithServiceInfo = await ServiceContractService.attachServiceNameToContracts(contracts);
    return res.json({ contracts: contractsWithServiceInfo });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createContract = async (req, res) => {
  try {
    const service = await ServiceContractService.findServiceById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    const contract = await ServiceContractService.createNewContract({
      ...req.body,
      userId: service.userId.toString(),
      serviceId: req.params.serviceId,
    });
    return res.status(201).location(`/contracts/${contract._id}`).json({ contract });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateContract = async (req, res) => {
  try {
    const contract = await ServiceContractService.findContractByIdAndUpdate(req.params.id, { contractStatus: req.body.contractStatus });
    if (!contract) {
      return res.status(404).json({ message: "Contratación no encontrada" });
    }
    const service = await ServiceContractService.findServiceById(contract.serviceId);
    if (!service || service.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "No autorizado para actualizar esta contratación" });
    }
    return res.json({ contract });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
