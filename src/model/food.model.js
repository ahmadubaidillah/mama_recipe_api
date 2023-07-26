// query database

const db = require("../config/db");

const foodModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT*FROM foods", (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectAllOrder: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM foods WHERE name LIKE 'c%'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectAllById: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT f.* FROM foods f LEFT JOIN users u ON f.user_id = u.id WHERE f.user_id = '${user_id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  insert: ({ user_id, name, ingredients, image, video }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into foods (  user_id ,name, ingredients, image, video ) values ('${user_id}','${name}','${ingredients}','${image}','${video}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  update: (id, { name, ingredients, image, video }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update foods set name='${name}', ingredients='${ingredients}', image='${image}', video='${video}', updated_at = now()  where id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  cut: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from foods where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  searchByName: ({ name }) => {
    return new Promise((resolve, reject) => {
      db.query(`select*from foods where name='${name}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  sortByNameAsc: () => {
    return new Promise((resolve, reject) => {
      db.query(`select*from foods order by name asc`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select f.* , u.refresh_token from foods f left join users u on f.user_id = u.id where f.id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  paginate: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from foods limit ${limit} offset ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = foodModel;
