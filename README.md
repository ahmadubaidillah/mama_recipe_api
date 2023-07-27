# Mama Recipe API


This is the API of the Mama Recipe project -> [Mama Recipe](https://github.com/ahmadubaidillah/mama_recipe_fe)

## Technologies

![AGPL License](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![AGPL License](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![AGPL License](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

If you clone this repo don't forget to install node modules / packages inside the project :

```
  npm install
```

And to run this project use

```bash
  npm run start
```


## API Reference

#### Get all users 📄

```
  GET  /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| | `string` | You can check all users from ur DB |


#### Get specific user

```
  GET /getusers/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Have Id of spesific user |

#### Login

```
  POST /user_login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | `string` |try login with valid credentials |

#### Register

```
  POST /user_register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | `string` |try register to have an account |


You can check the rest in repo folder ...


## Author
[ahmadubaidillah](https://github.com/ahmadubaidillah) 
