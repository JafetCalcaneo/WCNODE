import express from 'express';
const app = express();
import ordersRoutes from './routes/orders.routes.js';
const port = 3000;

app.get('/lol', (req, res)=>{
    res.json({message: 'Bien:D'});
})
app.use(express.static('img'));
// app.use('/img')

app.use('/order', ordersRoutes);

app.listen(port, ()=>{
    console.log(`App Connected Port: 3000`);
})
export default app;