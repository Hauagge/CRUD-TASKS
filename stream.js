import { parse } from "csv-parse";
import fs from "node:fs";

const fileCSV = new URL("./tasks.csv", import.meta.url);

const readable = fs.createReadStream(fileCSV, "utf8");

const parsedFile = parse(readable, {
  delimiter: ",",
  columns: true,
  skip_empty_lines: true,
  from: 2,
  trim: true,
});

async function readLines() {
  const line = await parsedFile.pipe();
  for await (const chunk of line) {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: chunk.title,
        description: chunk.description,
      }),
    });
  }
}

readLines();
