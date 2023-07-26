// const multer = require("multer");
// const path = require("path");

// const multerUpload = multer({
//   storage: multer.diskStorage({
//     // destination: (req, file, cb) => {
//     //   cb(null, "./public");
//     // },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       // const filename = ext.url;
//       cb(null, file.originalname);
//     },
//   }),

//   fileFilter: (req, file, cb) => {
//     // const ext = path.extname(file.originalname);
//     // if (ext == ".png" || ext == ".jpg") {
//     //   cb(null, true);
//     // } else {
//     //   const error = {
//     //     messasge: "file must be JPG or PNG",
//     //   };
//     //   cb(error, false);
//     // }
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });

// const upload = multer({ storage: multerUpload });

// const upload = (req, res, next) => {
//   multerUpload: multerUpload;
//   multerSingle(req, res, (err) => {
//     if (err) {
//       res.json({ messasge: "error when upload file", err });
//     } else {
//       next();
//     }
//   });
// };

// module.exports = upload;

// const multer = require("multer");
// const path = require("path");
// // Multer config
// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("Unsupported file type!"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

// const multer = require("multer");
// const path = require("path");

// const multerUpload = multer({
//   storage: multer.diskStorage({
//     // destination: (req, file, cb) => {
//     //   cb(null, "./public");
//     // },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const filename = `${ext}`;
//       cb(null, filename);
//     },
//   }),

//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext == ".png" || ext == ".jpg") {
//       cb(null, true);
//     } else {
//       const error = {
//         messasge: "file must be JPG or PNG",
//       };
//       cb(error, false);
//     }
//   },
// });

// const upload = (req, res, next) => {
//   const multerSingle = multerUpload.single("image");
//   multerSingle(req, res, (err) => {
//     if (err) {
//       res.json({ messasge: "error when upload file", err });
//     } else {
//       next();
//     }
//   });
// };

// module.exports = upload;

const multer = require("multer");
const path = require("path");

const maxSize = 1024 * 1024;

const multerUpload = multer({
  storage: multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "./public");
    // },
    filename: (req, file, cb) => {
      console.log(file.name);
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
    limits: maxSize,
  }),

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".png" || ext == ".jpg") {
      cb(null, true);
    } else {
      const error = {
        messasge: "file must be JPG or PNG",
      };
      cb(error, false);
    }
  },
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("image");
  multerSingle(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({ messasge: "error when upload file", err });
    } else {
      next();
    }
  });
};

module.exports = upload;
