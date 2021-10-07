const express = require('express');
const testRouter = require('./controllers/TestRouter')

const app = express();

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

app.use(async (req, res, next) => {
    console.log(req.method.toUpperCase() + ' ' + req.path);
    next();
});

app.use('/api/test', testRouter);

if (require.main === module) {
    const port = process.env.PORT || 3003;
    app.listen(port, () => {
        console.log(`API Server listening on port ${port}`)
    });
} else {
    console.log('Unable to start API Server!')
}