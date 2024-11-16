import { Db } from "../config/db.mjs";

class DoctorService {
    async getDoctorById(doctorId) {
        try {
            console.log("Getting doctor by id");
            const result = await new Db().query('SELECT * FROM doctor WHERE id = $1', [doctorId]);
            return result.rows[0];
        }catch(err){
            console.log("error al listar el doctor", err);
            throw err;
        }
    }
}

export { DoctorService };