import express from 'express';

const app = express();

const port = 3000;

app.get('/lol', (req, res)=>{
    res.json({message: 'Bien:D'});
})
app.use(express.static('img'));
// app.use('/img')

// app.use();
app.listen(port, ()=>{
    console.log(`App Connected Port: 3000`);
})
export default app;