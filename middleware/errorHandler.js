const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.status(statusCode).json({
        status: "fail",
        title: "validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 401:
      res.status(statusCode).json({
        status: "fail",
        title: "unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 403:
      res.status(statusCode).json({
        status: "fail",
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 404:
      res.status(statusCode).json({
        status: "fail",
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 500:
      res.status(statusCode).json({
        status: "error",
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
