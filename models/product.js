const mongoose = require("mongoose")
const Schema = mongoose.Schema
const productSchema = new Schema(
    {
        Product_Region: {
            country: {type: String},
            language: {type: String}
          },
          product_Detail: {
            name: {type: String},
            SKU:{type: String},
            Status: {type: Boolean},
            Quantity: {type: Number},
            category: {type: String},
            is_new:  {type: Boolean},
            is_featured:  {type: Boolean},
            visible_individually: {type: Boolean}
          },
          manufacturer: {
            brand: {type: String},
            country_origin: {type: String}
          },
          description: {
            short_description: {type: String},
            description: {type: String}
          },
          price: {
            price:{type: Number},
            cost: {type: Number},
            special_price: {type: Number},
            special_price_from: {type: Date},
            special_price_to: {type: Date}
          },
          images: {type: String},
          videos: {type: String},
          seo: {
            meta_title: {type: String},
            meta_description:{type: String},
            meta_keywords: {type: String}
          }
    },
    {
      timestamps: false,
      collection: "product",
    }
  );
  module.exports = mongoose.model("Product", productSchema);

