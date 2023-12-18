const express = require("express");
const app = express();
const students = require("./routers/students");
const users = require("./routers/users");
const checkAuth = require("./middleware");
const fileUpload = require("express-fileupload");
const {uploadFile} = require("@uploadcare/upload-client");


const port = 3000;

app.use(express.static("files"));
app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);


app.post("/upload", function (req, res) {
  req.files.foo.mv(`files/${req.files.foo.name}`, (err) => {
    if (!err) res.send("File uploaded");
    else res.send({ err });
  });
});

app.post("/v2/upload", async function (req, res) {
  const result = await uploadFile(req.files.foo.data, {
    publicKey: process.env.PUBLICKEY,
    store: "auto",
    metadata: {
      subsystem: "uploader",
      pet: "cat",
    },
  });

  res.send(result);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.use("/api/v1/students", checkAuth, students);
app.use("/api/v1/users", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
