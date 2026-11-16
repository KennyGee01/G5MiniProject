import { readReservations, writeReservations } from "./fileService.js";

// Retrieve all reservations
function getAllReservations() {
  return readReservations();
}

// Retrieve a reservation by ID
function getReservationById(id) {
  if (!id || isNaN(id)) {
    throw new Error("Invalid reservation ID");
  }

  const allReservations = readReservations();

  return (
    allReservations.find(
      (reservation) => Number(reservation.id) === Number(id),
    ) || null
  );
}

function isBooked(date, time, ignoreId) {
  const allReservations = readReservations();

  const booking = allReservations.find(
    (reservation) =>
      reservation.date === date &&
      reservation.time === time &&
      reservation.status !== "cancelled" &&
      Number(reservation.id) !== Number(ignoreId) //skip the one being updated if ignoreId is provided
  );

  if (booking) {
    return true; // The date and time are already booked
  }   
  return false; // The date and time are available
}

// Create a reservation
function createReservation(data) {
  if (!data.name || !data.guests || !data.date || !data.time) {
    throw new Error("Missing required fields: name, guests, date, time");
  }
  if (isBooked(data.date, data.time)) {
    return null; // The selected date and time are already booked
  }

  const allReservations = readReservations();

  // Generate the next sequential numeric ID
  const nextId =
    allReservations.reduce(
      (maxId, reservation) => Math.max(maxId, Number(reservation.id) || 0),
      0,
    ) + 1;

  const now = new Date().toISOString();

  const newReservation = {
    ...data,
    id: nextId,
    status: "confirmed",
    createdAt: now,
    updatedAt: now,
  };

  allReservations.push(newReservation);

  writeReservations(allReservations);

  return newReservation;
}

// Update an existing reservation
function updateReservationById(id, { name, guests, date, time }) {
  if (!id || isNaN(id)) {
    throw new Error("Invalid reservation ID");
  }

  const allReservations = readReservations();

  const reservation = allReservations.find(
    (reservation) => Number(reservation.id) === Number(id),
  );

  if (!reservation) return null;

  const newDate = date || reservation.date;
  const newTime = time || reservation.time;

  if (isBooked(newDate, newTime, id)) {
    throw new Error("The selected date and time are unavailable");
  }
  
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
  if (!id || isNaN(id)) {
    throw new Error("Invalid reservation ID");
  }

  const allReservations = readReservations();

  const reservation = allReservations.find(
    (reservation) => Number(reservation.id) === Number(id),
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
  cancelReservation,
};
