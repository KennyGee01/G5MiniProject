import { readReservations, writeReservations } from './fileService.js';

function getAllReservations() {
  return readReservations();
}

function getReservationById(id) {
    const allReservations = readReservations();
    return allReservations.find(reservation => reservation.id === id);
}

function createReservation(data) {
    const allReservations = readReservations();
    const newReservation = { ...data, id: Date.now() };
    allReservations.push(newReservation);
    writeReservations(allReservations);
    return newReservation;
}

function deleteReservation(id) {
    const allReservations = readReservations();
    const filtered = allReservations.filter(reservation => reservation.id !== id);
    writeReservations(filtered);
    return filtered.length !== allReservations.length;
}

export { getAllReservations, getReservationById, createReservation, deleteReservation };
