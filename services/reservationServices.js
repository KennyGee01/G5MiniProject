import { readReservations, writeReservations } from './fileService.js';

function getAllReservations() {
  return readReservations();
}

function getReservationById(id) {
  const allReservations = readReservations();
  return allReservations.find((reservation) => reservation.id === id) || null;
}

function createReservation(data) {
  const allReservations = readReservations();
  const newReservation = { ...data, id: Date.now(), status: data.status || "confirmed" };
  allReservations.push(newReservation);
  writeReservations(allReservations);
  return newReservation;
}

function deleteReservation(id) {
  const allReservations = readReservations();
  const filtered = allReservations.filter((reservation) => reservation.id !== id);
  writeReservations(filtered);
  return filtered.length !== allReservations.length;
}

function updateReservationById(id, { name, guests, date, time }) {
  const allReservations = readReservations();
  const reservation = allReservations.find((reservation) => reservation.id === id);
  if (!reservation) return null;
  if (name !== undefined) reservation.name = name;
  if (guests !== undefined) reservation.guests = guests;
  if (date !== undefined) reservation.date = date;
  if (time !== undefined) reservation.time = time;
  writeReservations(allReservations);
  return reservation;
}

function cancelReservation(id) {
  const allReservations = readReservations();
  const reservation = allReservations.find((reservation) => reservation.id === id);
  if (!reservation) return null;
  reservation.status = "cancelled";
  writeReservations(allReservations);
  return reservation;
}

export { getAllReservations, getReservationById, createReservation, deleteReservation, updateReservationById, cancelReservation };