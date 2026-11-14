import app from './app.js';

const port = 5000;

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});