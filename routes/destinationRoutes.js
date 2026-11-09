const express = require("express");

const router = express.Router();

const destinationController = require("../controllers/destinationController");

// Add destinations
router.post("/", destinationController.addDestination);

router.post("/bulk", destinationController.addManyDestinations);

// Retrieve destinations
router.get("/", destinationController.getAllDestinations);

router.get("/search", destinationController.searchDestinations);

router.get("/categories", destinationController.getCategories);

router.get("/count", destinationController.countDestinations);

router.get("/name/:name", destinationController.getDestinationByName);

router.get("/:id", destinationController.getDestinationById);

// Update destinations
router.put("/name/:name", destinationController.updateDestinationByName);

router.put("/:id", destinationController.updateDestinationById);

// Delete destinations
router.delete("/name/:name", destinationController.deleteDestinationByName);

router.delete("/cleanup", destinationController.deleteManyDestinations);

router.delete("/:id", destinationController.deleteDestinationById);

module.exports = router;