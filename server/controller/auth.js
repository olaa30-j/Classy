import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/auth.js';

/* REGISTER USER */
export const registration = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picture,
            friends,
            location,
            occupation,
        } = req.body;

        const saltRounds = 10; // Number of salt rounds for bcrypt
        // Hash the password
        const passwordHashed = await bcrypt.hash(password, saltRounds);
    
        // Create a new User instance with the hashed password
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHashed,
            picture,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 20000),
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        
        // Respond with the created user in JSON format
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json("post error ",{ error: err.message });
    }
};

