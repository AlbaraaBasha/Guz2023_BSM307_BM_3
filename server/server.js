const io = require('socket.io')(5000);

io.on('connection', socket => {
  const id = socket.handshake.query.id;
  console.log(`User connected with ID: ${id}`);

  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    console.log(`Message received from ${id} to recipients: ${recipients}, text: ${text}`);
    
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      });

      console.log(`Message sent from ${id} to ${recipient}`);
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected with ID: ${id}`);
  });
});
