import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath (import.meta.url);
const __dirname = path.dirname (__filename)

const filepath = path.join(__dirname, '..', 'data', 'reservations.json');

function readReservations() {
    try {
        if ( ! fs . existsSync ( filepath ) ) {
            return [];
        }
        const data = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeReservations(reservations) {
    fs.writeFileSync(filepath, JSON.stringify(reservations, null, 2));
}

export { readReservations, writeReservations };
