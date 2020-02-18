const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let projectlist = new Schema({
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
    type: Number
  },
  projectlist_completed: {
    type: Boolean
  }
});

module.exports = mongoose.model("projectlist", projectlist);
