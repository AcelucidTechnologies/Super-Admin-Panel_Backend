const mongoose= require('mongoose');
const Schema= mongoose.Schema

const permissionSchema = new Schema(
    {
        username: { type: String },
        moduleList:[String],
        CatalogCategory: {
            add: { type: Boolean },
            edit: { type: Boolean },
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        CatalogProduct:{
            add: { type: Boolean },
            edit: { type: Boolean },
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        CmsBanner:{
            add: { type: Boolean },
            edit: { type: Boolean },
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        MarketingCoupon:{
            add: { type: Boolean },
            edit: { type: Boolean },
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        MarketingRewards:{
            add: { type: Boolean },
            edit: { type: Boolean },
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        OrderList:{
            add: { type: Boolean },
            edit: { type: Boolean },
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        OrderShipment:{
            add: { type: Boolean },
            edit: { type: Boolean },
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        OrderTransaction:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        LeadList:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        AppointmentList:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        UserList:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        RatingList:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        ReviewList:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        ReviewerList:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        RatingSetting:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        },
        UsertypeSetting:{
            add:{ type:Boolean},
            edit:{ type:Boolean},
            view: { type: Boolean },
            delete: { type: Boolean }
        }
    },
    {
        timestamps: false,
        collection: "permission"
    }
)

module.exports = mongoose.model("Permission", permissionSchema);