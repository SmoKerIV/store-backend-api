const express = require("express");
const app = express();
const dashboard = require("./routers/dashboard");
const client = require("./routers/client");
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
  res.send("Welcome to our store!");
});


app.use("/api/dashboard", dashboard);
app.use("/api/client", client);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
