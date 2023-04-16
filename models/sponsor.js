const mongoose = require("mongoose");

const Schema = mongoose.Schema

const SponsorSchema = new Schema(
    {
        name: { type: String, unique: true },
        email: { type: String },
        phone: { type: String },
        funding: { type: String },
        address: {
            city: { type: String },
            street: { type: String },
            landmark: { type: String },
            state: { type: String },
            zip: { type: Number },
            country: { type: String }
        }
    },
    {
        timestamps: false,
        collection: "sponsor",
    }
);

module.exports = mongoose.model("Sponsor", SponsorSchema);