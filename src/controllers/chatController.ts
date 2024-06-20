import { Request, Response } from 'express';
import { IMessage, Message } from '../models/Message';

class ChatController {
  // Get all messages
  async getAllMessages(req: Request, res: Response) {
    try {
      const messages = await Message.find().populate('user');
      return res.json(messages);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  // Save a new message
  async saveMessage(messageData: IMessage) {
    const message = new Message(messageData);
    try {
      await message.save();
    } catch (err) {
      console.error(err);
    }
  }
}

export default new ChatController();
