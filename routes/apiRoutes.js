var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //  API route for inserting course materials
   app.post("/api/material", function(req, res) {
    console.log(req.body)
    db.courseMaterial.create(req.body).then(function(db) {
      res.json(db);
    });
  });``
  // add you routes here (I left the exemple routes to make it easy on us)
};
