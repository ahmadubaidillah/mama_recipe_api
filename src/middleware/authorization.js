// const { responseError } = require("../helper/response");

// module.exports = {
//   isAdmin: (req, res, next) => {
//     if (req.APP_DATA.tokenDecode.level === 0) {
//       next();
//     } else {
//       responseError(res, null, 400, "User dont have access");
//     }
//   },

//   isCustomer: (req, res, next) => {
//     if (req.APP_DATA.tokenDecode.level === 1) {
//       next();
//     } else {
//       responseError(res, null, "User dont have access");
//     }
//   },
// };
