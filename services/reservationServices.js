
import { readReservations, writeReservations } from './fileService.js';

// Retrieve all reservations
function getAllReservations() {
    return readReservations();
}

// Retrieve a reservation by ID
function getReservationById(id) {
    const allReservations = readReservations();

    return allReservations.find(
        (reservation) => Number(reservation.id) === Number(id)
    ) || null;
}

// Create a reservation
function createReservation(data) {
    const allReservations = readReservations();

    // Generate the next sequential numeric ID
    const nextId = allReservations.reduce(
        (maxId, reservation) =>
            Math.max(maxId, Number(reservation.id) || 0),
        0
    ) + 1;

    const now = new Date().toISOString();

    const newReservation = {
        ...data,
        id: nextId,
        status: "confirmed",
        createdAt: now,
        updatedAt: now
    };

    allReservations.push(newReservation);
    writeReservations(allReservations);

    return newReservation;
}

// Update an existing reservation
function updateReservationById(id, { name, guests, date, time }) {
    const allReservations = readReservations();

    const reservation = allReservations.find(
        (reservation) => Number(reservation.id) === Number(id)
    );

    if (!reservation) return null;

    if (name !== undefined) reservation.name = name;
    if (guests !== undefined) reservation.guests = guests;
    if (date !== undefined) reservation.date = date;
    if (time !== undefined) reservation.time = time;

    reservation.updatedAt = new Date().toISOString();

    writeReservations(allReservations);

    return reservation;
}

// Cancel a reservation (soft cancellation)
function cancelReservation(id) {
    const allReservations = readReservations();

    const reservation = allReservations.find(
        (reservation) => Number(reservation.id) === Number(id)
    );

    if (!reservation) return null;

    reservation.status = "cancelled";
    reservation.updatedAt = new Date().toISOString();

    writeReservations(allReservations);

    return reservation;
}

export {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservationById,
    cancelReservation
};
