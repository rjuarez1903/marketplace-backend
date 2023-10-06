import { ServiceContract } from "../models/ServiceContract.js";
import { Service } from "../models/Service.js";
import { handleErrorResponse } from "../utils/handleErrorResponse.js";

export const getContractsByServiceId = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId).lean();
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    const contracts = await ServiceContract.find({
      serviceId: req.params.serviceId,
    }).lean();
    return res.json({ contracts });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getContractsByUser = async (req, res) => {
  try {
    const contracts = await ServiceContract.find({ userId: req.userId }).lean();
    const contractsWithServiceInfo = await Promise.all(
      contracts.map(async (contract) => {
        const service = await Service.findById(contract.serviceId).lean();
        contract.serviceName = service.name; 
        return contract;
      })
    );
    return res.json({ contracts: contractsWithServiceInfo });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};


export const createContract = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId).lean();
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    const { userId } = service;
    const contract = await ServiceContract.create({
      ...req.body,
      userId: userId.toString(),
      serviceId: req.params.serviceId,
    });
    return res
      .status(201)
      .location(`/contracts/${contract._id}`)
      .json({ contract });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateContract = async (req, res) => {
  try {
    const contract = await ServiceContract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }
    const { serviceId } = contract;
    const service = await Service.findById(serviceId).lean();
    const { userId } = service;
    if (userId.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized to update this contract",
      });
    }
    const { contractStatus } = req.body;
    contract.contractStatus = contractStatus;
    await contract.save();
    return res.json({ contract });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
