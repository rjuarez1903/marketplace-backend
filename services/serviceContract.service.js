import { ServiceContract } from '../models/ServiceContract.js';
import { Service } from '../models/Service.js';

export const findServiceById = async (serviceId) => {
  return await Service.findById(serviceId).lean();
};

export const findContractsByServiceId = async (serviceId) => {
  return await ServiceContract.find({ serviceId }).lean();
};

export const findContractsByUserId = async (userId) => {
  return await ServiceContract.find({ userId }).lean();
};

export const createNewContract = async (contractData) => {
  return await ServiceContract.create(contractData);
};

export const findContractByIdAndUpdate = async (contractId, updateData) => {
  const contract = await ServiceContract.findById(contractId);
  Object.assign(contract, updateData);
  await contract.save();
  return contract;
};

export const attachServiceNameToContracts = async (contracts) => {
  return Promise.all(contracts.map(async (contract) => {
    const service = await Service.findById(contract.serviceId).lean();
    contract.serviceName = service ? service.name : 'Unknown'; 
    return contract;
  }));
};
