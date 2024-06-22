import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  user: mongoose.Schema.Types.ObjectId;
  message: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  room_id: { type: String, required: true }, //added now 
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export { IMessage, Message };
