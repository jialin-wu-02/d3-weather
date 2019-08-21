const express = require('express');
const bodyParser = require('body-parser');

const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/weather', (req, res) => {
    if (!req.body.address) {
        return res.send({
            error: "No address entered"
        })
    }
    geocode(req.body.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast, 
                location
            })
        });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));