import express from 'express';
import CartProduct from '../models/cartProduct';

const router = express.Router();

// Create a new cart product
router.post('/cart-products', async (req, res) => {
    try {
        const newCartProduct = new CartProduct(req.body);
        const savedCartProduct = await newCartProduct.save();
        res.status(201).json(savedCartProduct);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Get all cart products
router.get('/cart-products', async (req, res) => {
    try {
        const cartProducts = await CartProduct.find();
        res.json(cartProducts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get a cart product by ID
router.get('/cart-products/:id', async (req, res) => {
    try {
        const cartProduct = await CartProduct.findById(req.params.id);
        if (!cartProduct) {
            return res.status(404).json({ error: 'Cart product not found' });
        }
        res.json(cartProduct);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update a cart product by ID
router.put('/cart-products/:id', async (req, res) => {
    try {
        const updatedCartProduct = await CartProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCartProduct) {
            return res.status(404).json({ error: 'Cart product not found' });
        }
        res.json(updatedCartProduct);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a cart product by ID
router.delete('/cart-products/:id', async (req, res) => {
    try {
        const deletedCartProduct = await CartProduct.findByIdAndDelete(req.params.id);
        if (!deletedCartProduct) {
            return res.status(404).json({ error: 'Cart product not found' });
        }
        res.json({ message: 'Cart product deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
