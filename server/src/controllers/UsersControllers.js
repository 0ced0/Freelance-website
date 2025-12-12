import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/UsersDB.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
        // after saving the user
        const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });
        res.status(201).json({ msg: 'User registered successfully', token, user: { username: user.username, email: user.email } });


    } catch (err) {
        console.log("🔥 FULL ERROR OBJECT:", JSON.stringify(err, null, 2));
        console.log("🔥 RAW ERR:", err);

        if (err.code == 11000) {
            return res.status(400).json({
                type: "DUPLICATE_KEY",
                field: Object.keys(err.keyPattern)[0],
                msg: `Duplicate value for field: ${Object.keys(err.keyPattern)[0]}`
            });
        }

        return res.status(500).json({
            type: "SERVER_ERROR",
            msg: "Something went wrong"
        });
    }

    res.status(500).json({ type: "SERVER_ERROR", msg: "Something went wrong" });
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body; // you can also use email if you prefer

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ type: "INVALID_USERNAME", msg: "Username not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ type: "INVALID_PASSWORD", msg: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

        // Return user info and token
        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                username: user.username,
                email: user.email,
            },
        });


    } catch (err) {
        console.error("🔥 LOGIN ERROR:", err);
        res.status(500).json({ type: "SERVER_ERROR", msg: "Something went wrong" });
    }
};


export const checkUser = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    try {
        const data = jwt.verify(token, "SECRET123");
        const user = await User.findById(data.id).select("-password");
        res.json(user);
    } catch {
        res.status(401).json({ msg: "Invalid token" });
    }
};