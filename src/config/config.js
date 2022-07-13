require("dotenv").config({ path: "../../.env" });

module.exports = {
  PORT: process.env.PORT || 8002,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET: "5e3d7db17478a1024a3977dd",
  DATABASE:
    "mongodb+srv://gstuser:n03ntry428@cluster0-i3gc0.mongodb.net/cfo?retryWrites=true&w=majority",
  CC_EMAILS: process.env.cc_emails,
  collection: {
    USER: "users",
    CLIENT: "client",
    AUDIT: "audit",
    ORGANISATION: "organisation",
    AUDIT_TYPE: "audit_type_master",
    USER_TYPE: "user_type_master",
    CHECKLIST_MASTER: "checklist_master",
    CHECKLIST: "checklist",
    INVOICE: "invoices",
    ACTIVITY_LOG: "activity_log",
  },
  response: {
    FAILED: "Error occured. Try again.",
    WARNING: "Some warning",
    ADD: "Data added successfully.",
    EDIT: "Data updated successfully.",
    DELETE: "Data deleted successfully.",
    FOUND: "Data(s) found.",
    NOT_FOUND: "No data found.",
    UPLOAD_SUCCESS: "Media uploaded successfully.",
    UPLOAD_ERROR: "Error occurred while uploading the media.",
    FILEUPLOADERROR: "Error while uploading the file",
    INVALID_USER: "Invalid user",
    ERROR_VALIDATING_USER: "Error validating user",
    PASSWORD_CHANGED: "Password changed.",

    LOGIN_SUCCESS: "Login successful",
    LOGIN_FAIL: "Login failed",
    USER_EXIST: "User already exists",
    USER_NOT_EXISTS: "User doesn't exists.",
    LOGOUT: "Logged Out successfully.",
    WRONG: "Something went wrong.",
    USER_FOUND: "User(s) found.",
    USER_NOT_FOUND: "User not found.",
    WRONG_PASSWORD: "Password doesn't match.",
  },
  email: {
    info: "noreply@taskdu.in",
    type: {
      ADD_NEW_USER: "ADD_NEW_USER",
      ASSIGN_EXISTING_MEMBER: "ASSIGN_EXISTING_MEMBER",
      SIGNUP: "SIGNUP",
      FORGOT_PASSWORD: "FORGOT_PASSWORD",
      VERIFY_EMAIL: "VERIFY_EMAIL"
    },
  },
  folder_names: {
    ASSESSMENT: "Assessments",
    ESG_STRATEGY: "ESG_STRATEGY",
    REPORTS: "Reports",
    ASSESSMENT_TOPICS: "assessment_topics",
    LOGO: "logo",
    PROFILE_PICTURE: "profile_picture",
  },
  aws_config: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
    private_bucket: process.env.PRIVATE_BUCKET,
    public_bucket: process.env.PUBLIC_BUCKET,
  },
  log: {
    NEW_ASSIGNMENT_CREATED: "New assignment created: ",
    ASSIGNMENT_COMPLETED: " assignment completed.",
    NEW_INVOICE_CREATED: "New invoice created: ",
    INVOICE_PAID: " invoice is paid.",
    NEW_USER_ADDED: "New user is added: ",
  }
};