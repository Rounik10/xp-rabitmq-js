const amqp = require('amqplib');

async function connect() {
  try {
    const connnection = await amqp.connect('amqp://localhost:5672');
    const channel = await connnection.createChannel();
    await channel.assertQueue('msg');
    console.log('Waiting for messages...');

    channel.consume('msg', (message) => {
      const content = message.content.toString();
      console.log(`Recieved: ${content}`);
      channel.ack(message);
    });
  } catch (ex) {
    console.error(ex);
  }
}

connect();
