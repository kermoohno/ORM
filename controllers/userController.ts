import express from 'express';
import User from '../models/user';

const router = express.Router();

// Route to create a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body); // Create a new user instance with the request body data
        const savedUser = await newUser.save(); // Save the new user to the database
        res.status(201).json(savedUser); // Respond with the saved user and a 201 status code
    } catch (error: any) {
        res.status(400).json({ error: error.message }); // If there's an error, respond with a 400 status and the error message
    }
});

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.json(users); // Respond with the retrieved users
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // If there's an error, respond with a 500 status and the error message
    }
});

// Route to update a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the route parameters
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // Find user by ID and update with request body data
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' }); // Respond with 404 if user is not found
        }
        res.json(updatedUser); // Respond with the updated user data
    } catch (error: any) {
        res.status(400).json({ error: error.message }); // If there's an error, respond with a 400 status and the error message
    }
});

// Route to delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the route parameters
        const deletedUser = await User.findByIdAndDelete(id); // Find user by ID and delete
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' }); // Respond with 404 if user is not found
        }
        res.json({ message: 'User deleted successfully' }); // Respond with a success message
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // If there's an error, respond with a 500 status and the error message
    }
});

export default router;
