import { Router } from "express";
import { Product } from "./db/index.js";

export const v1 = Router()

v1.get("/products", (req, res) => {
    Product.find({})
        .populate('category')
        .exec((err, results) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).json({success: true, products: results})
            }
        });
})