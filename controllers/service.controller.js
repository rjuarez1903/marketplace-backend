import { Service } from "../models/Service.js";
import { validateAllowedUpdates } from "../utils/validateAllowedUpdates.js";
import { findServiceAndCheckOwnership } from "../utils/findServiceAndCheckOwnership.js";
import { handleErrorResponse } from "../utils/handleErrorResponse.js";
import  { validateCategory } from "../utils/validateCategory.js";

export const getAllServices = async (req, res) => {
  try {
    const category = req.query.category || "all"
    if (category !== "all" && !validateCategory(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }
    const query = category === "all" ? {} : { category };
    const services = await Service.find(query).lean();
    return res.json({ services });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getServicesByUser = async (req, res) => {
  try {
    const services = await Service.find({ userId: req.userId }).lean();
    return res.json({ services });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createService = async (req, res) => {
  try {
    const service = await Service.create({
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
    const service = await Service.findById(req.params.id).lean();
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    return res.json({ service });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateService = async (req, res) => {
  try {
    const allowedUpdates = [
      "name",
      "description",
      "category",
      "frequency",
      "cost",
      "type",
    ];
    const service = await findServiceAndCheckOwnership(
      req.params.id,
      req.userId
    );
    const updates = Object.keys(req.body);
    if (!validateAllowedUpdates(allowedUpdates, updates)) {
      return res.status(400).json({ message: "Invalid updates" });
    }
    allowedUpdates.forEach((update) => {
      service[update] = req.body[update];
    });
    await service.save();
    return res.json({ service });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await findServiceAndCheckOwnership(
      req.params.id,
      req.userId
    );
    await service.deleteOne();
    return res.status(204).send();
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
