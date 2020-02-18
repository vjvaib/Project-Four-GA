const express = require("express");
const app = express();
const baodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const projectlistRoutes = express.Router();
const PORT = 5000;


//bring in model here
let projectlist = require("./projectlist.model");

//adding middleware
app.use(cors());
app.use(baodyparser.json());

//coonect to mongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/projectlist", {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB connected");
});

//first endpoints
projectlistRoutes.route("/").get(function(req, res) {
  projectlist.find(function(err, projectlist) {
    if (err) {
      console.log(err);
    } else {
      res.json(projectlist);
    }
  });
});

projectlistRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  projectlist.findById(id, function(err, projectlist) {
    res.json(projectlist);
  });
});

//post request
projectlistRoutes.route("/add").post(function(req, res) {
  let projectlist = new projectlist(req.body);
  projectlist
    .save()
    .then(projectlist => {
      res.status(200).json({ projectlist: "projectlist added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new project failed");
    });
});

// update route
projectlistRoutes.route("/update/:id").post(function(req, res) {
  projectlist.findById(req.params.id, function(err, projectlist) {
    if (!projectlist) res.status(404).send("data is not found");
    else 
    projectlist.projectlist_description = req.body.projectlist_description;
    projectlist.projectlist_CRMNumber = req.body.projectlist_CRMNumber;
    projectlist.projectlist_sponsor= req.body.projectlist_sponsor;
    projectlist.projectlist_Level= req.body.projectlist_Level;
    projectlist.projectlist_DueDate= req.body.projectlist_DueDate;
    projectlist.projectlist_completed= req.body.projectlist_completed;

    projectlist.save().then(projectlist => {

      res.json('projetlist updated');
    })
    .catch(err => {
      res.status(400).send("update noyt possible");
    });


  });
});

//insert router
app.use("/projectlist", projectlistRoutes);

//start server
app.listen(PORT, function() {
  console.log("server is running" + PORT);
});

