const response = (res, result, status, message) => {
  const resultPrint = {};

  resultPrint.status = "succes";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  res.status(status).json(resultPrint);
};
const responseError = (res, result, status, message) => {
  const resultPrint = {};

  resultPrint.status = "gagal";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  res.status(status).json(resultPrint);
};

module.exports = { response, responseError };
