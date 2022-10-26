const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        length: tours.length,
        data: {
            tours,
        },
    });
};
exports.getTour = (req, res) => {
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
};
exports.createTour = (req, res) => {
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
};
exports.updateTour = (req, res) => {
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
};
exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'Fail!',
            message: 'Invalid ID given',
        });
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
};
