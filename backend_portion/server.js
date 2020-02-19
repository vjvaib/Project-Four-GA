const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const projectlistRoutes = express.Router();
const PORT = 5000;

//bring in model here
let ProjectList = require("./projectlist.model");

//adding middleware
app.use(cors());
app.use(bodyparser.json());

//coonect to mongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/projectlist", {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB connected");
});

//first endpoints , get request
projectlistRoutes.route("/").get(function(req, res) {
  ProjectList.find(function(err, listItem) {
    if (err) {
      console.log(err);
    } else {
      res.json(listItem);
    }
  });
});

projectlistRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  ProjectList.findById(id, function(err, listItem) {
    res.json(listItem);
  });
});

//add request
projectlistRoutes.route("/add").post(function(req, res) {
  let plist = new ProjectList(req.body);
  plist
    .save()
    .then(list => {
      res.status(200).json({ list: "projectlist added successfully" });
    })
    .catch(err => {
      console.log("error", err);
      res.status(400).send("adding new project failed");
    });
});

// update route
projectlistRoutes.route("/update/:id").post(function(req, res) {
  ProjectList.findById(req.params.id, function(err, listItem) {
    if (!listItem) res.status(404).send("data is not found");
    else 
      listItem.projectlist_description = req.body.projectlist_description;
      listItem.projectlist_CRMNumber = req.body.projectlist_CRMNumber;
      listItem.projectlist_sponsor = req.body.projectlist_sponsor;
      listItem.projectlist_Level = req.body.projectlist_Level;
      listItem.projectlist_DueDate = req.body.projectlist_DueDate;
      listItem.projectlist_completed = req.body.projectlist_completed;
    

    listItem.save()
      .then(listItem => {
        res.json("projectlist updated");
      })
      .catch(err => {
        res.status(400).send("update not possible");
      });
  });
});

//insert router
app.use("/projectlist", projectlistRoutes);

//start server
app.listen(PORT, function() {
  console.log("server is running" + PORT);
});
