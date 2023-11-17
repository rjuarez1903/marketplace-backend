import { Service } from '../models/Service.js';
import { validateCategory as checkCategory } from '../utils/validateCategory.js';
import { findServiceAndCheckOwnership as checkOwnership } from '../utils/findServiceAndCheckOwnership.js';

export const findAllServices = async (category) => {
  const query = category === "all" ? {} : { category };
  return await Service.find(query).lean();
};

export const findServicesByUserId = async (userId) => {
  return await Service.find({ userId }).lean();
};

export const createNewService = async (serviceData) => {
  return await Service.create(serviceData);
};

export const findServiceById = async (id) => {
  return await Service.findById(id).lean();
};

export const updateExistingService = async (id, userId, updates) => {
  const service = await checkOwnership(id, userId);
  Object.keys(updates).forEach((update) => {
    service[update] = updates[update];
  });
  await service.save();
  return service;
};

export const removeService = async (id, userId) => {
  const service = await checkOwnership(id, userId);
  await service.deleteOne();
};

export const validateCategory = (category) => {
  return category === "all" || checkCategory(category);
};