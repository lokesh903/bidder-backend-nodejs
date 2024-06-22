import { Server, Socket } from 'socket.io';
import { Message } from '../models/Message';
import User  from '../models/User';
import ChatController from '../controllers/chatController';

const setupSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.on('join', async (username: string) => {
      let user = await User.findOne({userName: username });

      if (!user) {
        user = new User({ userName: username });
        await user.save();
      }

      socket.data.user = user;
    //   console.log(`${user.username} joined the chat`);

      // Send all messages to the newly connected user
      const messages = await Message.find().populate('user');
      socket.emit('allMessages', messages);
    });

    socket.on('chat-message', async (msg: { user: string; message: string }) => {
      const user = await User.findOne({ username: msg.user });
      if (!user) return;

      const message = new Message({ user: user._id, message: msg.message });
      await ChatController.saveMessage(message);

      const populatedMessage = await message.populate('user');
      io.emit('chat-message', populatedMessage);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export default setupSocket;
