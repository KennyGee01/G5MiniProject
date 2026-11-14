const reservations = [
  { id: 1, name: "Jacqueline", guests: 8, date: "2026-11-15", time: "19:00", status: "confirmed" },
  { id: 2, name: "Adonis", guests: 2, date: "2026-12-23", time: "12:00", status: "confirmed" },
]

let nextId = reservations.length + 1;

export const getAllReservations = () => reservations;

export const getReservationById = (id) => reservations.find((reservation) => reservation.id === id) || null;

export const createReservation = ({ name, guests, date, time }) => {
  const newReservation = {
    id: nextId++,
    name,
    guests,
    date,
    time,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  reservations.push(newReservation);

  return newReservation;
}

export const updateReservationById = (id, {name, guests, date, time }) => {
  const reservation = getReservationById(id);

  if (!reservation) return null;

  reservation.name = name;
  reservation.guests = guests;
  reservation.date = date;
  reservation.time = time;
  reservation.updatedAt = new Date().toISOString();

  return reservation;
}


export const cancelReservation = (id) => {
  const reservation = getReservationById(id);

  if (!reservation) return null;

  reservation.status = "cancelled";
  reservation.updatedAt = new Date().toISOString();

  return reservation;
}