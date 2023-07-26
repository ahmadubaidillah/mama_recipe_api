// query database

const db = require("../config/db");

const userModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM users `, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM users where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  insert: ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into users (name,email,password) values ('${name}','${email}','${password}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  update: (id, name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update users set name='${name}', updated_at = now() where id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  uploadImage: (image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into users (image) values ('${image}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  updatePhoto: (id, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET image = '${image}' WHERE id = '${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  cut: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from users where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  loginUser: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where email='${email}' `, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  updateToken: (token) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where email='${token}'`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  findByToken: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where refresh_token='${token}'`,
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
        `select * from users limit ${limit} offset ${offset}`,
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

module.exports = userModel;
