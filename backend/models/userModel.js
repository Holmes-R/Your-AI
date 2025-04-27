import mongoose from "mongoose"
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    role: { type: String, required: true, enum: ['High School', 'College', 'Graduate', 'Working'] },
});

const User =  mongoose.model('User', userSchema);
export default User;

