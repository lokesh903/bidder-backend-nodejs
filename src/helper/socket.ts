import { Server, Socket } from 'socket.io';
import { Message } from '../models/Message';
import User from '../models/User';
import ChatController from '../controllers/chatController';

const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('join', async (username: any) => {
      console.log("username is here:",username);
      let user = await User.findOne({ userName: username.username });
      if (!user) {
        user = new User({ userName: username.username });
        await user.save();
      }
      socket.join(username.room);
      // socket.broadcast.to(data.room).emit('user joined');

      socket.data.user = user;
      // Send all messages to the newly connected user
      const messages = await Message.find().populate('user');
      socket.emit('allMessages', messages);
    });


    socket.on('message', async (msg: { user: string; message: string }) => {
      console.log("messgae are here",msg);
      
      const user = await User.findOne({ username: msg.user });
      if (!user) return;

      const message = new Message({ user: user._id, message: msg.message });
      await ChatController.saveMessage(message);

      const populatedMessage = await message.populate('user');
      io.emit('message', populatedMessage);
      // io.in(data.room).emit('new message', {user: data.user, message: data.message});
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export default setupSocket;
