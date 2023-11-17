import { Service } from "../models/Service.js";

export const findServiceAndCheckOwnership = async (serviceId, userId) => {
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new Error("Servicio no encontrado");
  }

  if (service.userId.toString() !== userId) {
    throw new Error("El servicio no pertenece al usuario");
  }

  return service;
};
