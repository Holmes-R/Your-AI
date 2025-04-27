import mongoose from "mongoose"
const { Schema } = mongoose;

const chatSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    history: [
        {
            chat: [
                {
                    type: string,
                    required: true,
                }
            ],
            chatRole: {
                type: String,
                enum: ['user', 'model'],
                required: true,
            },
            time: {
                type: Date,
                required: true,
                default: Date.now,
            },
        }
    ]
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;


