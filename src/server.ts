import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Salve quebrada!' });
});

app.listen(3333, () => console.log('Server is running!'));
