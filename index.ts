import express from 'express';
import sequelize from './db/config';
import userRoute from './src/routes/user';

const app = express();
app.use(express.json());

sequelize.sync()
.then(()=> console.log("Database Connected"))
.catch((err)=>{console.log('Error connecting Database')});

app.use('api/auth', userRoute);

app.listen(3000, ()=>{
    console.log('Server is running on port 4000');
})