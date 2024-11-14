import {Db} from "../config/db.mjs";
import { Barber } from "../models/Barber.mjs";

class BarberService{
    getAllBarbers = async () => {
        try {
            console.log("Getting all barbers");
            const query = "SELECT * FROM barber";
            const results = await new Db().query(query);
            console.log("Barbers", results.rows);
            return results.rows.map(({barber_document,barber_name,barber_mobile}) => new Barber(barber_document, barber_name, barber_mobile));
        } catch (err) {
            console.log("error al listar los barberos", err);
            throw err;
        }
    }
}

export { BarberService };