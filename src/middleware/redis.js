const client = require("../config/redis");

const hitProductAll = async (req, res, next) => {
  const idProduct = req.params.id;
  let result;
  try {
    const product = await client.get(`getFromRedis/${idProduct}`);
    console.log(product);
    if (product) {
      result = JSON.parse(product);
      res.send({
        fromCache: true,
        data: result,
      });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(404);
  }
};

module.exports = {
  hitProductAll,
};
