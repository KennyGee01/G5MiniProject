const reservations = [
    { id: 1, name: 'Jacqueline', guests: 8, date: '2026-11-15', time: '19:00' },
    { id: 2, name: 'Adonis', guests: 2, date: '2026-12-23', time: '12:00' } //Our reservations array 
];

export const getReservations = (req, res) => {
    res.status(200).json(reservations); // GET shows the reservations
};

export const getReservation = (req, res) => { // GET retrieves a specific reservation based on the provided ID
    const reservation = reservations.find(r => r.id === parseInt(req.params.id)); 
    if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' }); // checks if the reservation exists, if not returns a 404 error
    };
    res.json(reservation); 
}

    export const addReservation = (req, res) => { //POST creates a new reservation and adds it to the reservations array
        const { name, guests, date, time } = req.body;  
        const newReservation = {
            id: reservations.length + 1,
            name: name,
            guests: guests,
            date: date,
            time: time,
            status: 'confirmed'
        };
        reservations.push(newReservation); // adds the new reservation to the reservations array
        res.status(201).json(newReservation); // returns the newly created reservation as a JSON response with a 201 status (created)
    };

    export const updateReservation = (req, res) => { // PUT updates an existing reservation based on the provided ID and request body data
        const reservation = reservations.find(r => r.id === parseInt(req.params.id));
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' }); // checks if the reservation exists, if not returns a 404 error
        }       
        const { name, guests, date, time } = req.body;
        reservation.name = name;
        reservation.guests = guests;    
        reservation.date = date;
        reservation.time = time;
        res.json(reservation); // returns the updated reservation as a JSON response
    };

    export const cancelReservation = (req, res) => { // DELETE cancels an existing reservation based on the provided ID
        const reservation = reservations.find(r => r.id === parseInt(req.params.id));
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' }); // checks if the reservation exists, if not returns a 404 error
        }
        reservation.status = 'cancelled'; // updates the status of the reservation to 'cancelled'
        res.json(reservation);
    };