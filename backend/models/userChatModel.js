import mongoose from "mongoose";
const { Schema } = mongoose;

const userChatSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    chats: [
        {
            chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
            chatTitle: { type: String, required: true },
            pace: { type: String, required: true, enum: ['fast', 'medium', 'slow'] },
        }
    ]
}, { timestamps: true });

const User =  mongoose.model('UserChat', userChatSchema);
export default User;

