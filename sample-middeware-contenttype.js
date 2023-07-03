import express from "express";
import cors from "cors";

const app  = express();
const port = 3000;

const requireJsonContent = () => {
  return (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(400).send('Se requiere un application/json');
    } else {
      next();
    }
  }
}

app.get('/', (req, res, next) => {
  res.send('app.get /');
});

app.post('/', requireJsonContent(), (req, res, next) => {
  res.send('app.post / - Enviaste un JSON');
})

app.listen(port, () => {
  console.log(`Escuchando el port ${port}`);
})

