import fs from "node:fs/promises";

const databasePath = new URL("./database.json", import.meta.url);

export default class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
    return data;
  }

  delete(table, id) {
    const index = this.#database[table].findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }
    console.log(this.#database[table]);
    this.#database[table].splice(index, 1);

    this.#persist();
  }

  update(table, id, data) {
    const index = this.#database[table].findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    this.#database[table][index] = { id, ...data };
    const updated = { id, ...data };

    this.#persist();

    return updated;
  }

  complete(table, id, data) {
    const index = this.#database[table].findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    this.#database[table][index] = {
      id,
      completed_at: data.completed_at,
      updated_at: new Date(),
    };
    const updated = { id, ...data };

    this.#persist();

    return updated;
  }
}
