```sh
npx autocannon -c 10 -d 10 -l --renderStatusCodes --warmup [ -c 1 -d 3 ] http://localhost:3000/health

npx autocannon -c 10 -d 10 -l --renderStatusCodes --warmup [ -c 1 -d 3 ] http://localhost:3000/v1/products 

npx autocannon -c 10 -d 10 -l --renderStatusCodes --warmup [ -c 1 -d 3 ] http://localhost:3000/v2/products-formated

npx autocannon -c 500 -d 10 -l --renderStatusCodes --warmup [ -c 1 -d 3 ] http://localhost:3000/v2/products-formated
```