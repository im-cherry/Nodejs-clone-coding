# Nodejs-clone-coding

노드제이에스 클론 코딩

## board-project

- board.ejs  
  ![board](https://user-images.githubusercontent.com/100753621/158659425-e56f9268-d825-42c0-bff2-b0d50abf56fc.png)
- write.ejs  
  ![write](https://user-images.githubusercontent.com/100753621/158659437-21abe4c1-d767-4199-bf5b-93faef075790.png)
- read.ejs  
  ![read](https://user-images.githubusercontent.com/100753621/158659457-13ae50f4-8952-40fb-b7ae-19840fdb8224.png)

> 기본적인 프로젝트 생성 방법
>
> ```bash
> $ express board-project  # 프로젝트 생성
> $ npm install
> $ npm install mysql
> $ node .\bin\www  # 프로젝트 실행
> ```

> ejs를 사용하는 프로젝트 생성 방법
>
> ```bash
> $ express --view=ejs board-project  # 프로젝트 생성
> $ npm install
> $ npm install mysql
> $ node .\bin\www  # 프로젝트 실행
> ```

**mysql 연결 방법**

> db_info.js
>
> ```javascript
> module.exports = (function () {
>   return {
>     local: {
>       host: "localhost",
>       port: "3306",
>       user: "root",
>       password: "1234",
>       database: "nodedb",
>     },
>     real: {
>       host: "",
>       port: "",
>       user: "",
>       password: "",
>       database: "",
>     },
>     staging: {
>       host: "",
>       port: "",
>       user: "",
>       password: "",
>       database: "",
>     },
>     dev: {
>       host: "",
>       port: "",
>       user: "",
>       password: "",
>       database: "",
>     },
>   };
> })();
> ```

> db_conn.js
>
> ```javascript
> var mysql = require("mysql");
> var config = mysql("./db_info").local();
>
> module.exports = function () {
>   return {
>     init: function () {
>       return mysql.createConnection({
>         host: config.host,
>         port: config.port,
>         user: config.user,
>         password: config.password,
>         database: config.database,
>       });
>     },
>   };
> };
> ```

> mysql 연결
>
> ```javascript
> var express = require("express");
> var router = express.Router();
> var mysql_odbc = require("../db/db_conn")();
> var conn = mysql_odbc.init();
> ```
