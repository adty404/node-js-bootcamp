const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Fail!',
            message: 'Missing name or price',
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // length: tours.length,
        // data: {
        //     tours,
        // },
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    // result ud in req.params.id is 'string', it is a trick to have a return as int by multiply it to 1
    const id = req.params.id * 1;

    // const tour = tours.find((el) => el.id === id);

    res.status(200).json({
        status: 'success',
        // length: tours.length,
        // data: {
        //     tour,
        // },
    });
};

exports.createTour = async (req, res) => {
    try {
        // const newTour = new Tour({});
        // newTour.save();
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail!',
            message: 'Invalid data sent!',
        });
    }
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here ..></Updated>',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
