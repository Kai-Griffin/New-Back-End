
import express from 'express';
import 'dotenv/config.js';

import bookRoutes from './routers/BookRoutes.js';
import studentRoutes from './routers/StudentRoutes.js';
import userRoutes from './routers/UserRoutes.js';
import cors from 'cors';

let corsOptions = {
    origin: process.env.ORIGIN
}

const app = express();


app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}))


try{
    app.listen(process.env.port || 3000, () =>{
        console.log(`Listening to port ${process.env.port || 3000}....`);
    });
}catch(e){
    console.log(e);
}

// app.use("/students", studentRoutes);

app.use("/user", userRoutes);
app.use("/book", bookRoutes);




