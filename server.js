const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.PORT || 3000;

//DB CONNECTION
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quizapp",
});
const a = (err) => {
  if (!err) console.log("DB connection succeeded.");
  else
    console.log(
      "DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
};
mysqlConnection.connect(a);

app.set("view engine", "ejs");
app.use(express.json());

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/result", (req, res) => {
  res.render("result");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});

//Quiz
app.get("/index/data", (req, res) => {
  mysqlConnection.query("SELECT * FROM quiz", (err, rows) => {
    if (!err) {
      console.log("Success");
      res.send(rows);
    } else console.log(err);
  });
});

//userDatabase for Post
function sendData(req, res) {
  console.log(req.body);
  const data = req.body;
  mysqlConnection.query(
    `INSERT INTO criteria (useroption,correctOption) VALUES ("${data.useroption}","${data.correctOption}")`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
}
app.post("/process/data", sendData);

//POST
function B(req, res) {
  console.log(req.body);
  const data = req.body;
  mysqlConnection.query(
    `INSERT INTO quiz (question,option1,option2,option3,option4,correct) VALUES ("${data.question}","${data.option1}","${data.option2}","${data.option3}","${data.option4}","${data.correct}")`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
}


app.post("/transfer", B);

app.listen(PORT, console.log(`Server is Running on Port ${PORT}`));
