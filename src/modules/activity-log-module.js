const { ObjectId } = require("mongodb");
let config = require("../config/config");
let server = require("../config/db");
const ObjectID = require("mongodb").ObjectID;

const {
  NEW_ASSIGNMENT_CREATED,
  ASSIGNMENT_COMPLETED,
  NEW_INVOICE_CREATED,
  INVOICE_PAID,
  NEW_USER_ADDED,
} = config.log;

module.exports = {
  view_activity_log: (log_data, callBack) => {
    try {
      server
        .collection(config.collection.ACTIVITY_LOG)
        .find({organization_id: log_data.user_details.organization_id})
        .sort({ created_on: -1 })
        .limit(5)
        .toArray((err, results) => {
          if (err) {
            callBack(false, config.response.FAILED, err);
          } else {
            callBack(
              true,
              results.length + " " + config.response.FOUND,
              results
            );
          }
        });
    } catch (error) {
      callBack(true, config.response.FAILED, error);
    }
  }
};
