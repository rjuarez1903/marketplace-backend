export const handleErrorResponse = (res, error) => {
  console.log(error);
  if (error.message === "Service not found") {
    return res.status(404).json({
      message: error.message,
    });
  } else if (error.message === "Service does not belong to user") {
    return res.status(403).json({
      message: error.message,
    });
  } else if (error.kind === "ObjectId") {
    return res.status(400).json({
      message: "Invalid service id format",
    });
  } else {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
