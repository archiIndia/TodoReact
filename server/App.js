const express = require("express");
const { default: mongoose } = require("mongoose");
const mango = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todos");
const PORT = 550;
const expressHTTPServer = express();
expressHTTPServer.listen(PORT);

mongoose.connect("mongodb://localhost:27017/doc1");

expressHTTPServer.use(cors());
expressHTTPServer.use(express.json());
expressHTTPServer.post("/add_todo", async function (req, res) {
  // const req_t = {
  //   body: {
  //     task: "ewew",
  //     name: "Ar",
  //   },
  // };

  // https://some.com/user?id="archi"&role=2&active=true

  const task = req.body.task;
  const priority = req.body.pro;
  const description = req.body.des;

  // request ->  server-> stream-> access stream ->
  //write to stream -> close and send back data-> stream closed

  try {
    // create a new task and store it into "product" var.
    const product = await TodoModel.create({
      task: task,
      priority: priority,
      description,
      status: "A",
    });
    const found_product = await TodoModel.findOne({ _id: product._id });
    // send back the product to browser as json.
    res.status(201).json(found_product);
  } catch (error) {
    res.status(404).json(error);
  }
});

expressHTTPServer.get("/getall", async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({status:"A"});
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(404).json(error);
  }
});

expressHTTPServer.delete("/del/:todoid", async (req, res) => {
  try {
    const abc = req.params.todoid;
    const deleteTodo = await TodoModel.findOneAndUpdate(
      // search/filter param
      { _id: abc },
      // update body
      {
        status: "D",
      }
    );
    res.status(201).json(deleteTodo);
  } catch (error) {
    res.status(404).json(error);
  }
});
