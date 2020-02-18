const mongoose = require("mongoose");
//const schema = mongoose.Schema;

let ProjectList = new mongoose.Schema({
  projectlist_description: {
    type: String
  },
  projectlist_CRMNumber: {
    type: String
  },
  projectlist_sponsor: {
    type: String
  },
  projectlist_Level: {
    type: Number
  },
  projectlist_DueDate: {
    type: Date
  },
  projectlist_completed: {
    type: Boolean
  }
});

module.exports = mongoose.model("ProjectList", ProjectList);
