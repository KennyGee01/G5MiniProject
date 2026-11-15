import * as reservationService from "../services/reservationServices.js";
import { statusCode } from "../utils/helpers.js";

export const getReservations = (_req, res) => {
  try {
    const reservations = reservationService.getAllReservations();
    res.status(statusCode.OK).json(reservations);
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getReservation = (req, res) => {
  try {
    const reservation = reservationService.getReservationById(
      parseInt(req.params.id),
    );

    if (!reservation) {
      return res
        .status(statusCode.NOT_FOUND)
        .json({ error: "Reservation not found" });
    }

    res.status(statusCode.OK).json(reservation);
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const addReservation = (req, res) => {
  try {
    const newReservation = reservationService.createReservation(req.body);
    
    if (!newReservation) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: "The selected date and time are unavailable." });
    }

    res.status(statusCode.CREATED).json(newReservation);
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({ error: error.message });
  }
};

export const updateReservation = (req, res) => {
  const updatedReservation = reservationService.updateReservationById(
    parseInt(req.params.id),
    req.body,
  );

  if (!updatedReservation) {
    return res
      .status(statusCode.NOT_FOUND)
      .json({ error: "Reservation not found" });
  }

  res.status(statusCode.OK).json(updatedReservation);
};

export const cancelReservation = (req, res) => {
  try {
    const reservation = reservationService.cancelReservation(
      parseInt(req.params.id),
    );

    if (!reservation) {
      return res
        .status(statusCode.NOT_FOUND)
        .json({ error: "Reservation not found" });
    }

    res.status(statusCode.OK).json(reservation);
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
