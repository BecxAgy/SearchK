import { Schema, model, models } from "mongoose";

const DocumentSchema = new Schema({
  creator: {
    type: String,
    ref: "User",
  },
  escopo: {
    type: String,
    require: [true, "Document is required"],
  },
  tag: {
    type: String,
    require: [true, "Tag is required"],
  },
});

const Document = models.Document || model("Document", DocumentSchema);

export default Document;
