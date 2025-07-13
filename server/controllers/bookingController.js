const bookingModel = require("../models/Booking");

const bookEvent = (req, res) => {
    const user_id = req.user.id; 
    const { event_id } = req.body;

    if (!event_id) return res.status(400).json({ message: "Event ID is required" });

    bookingModel.createBooking({ user_id, event_id }, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Event booked successfully" });
    });
};

const getMyBookings = (req, res) => {
    const user_id = req.user.id;

    bookingModel.getBookingsByUser(user_id, (err, bookings) => {
        if (err) return res.status(500).json({ error: err });
        res.json(bookings);
    });
};

const getAllBookings = (req, res) => {
    bookingModel.getAllBookings((err, bookings) => {
        if (err) return res.status(500).json({ error: err });
        res.json(bookings);
    });
};

module.exports = {
    bookEvent,
    getMyBookings,
    getAllBookings
};
