const { randomBytes } = require("crypto");
const { writeFileSync } = require("fs");
const { join } = require("path");
const path = join(__dirname, ".secret.key");
randomBytes(64, function (error, buffer) {
  const data = buffer.toString("base64");
  writeFileSync(path, data, (error) => {
    if (error) console.log(error);
  });
});
