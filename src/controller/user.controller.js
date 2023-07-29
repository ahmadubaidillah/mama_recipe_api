/* eslint-disable no-unused-vars */
const userModel = require("../model/user.model");
const { response } = require("../helper/response");
const { responseError } = require("../helper/response");
const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateSecret");
const jwt = require("jsonwebtoken");
const cloudinary = require("../helper/cloudinary");

const userController = {
  // Get Data
  list: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        response(res, err, 400, "data error");
      });
  },

  listById: (req, res) => {
    const id = req.params.id;
    userModel
      .selectById(id)
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        response(res, err, 400, "data error");
      });
  },

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.json({ message: "failed hash password" });
        }
        const data = { name, email, password: hash };
        userModel
          .insert(data)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    const { name } = req.body;
    const token = req.cookies.refreshToken;
    const user = jwt.decode(token, { complete: true });
    console.log(user);
    try {
      await userModel.update(user.payload.userId, name);
      res
        .status(200)
        .json({ msg: "berhasil memperbaharui profile", isUpdated: true });
    } catch (error) {
      res.status(400).json({ msg: "gagal memperbaharui profile", error });
      console.log(error);
    }
  },

  remove: (req, res) => {
    userModel
      .cut(req.body)
      .then((result) => {
        res.json({ messasge: "DELETE DATA SUCCES", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // login: async (req, res) => {
  //   const { email, password } = req.body;
  //   // const dataLogin = { email, password };
  //   userModel
  //     .loginUser(email)
  //     .then((data) => {
  //       // const userAuth = data.rows[0].level;
  //       // res.json({ messasge: "LOGIN SUCCES", result });
  //       if (data.rowCount > 0) {
  //         bcrypt
  //           .compare(password, data.rows[0].password)
  //           .then(async (result) => {
  //             if (result) {
  //               const token = await jwtToken({
  //                 email: result.rows,
  //                 // level: userAuth,
  //               });
  //               res.json({
  //                 message: "OK gaes",
  //                 token,
  //                 data: data.rows[0],
  //               });
  //             } else {
  //               res.json({ messasge: "gagal" });
  //             }
  //           });
  //       } else {
  //         res.json({
  //           messasge: "LOGIN GAGAL , EMAIL ATAU PASSWORD SALAH",
  //           data,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // res.json({ messasge: "LOGIN GAGAL", err });
  //     });
  // },

  // login: async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     await userModel.loginUser(email);
  //   } catch (error) {

  //   }

  // }

  login: async (req, res) => {
    const { password } = req.body;
    try {
      const user = await userModel.loginUser(req.body.email);
      // console.log(user);
      const match = await bcrypt.compare(password, user.rows[0].password);

      if (!match) return res.status(400).json({ msg: "password salah!" });
      console.log(user.rows[0]);
      const userId = user.rows[0].id;
      const name = user.rows[0].name;
      const email = user.rows[0].email;
      const image = user.rows[0].image;
      const accessToken = jwt.sign(
        { userId, name, email, image },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20s" }
      );
      const refreshToken = jwt.sign(
        { userId, name, email, image },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await userModel.updateToken(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,

        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });

      // res.status(200).json({ msg: "login berhasil", name, accessToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "email tidak ditemukan!", errors: error });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      const decode = jwt.decode(refreshToken, { complete: true });
      console.log(decode);
      const id = decode.payload.userId;
      if (!refreshToken) return res.sendStatus(401);
      const user = await userModel.selectById(id);
      if (!user) return res.sendStatus(403);

      console.log(user);
      console.log(user.email);

      if (!user) return res.sendStatus(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.sendStatus(403);
          const id = user.rows[0].id;
          const name = user.rows[0].name;
          const email = user.rows[0].email;
          const image = user.rows[0].image;
          // const { id, name, email, image } = user;
          const accessToken = jwt.sign(
            { id, name, email, image },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.json({ msg: "refresh token berhasil", accessToken });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  logout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(204);
      const user = await userModel.findByToken(refreshToken);
      if (!user) return res.sendStatus(204);

      const { id } = user;
      await userModel.updateToken(id, null);
      res.clearCookie("refreshToken");
      res.status(200).json({ msg: "berhasil logout" });
    } catch (error) {
      res.status(500).json({ msg: "server error", error });
    }
  },

  uploadPhoto: async (req, res) => {
    try {
      const token = req.cookies.refreshToken;

      const user = jwt.decode(token, { complete: true });
      console.log(user);
      const id = user.payload.userId;

      // const refreshToken = req.cookies.refreshToken;
      // if (!refreshToken) return res.sendStatus(401);

      // const user = await userModel.findByToken(refreshToken);
      // console.log(user);
      // if (!user) return res.sendStatus(204);
      // const { image } = user;
      // if (user.image !== "default") {
      //   const err = cloudinary.uploader.destroy(user.image);

      //   if (err) return res.sendStatus(204);
      // }

      const img = await cloudinary.uploader.upload(req.file.path);
      console.log(img);
      console.log(img.url);
      await userModel.updatePhoto(id, img.url);

      res.status(200).json({ msg: "upload photo berhasil", img });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  paginate: (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    // total page and data
    // const allData = await userModel;
    // const totalData = Number()
    userModel
      .paginate(limitValue, offsetValue)
      .then((result) => {
        const pagination = {
          currenPage: pageValue,
          dataperPage: limitValue,
        };
        res.json({
          message: "pagination succes",
          data: result.rows,
          result: pagination,
        });
      })
      .catch((err) => {
        responseError(res, err, 400, "data error");
      });
  },
};
module.exports = userController;
