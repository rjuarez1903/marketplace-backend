export const handleErrorResponse = (res, error) => {
  console.log(error);
  if (error.message === "Servicio no encontrado") {
    return res.status(404).json({
      message: error.message,
    });
  } else if (error.message === "El servicio no pertenece al usuario") {
    return res.status(403).json({
      message: error.message,
    });
  } else if (error.kind === "ObjectId") {
    return res.status(400).json({
      message: "Formato de ID inválido",
    });
  } else {
    return res.status(500).json({
      message: "Error del servidor",
    });
  }
};
