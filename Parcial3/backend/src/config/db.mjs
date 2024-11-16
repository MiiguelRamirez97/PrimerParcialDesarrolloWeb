import pg from "pg";
const { Client } = pg;

class Db {
  #client;
  static conn;
  constructor() {
    const db_options = {
      user: "user",
      host: "db", 
      database: "medical_appointments",
      password: "password",
      port: 5432,
    };
    this.#client = new Client(db_options);
    console.log("db client CREATEd");
  }

  static getInstance() {
    if (!Db.conn) {
      Db.conn = new Db();
    }
    return Db.conn;
  }

  get client() {
    return this.#client;
  }

  query = async (query, values = []) => {
    try {
      await this.#client.connect();
      console.log(query);
      const resultados = await this.#client.query(query, values);
      return resultados;
    } catch (err) {
      throw err;
    } finally {
      await this.#client.end();
    }
  };
}

export { Db };