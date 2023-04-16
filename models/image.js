const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ImageSchema = new Schema(
    {
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
        collection: "image"
    }
);
module.exports = mongoose.model("Images", ImageSchema);
