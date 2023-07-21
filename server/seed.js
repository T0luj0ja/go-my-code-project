const {faker} = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;
const _ = require('lodash');

async function main(){
    const url = "mongodb://localhost://27017";
    const client = new MongoClient(url); //

    try {
        await client.connect();

        const productsCollection = client.db("food-ordering-app").collection("products")
        const categoriesCollection = client.db("food-ordering-app").collection("categories")

        productsCollection.drop();
        let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category)=>{return{name:category}});
        await categoriesCollection.insertMany(categories);

        let imageUrls = [
            'https://img.freepik.com/free-photo/delicious-fried-chicken-plate_144627-27383.jpg?w=1060&t=st=1689784876~exp=1689785476~hmac=b05e94c43299f0689a85c540d0a8707b6f5cdf98269cc43b51264f8f411f36b5',
            'https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?w=740&t=st=1689784928~exp=1689785528~hmac=1e073050bc612de167230664a3bb991e0530b4635da62b8df2b873ae704a1d28',
            'https://img.freepik.com/free-photo/fried-chicken-french-fries-white-plate_74190-4869.jpg?w=1060&t=st=1689784990~exp=1689785590~hmac=eb48881924f10f2459b8b452e189ce5f09dd811ce60d1a9c33b2cefef8bfcd18'     ]

        let products = [];
            for (let i =0; i< 10; i+=1){
                let newProduct = {
                    name: faker.commerce.productName(),
                    adjective : faker.commerce.productAdjective(),
                    description : faker.commerce.productDescription(),
                    price : faker.commerce.price(),
                    category: _.sample(categories),
                    imageUrl: _.sample(imageUrls) //
                };

                products.push(newProduct);
            }
            await productsCollection.insertMany(products);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();