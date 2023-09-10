require('dotenv').config();
const app = require('./app');

const port = process.env.SERVER_PORT || 8080;

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!');
})
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
