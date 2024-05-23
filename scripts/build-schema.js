const fs = require("fs");
const path = require("path");

const schemaTemplate = fs.readFileSync(
  path.join(__dirname, "../prisma/schema.prisma.template"),
  "utf-8",
);
const provider = process.env.DATABASE_PROVIDER || "sqlite";
const schema = schemaTemplate.replace("__DATABASE_PROVIDER__", provider);

fs.writeFileSync(path.join(__dirname, "../prisma/schema.prisma"), schema);
