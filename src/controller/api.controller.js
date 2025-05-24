import { fork } from "child_process";
import sum from "../helpers/sum.helper.js";

const sumCb = (req, res) => {
  const result = sum();
  return res.status(200).json(result);
};

const sumProcessCb = (req, res) => {
  const childProcess = fork("./src/helpers/sumProcess.helper.js");
  childProcess.send("start");
  childProcess.once("message", (result) => res.status(200).json(result));
};

export { sumCb, sumProcessCb };
