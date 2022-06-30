How to run project

step 1:

```sh
clone project
```

step 2:

```sh
npm install
```

step 3:

```sh
npm start
```
```sh
POST: { "mail": "mail@gmail.com", "password": "passtesss" }
http://localhost:5000/api/v1/user/login
```
```sh
DELETE
http://localhost:5000/api/v1/user/delete/id
```
```sh
POST: { "mail": "mail@gmail.com", "password": "passtesss", "nameUser": "ewrwe" }
http://localhost:5000/api/v1/user/register
```
```sh
POST: nhét vào header: Authorization: token
http://localhost:5000/api/v1/user/refreshtoken
```
```sh
GET
http://localhost:5000/api/v1/posts
```

```sh
đây là tìm kiếm theo tên hoá đơn trong bảng post
GET: nhét vào header: Authorization: token
http://localhost:5000/api/v1/posts/searchs/quyết
