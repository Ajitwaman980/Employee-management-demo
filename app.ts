import Express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import data_json from "./test.json";
import { log } from "console";
import { statuscoded } from "./src/statuscode";
import fs, { writeFileSync } from "fs";
import { isAdmin } from "./src/admin";
import helmet from "helmet";
const app = Express();
const port = 3000;

app.use(cookieParser());
app.use(Express.json());
app.use(helmet());

app.get("/data", function (req: Request, res: Response) {
  res.status(statuscoded.OK).send(data_json);
});

app.get("/data/:id", function (req: Request, res: Response) {
  // console.log(req.params.id);
  const id = parseInt(req.params.id);
  const item = data_json.find((item) => item.id == id);
  res.status(statuscoded.OK).send(item);
});

// get by id
app.put("/edit/:id", (req: Request, res: Response) => {
  const { salary, position }: { salary: number; position: string } = req.body;
  // console.log(position, salary);
  const id = parseInt(req.params.id);
  // console.log(id);

  const item: any = data_json.find((item) => item.id == id);
  if (!item) {
    res.status(statuscoded.NOT_FOUND).send("Item not found.");
  }
  item.salary = salary;
  item.position = position;

  try {
    res.status(statuscoded.OK).send("update salary and position");
  } catch (err) {
    console.log(err);
    res.status(statuscoded.INTERNAL_SERVER_ERROR).send("Failed to update.");
  }
});
// delete not workigs
app.delete("/delete/:id", isAdmin, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) res.sendStatus(statuscoded.NOT_FOUND).send("Not Found");
  const index = data_json.findIndex((e) => e.id === id);
  if (!index) {
    res.status(statuscoded.NOT_FOUND).send("Item not found." + id);
  }
  data_json.splice(index, 1);
  // console.log("delete index " + index);

  res.status(statuscoded.OK).send(" iteam scuessful deleted");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
