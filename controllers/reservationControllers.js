import * as reservationService from "../services/reservationServices";

// import { Request, Response } from "express";

export const getReservations = (_req, res) => {
  const reservations = reservationService.getAllReservations();
  res.status(200).json(reservations);
};

export const getReservation = (req, res) => {
  const reservation = reservationService.getReservationById(
    parseInt(req.params.id),
  );

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  res.status(200).json(reservation);
};

export const addReservation = (req, res) => {
  const newReservation = reservationService.createReservation(req.body);

  res.status(201).json(newReservation);
};

export const updateReservation = (req, res) => {
  const updatedReservation = reservationService.updateReservationById(
    parseInt(req.params.id),
    req.body
  );

  if (!updatedReservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  res.status(200).json(updatedReservation);
};


export const cancelReservation = (req, res) => {
  const reservation = reservationService.cancelReservation(parseInt(req.params.id));

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  
  res.status(200).json(reservation);
}