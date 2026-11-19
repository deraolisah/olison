export function notFound(req, res, next) {
  res.status(404).json({ message: `Not found - ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error("❌", err.message);

  let status = err.status || 500;
  let message = err.message || "Server error";

  if (err.name === "CastError") {
    status = 400;
    message = "Invalid id format";
  }
  if (err.code === 11000) {
    status = 400;
    message = "Duplicate field value";
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}