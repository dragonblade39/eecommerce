const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/user", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const userModel = mongoose.model("users", userSchema);

const productSchema = new mongoose.Schema({
    productName: String,
    productOwner: String,
    expiryDate: Date,
    manufactureDate: Date,
    productType: String,
    count: Number,
    price: Number,
});
const productModel = mongoose.model("products", productSchema);
const productsApproveModel = mongoose.model("productsapprove", productSchema);
const productsRejectModel = mongoose.model("productsreject", productSchema);

// Define the schema for storing orders
const orderSchema = new mongoose.Schema({
    houseNumber: String,
    apartmentName: String,
    areaName: String,
    cityName: String,
    stateName: String,
    countryName: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const orderModel = mongoose.model("orders", orderSchema);

// Endpoint to handle order placement
app.post('/orders', async (req, res) => {
    const { houseNumber, apartmentName, areaName, cityName, stateName, countryName } = req.body;
    try {
        // Save the address to the database
        const newOrder = await orderModel.create({ houseNumber, apartmentName, areaName, cityName, stateName, countryName });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint to fetch all products
app.get('/products', async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint to add a new product
app.post('/products', async (req, res) => {
    const { productName, productOwner, expiryDate, manufactureDate, productType, count, price } = req.body;
    try {
        const newProduct = await productModel.create({ productName, productOwner, expiryDate, manufactureDate, productType, count, price });
        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint to increase count of a product
app.post('/increaseCount', async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await productModel.findById(productId);
        if (product) {
            product.count += 1;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint to decrease count of a product
app.post('/decreaseCount', async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await productsApproveModel.findById(productId);
        if (product) {
            if (product.count > 0) {
                product.count -= 1;
                await product.save();
                if (product.count <= 0) {
                    res.status(200).json({ message: "Product got finished" });
                } else {
                    res.json(product);
                }
            } else {
                res.status(400).json("Product count cannot be negative");
            }
        } else {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.status(401).json("Password is incorrect");
            }
        } else {
            res.status(404).json("No record existed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint for user registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            res.json("Account already exists");
        } else {
            const newUser = await userModel.create({ name, email, password });
            res.json(newUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint to approve a product
app.post('/approve', async (req, res) => {
    const { _id } = req.body;
    try {
        const productToApprove = await productModel.findById(_id);
        if (productToApprove) {
            const approvedProduct = await productsApproveModel.create(productToApprove.toObject());
            await productModel.findByIdAndDelete(_id);
            res.json(approvedProduct);
        } else {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint to reject a product
app.post('/reject', async (req, res) => {
    const { _id } = req.body;
    try {
        const productToReject = await productModel.findById(_id);
        if (productToReject) {
            const rejectedProduct = await productsRejectModel.create(productToReject.toObject());
            await productModel.findByIdAndDelete(_id);
            res.json(rejectedProduct);
        } else {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Endpoint to fetch approved products
app.get('/approvedproducts', async (req, res) => {
    try {
        const approvedProducts = await productsApproveModel.find({});
        res.json(approvedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

module.exports = app;
