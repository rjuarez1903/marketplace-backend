// service.controller.js

import * as ServiceService from "../services/service.service.js";
import { handleErrorResponse } from "../utils/handleErrorResponse.js";
import { validateAllowedUpdates } from "../utils/validateAllowedUpdates.js";

export const getAllServices = async (req, res) => {
  try {
    const category = req.query.category || "all";
    if (!ServiceService.validateCategory(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }
    const services = await ServiceService.findAllServices(category);
    return res.json({ services });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getServicesByUser = async (req, res) => {
  try {
    const services = await ServiceService.findServicesByUserId(req.userId);
    return res.json({ services });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createService = async (req, res) => {
  try {
    const service = await ServiceService.createNewService({
      ...req.body,
      userId: req.userId,
      averageRating: 0,
      totalRatings: 0,
      sumOfRatings: 0,
    });
    return res
      .status(201)
      .location(`/services/${service._id}`)
      .json({ service });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await ServiceService.findServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.json({ service });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateService = async (req, res) => {
  const allowedUpdates = [
    "name",
    "description",
    "category",
    "frequency",
    "cost",
    "type",
    "duration",
    "isPublished"
  ];
  const updates = Object.keys(req.body);
  if (!validateAllowedUpdates(allowedUpdates, updates)) {
    return res.status(400).json({ message: "Invalid update" });
  }
  try {
    const service = await ServiceService.updateExistingService(
      req.params.id,
      req.userId,
      req.body
    );
    return res.json({ service });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const deleteService = async (req, res) => {
  try {
    await ServiceService.removeService(req.params.id, req.userId);
    return res.status(204).send();
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
