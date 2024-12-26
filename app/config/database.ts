import { DataSource } from "typeorm";

if (!process.env.ENVIRONMENT) {
  console.log("please define the ENVIRONMENT value in .env");
  process.exit();
}

if (
  process.env.ENVIRONMENT != "Development" &&
  process.env.ENVIRONMENT != "Production"
) {
  console.log(
    ".env ENVIRONMENT value must be either Development or Production"
  );
  process.exit();
}

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["app/models/*.ts"],
  logging: process.env.ENVIRONMENT == "Development",
  synchronize: true,
  driver: require("mysql2"),
});
