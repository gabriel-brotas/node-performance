import { Router } from "express";
import { Product } from "./db/index.js";
export const v2 = Router()

v2.get("/products", (req, res) => {
    const { limit = 10, skip = 0 } = req.query
    Product.find({})
        .limit(limit)
        .skip(skip) 
        .populate('category')
        .exec((err, results) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).json({success: true, products: results})
            }
        });
    
})

v2.get("/products-formated", (req, res) => {
    const { limit = 100, skip = 0 } = req.query
    Product.find({})
        .limit(limit)
        .skip(skip) 
        .populate('category')
        .exec((err, results) => {
            if (err) {
                console.log(err)
            } else {
                const products = [...results]
                for(const p in products) {
                    for(let i = 0; i < 100; i++) {// simulate diferent data to aggregate
                        products[p] = {
                            _id: products[p]._id,
                            name: products[p].name,
                            slug: String(products[p].name).split(" ").join("").toLowerCase().split("").join("-"),
                            price: String(products[p].price).padStart(8, "R$ "),
                            category: products[p].category
                        }
                        // console.log(products[p])
                    } 
                }

                return res.status(200).json({success: true, products: products})
            }
        });
    
})






import Redis from "ioredis";

const redis = new Redis({
    port: 6379, 
    host: "redis",
    db: 0
});

v2.get("/products-faster", (req, res) => {
    const { limit = 10, skip = 0 } = req.query
    Product.find({})
        .limit(limit)
        .skip(skip) 
        .populate('category')
        .exec(async (err, results) => {
            if (err) {
                console.log(err)
            } else {
                const products_in_cache = await redis.get(`products:${limit}:${skip}`)

                if(products_in_cache) {
                    return res.status(200).json({success: true, products: JSON.parse(products_in_cache)})    
                }

                await redis.set(`products`, JSON.stringify(results));

                return res.status(200).json({success: true, products: results})
            }
        });
    
})