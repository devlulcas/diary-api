exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          username: "test",
          email: "test@test.com",
          password:
            "$2a$10$z7E3HRtz6Zc2iDib8y7jOexVdUORj8xSSe2Ny9xxFXZqgckK0.nDa",
        },
        {
          username: "tset",
          email: "tset@tset.com",
          password:
            "$2a$10$R24l9gn5ajAqpEEXY04AQevNaor8QH08WSGfYoNIiGjQUUHt/CLki",
        },
        {
          username: "toast",
          email: "toast@toast.com",
          password:
            "$2a$10$R24l9gn5ajAqpEEXY04AQevNaor8QH08WSGfYoNIiGjQUUHt/CLki",
        },
      ]);
    });
};
