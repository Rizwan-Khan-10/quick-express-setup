#!/usr/bin/env node
import inquirer from "inquirer";
import { execa } from "execa";

const main = async () => {
  console.log("Welcome to Quick Express Setup CLI!\n");

  const defaultPackages = [
    "express",
    "dotenv",
    "cors",
    "body-parser",
    "cookie-parser",
    "morgan",
    "helmet",
    "jsonwebtoken",
    "bcrypt",
    "nodemon",
    "express-validator",
    "multer"
  ];

  console.log("The following default packages will be installed:");
  console.log(defaultPackages.join(" "), "\n");

  const { skipPackages } = await inquirer.prompt([
    {
      type: "input",
      name: "skipPackages",
      message: "Type any packages you DO NOT want (space-separated):",
      default: ""
    }
  ]);

  const skipList = skipPackages.trim().split(/\s+/).filter(Boolean);

  let toInstall = defaultPackages.filter(pkg => !skipList.includes(pkg));

  const { extraPackages } = await inquirer.prompt([
    {
      type: "input",
      name: "extraPackages",
      message: "Type any extra packages you want to install (space-separated):",
      default: ""
    }
  ]);

  if (extraPackages.trim() !== "") {
    toInstall.push(...extraPackages.trim().split(/\s+/));
  }

  if (toInstall.length === 0) {
    console.log("No packages selected for installation. Exiting.");
    return;
  }

  console.log("\nInstalling packages:", toInstall.join(" "), "\n");

  await execa("npm", ["install", ...toInstall], { stdio: "inherit" });

  console.log("\nPackages installed successfully!");
};

main();