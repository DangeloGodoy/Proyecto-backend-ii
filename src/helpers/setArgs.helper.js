import { Command } from "commander";

const args = new Command();

args.option("--mode <mode>", "mode of the application prod/dev/test", "prod");
args.option("-m <mode>", "mode of the application prod/dev/test", "prod");

args.parse();
export default args.opts();