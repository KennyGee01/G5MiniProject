import express from 'express';
import {getReservations, getReservation, addReservation, updateReservation, cancelReservation} from '../controllers/reservationControllers.js';
// Import the necessary functions from the reservationController.js file

const router = express.Router(); // Create a new router instance

router.get('/', getReservations); // GET shows the reservations
router.get('/:id', getReservation); // GET retrieves a specific reservation based on the provided ID
router.post('/', addReservation); // POST creates a new reservation and adds it to the reservations array
router.put('/:id', updateReservation); // PUT updates an existing reservation based on the provided ID and request body data
router.delete('/:id', cancelReservation); // DELETE cancels an existing reservation based on the provided ID

export default router; // Export the router instance for use in other parts of the application  