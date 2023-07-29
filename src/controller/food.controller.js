const foodModel = require("../model/food.model");
const { response, responseError } = require("../helper/response");
const clientRedis = require("../config/redis");
const jwt = require("jsonwebtoken");
// const fs = require("fs-extra");
const cloudinary = require("../helper/cloudinary");

const foodController = {
  // Get Data
  list: (req, res) => {
    foodModel
      .selectAll()
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  listLike: (req, res) => {
    foodModel
      .selectAllOrder()
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  listAllById: async (req, res) => {
    const token = req.cookies.refreshToken;
    const user = jwt.decode(token, { complete: true });
    const user_id = user.payload.userId;

    foodModel
      .selectAllById(user_id)
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  listById: (req, res) => {
    const id = req.params.id;

    foodModel
      .selectById(id)
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  add: async (req, res) => {
    // const token = req.cookies.refreshToken;
    // const user = jwt.decode(token, { complete: true });
    // console.log(token);
    // console.log(user);
    // const user_id = user.payload.userId;
    const images = await cloudinary.uploader.upload(req.file.path);
    const image = images.url;
    console.log(image);
    const { user_id, name, ingredients, video } = req.body;
    const data = { user_id, name, ingredients, image, video };

    try {
      await foodModel.insert(data);
      res.status(201).json({ msg: "add data succes", data });
    } catch (error) {
      console.log({ msg: "add data gagal", error });
    }
  },

  edit: async (req, res) => {
    const id = req.params.id;
    const { name, ingredients, video } = req.body;
    const images = await cloudinary.uploader.upload(req.file.path);
    const image = images.url;
    // if (req.file) {
    //   // your code
    //   console.log(req.body.file);
    // }
    const data = { name, ingredients, image, video };
    // console.log(req.body.file);
    try {
      foodModel.update(id, data);
      res.status(200).json({ msg: "resep berhasil diperbarui", data });
    } catch (error) {
      res.status(500).json({ msg: "server error", error });
    }
  },

  remove: (req, res) => {
    const id = req.params.id;

    const body = req.body;
    // fs.unlinkSync(`${id}`);
    const data = { id, body };
    foodModel
      .cut(data)
      .then((result) => {
        res.json({ messasge: "DELETE DATA SUCCES", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  search: (req, res) => {
    const name = req.params.name;
    const body = req.body;
    const data = { name, body };
    foodModel
      .searchByName(data)
      .then((result) => {
        res.json({ messasge: "SEARCH BY NAME", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  sort: (req, res) => {
    foodModel
      .sortByNameAsc()
      .then((result) => {
        res.json({ messasge: "SEARCH BY NAME", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getById: (req, res) => {
    const id = req.params.id;
    foodModel
      .selectById(id)
      .then((result) => {
        const dataRedis = clientRedis.set(
          `getFromRedis/${id}`,
          JSON.stringify(result),
          {
            EX: 180,
            NX: true,
          }
        );
        res.send({
          fromCache: false,
          data: dataRedis,
        });
      })
      .catch((err) => {
        responseError(res, err.messasge, 400, "get id failed");
      });
  },

  paginate: (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    // total page and data
    // const allData = await userModel;
    // const totalData = Number()
    foodModel
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

module.exports = foodController;
