import { Service } from "../models/Service.js";

export const findServiceAndCheckOwnership = async (serviceId, userId) => {
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new Error("Service not found");
  }

  if (service.userId.toString() !== userId) {
    throw new Error("Service does not belong to user");
  }

  return service;
};
