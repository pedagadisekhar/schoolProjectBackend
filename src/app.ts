import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/userroutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', routes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


export default app;