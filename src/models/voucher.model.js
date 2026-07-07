const mongoose = require("mongoose");
const { DISCOUNT_TYPE } = require("../constants/voucher.constant");

const voucherSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        discount_type: {
            type: String,
            enum: Object.values(DISCOUNT_TYPE),
            required: true
        },

        discount_value: {
            type: Number,
            required: true,
            min: 0
        },

        max_discount: {
            type: Number,
            default: null
        },

        min_order_value: {
            type: Number,
            default: 0
        },

        max_uses: {
            type: Number,
            default: null
        },

        max_uses_per_user: {
            type: Number,
            default: 1
        },

        used_count: {
            type: Number,
            default: 0
        },

        start_date: {
            type: Date,
            required: true
        },

        end_date: {
            type: Date,
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        },

        deletedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

voucherSchema.index({ deletedAt: 1 });

voucherSchema.pre(/^find/, function (next) {
    this.where({ deletedAt: null });
    next();
});

module.exports = mongoose.model("Voucher", voucherSchema);
