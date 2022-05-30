const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');

dotenv.config();
const app = express();
const urlEncodedParser = bodyParser.urlencoded({extended:false});

const authRoute = require('./routes/Auth');
const freelancerRoute = require('./routes/Freelancer');
const projectRoutes = require('./routes/Project');
const taskRoutes = require('./routes/Task');

app.use(session({
    secret : process.env.session_secret,
    resave : true,
    saveUninitialized : true
}));
app.use(urlEncodedParser);
app.use(express.json());
app.use(cors());


app.use('/auth', authRoute);
app.use('/freelancer', freelancerRoute);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes);

app.use((err, req, res) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.send(err);
});

app.listen(process.env.port, () => {
    console.clear();
    console.log(`Server started at ${process.env.port}`);
})