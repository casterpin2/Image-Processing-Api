import express from 'express';
import apiRoutes from './routes/api';

const app = express();
const port = 5000;

// Add routes
app.use('/api', apiRoutes);
app.use('/',(req: express.Request, res: express.Response)=>{
    return res.send('Wellcome to Project');
})
// Start server
app.listen(port, async (): Promise<void> => {
  console.log(`Projcet run with port ${port}`);
});

export default app;
