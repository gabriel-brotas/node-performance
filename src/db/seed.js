import { Product, Category } from './schemas.js';

export async function seed(categories_amount = 3, products_amount = 10 ) {
    const categories = [];

    for(let i = 1; i <= categories_amount; i++) {
        categories.push({ name: `Category ${i}` })
    }

    Category.create(categories, (error) => {
        if (error) {
            throw error;
        }
        console.log('Seeded database with categories.');

        Category.find({}).exec((err, results) => {
            if (err) {
                console.log(err)
              // handle error
            } else {
                const products = []
                
                for(const c in results) {
                    for(let i = 1; i <= products_amount; i++) {
                        products.push({ 
                            name: `Product ${10 * c + i}`, 
                            price: (Math.random() * 50).toFixed(2),
                            category: results[c].id
                        })
                    }
                }
    
                Product.create(products, (error) => {
                  if (error) {
                        throw error;
                    }
                    console.log('Seeded database with products.');
                });
            }
          })
    });


}

export async function dropAll() {
    return new Promise((r) => {
        Product.deleteMany({}).exec((err, results) => {
            if (err) {
                console.log(err)
              // handle error
            } else {
                console.log("Deleted all Products successfully")
                Category.deleteMany({}).exec((err, results) => {
                    if (err) {
                        console.log(err)
                      // handle error
                    } else {
                        console.log("Deleted all Categories successfully")
                        r()
                    }
                })
            }
        })
    })

}

