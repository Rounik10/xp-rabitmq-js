const amqp = require('amqplib');

const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function connect() {
  try {
    const connnection = await amqp.connect('amqp://localhost:5672');
    const channel = await connnection.createChannel();
    await channel.assertQueue('msg');
    while (true) {
      const input = await readline.question('Enter message: ');
      channel.sendToQueue('msg', Buffer.from(JSON.stringify(input)));
      console.log('message sent successfully!');
    }
  } catch (ex) {
    console.error(ex);
  }
}

connect();
