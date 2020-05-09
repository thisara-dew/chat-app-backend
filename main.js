// ESM syntax is supported.
import express from 'express';
import cors from 'cors';
const app = express();

const  corsOptions = {
    origin: function(origin, callback) {
      if (Whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));s
      }
    }
  };
  app.use(cors()); // include before other routes
  app.options("*", cors(corsOptions)); // include before other routes


app.get('/', (req, res) => {
    console.log(req.method);
    res.status(200).json('hey is working')
})

module.exports = app;