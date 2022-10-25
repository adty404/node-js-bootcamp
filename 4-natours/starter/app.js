const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello from the server side!',
//         app: 'Natours',
//     });
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        length: tours.length,
        data: {
            tours,
        },
    });
});

app.get('/api/v1/tours/:id/:optional?', (req, res) => {
    console.log(req.params);
    // result ud in req.params.id is 'string', it is a trick to have a return as int by multiply it to 1
    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);

    // id validation is exist ?
    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'Fail!',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        length: tours.length,
        data: {
            tour,
        },
    });
});

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign(
        {
            id: newId,
        },
        req.body
    );

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours, null, 4),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
});

app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'Fail!',
            message: 'Invalid ID given',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here ..></Updated>',
        },
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
