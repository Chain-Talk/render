const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/message', (req, res) => {
  const { username, text } = req.body;
  pusher.trigger('chat', 'message', { username, text });
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Pusher chat backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
