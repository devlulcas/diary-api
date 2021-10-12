// ENVIRONMENT VARIABLES
const AMBIENT = process.env.AMBIENT || "development";
const knexfile = require("../..knexfile");
const knex = require("knex")(knexfile[AMBIENT]);
module.exports = knex;
