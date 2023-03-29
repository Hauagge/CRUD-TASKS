import { randomUUID } from "node:crypto";
import { parse } from "csv-parse";

import Database from "./database.js";
import { Readable } from "node:stream";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { task_id } = req.params;
      const task = database.select("tasks");
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description, completed_at } = req.body;
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at,
        created_at: new Date(),
        updated_at: new Date(),
      };
      database.insert("tasks", task);
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:task_id"),
    handler: (req, res) => {
      const { task_id } = req.params;
      const { title, description, completed_at } = req.body;

      const task = database.update("tasks", task_id, {
        title,
        description,
        updated_at: new Date(),
      });
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:task_id"),
    handler: (req, res) => {
      const { task_id } = req.params;
      const { completed_at } = req.body;

      const task = database.complete("tasks", task_id, { completed_at });
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:task_id"),
    handler: (req, res) => {
      const { task_id } = req.params;
      const task = database.delete("tasks", task_id);
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/import"),
    body: new OneToHundredStream(),
  },
];

export { routes };

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}
