import userSchema from "../models/userModel.js";

const profile = async (req, res) => {
    const { userId, email, age, role } = req.body;
    try {
        if (!userId || !email || !age || !role) {
            return res.status(400).json({ message: "Please enter all the detials!" });
        }
        else {
            const newProfile = new userSchema({
                userId: userId,
                email: email,
                age: age,
                role: role
            });
            await newProfile.save();
            res.status(201).json({ message: "Profile created successfully!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export default { profile };