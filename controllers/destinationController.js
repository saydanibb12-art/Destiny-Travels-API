const Destination = require("../models/Destination");

// 1. Add a single destination using create()
exports.addDestination = async (req, res) => {
    try {
        const destination = await Destination.create(req.body);

        res.status(201).json({
            message: "Destination added successfully",
            data: destination
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 2. Add multiple destinations using insertMany()
exports.addManyDestinations = async (req, res) => {
    try {
        const destinations = await Destination.insertMany(req.body);

        res.status(201).json({
            message: "Destinations added successfully",
            data: destinations
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 3. Get all destinations using find()
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();

        res.status(200).json(destinations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 4. Get destination by ID using findById()
exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json(destination);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 5. Get destination by name using findOne()
exports.getDestinationByName = async (req, res) => {
    try {
        const destination = await Destination.findOne({
            name: req.params.name
        });

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json(destination);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 6. Update by ID using findByIdAndUpdate()
exports.updateDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json({
            message: "Destination updated successfully",
            data: destination
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 7. Update by name using findOneAndUpdate()
exports.updateDestinationByName = async (req, res) => {
    try {
        const destination = await Destination.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true, runValidators: true }
        );

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json({
            message: "Destination updated successfully",
            data: destination
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 8. Smart destination discovery
exports.searchDestinations = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy,
            order,
            page = 1,
            limit = 5
        } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const sortField = ["price", "rating", "name"].includes(sortBy)
            ? sortBy : "name";

        const sortOrder = order === "desc" ? -1 : 1;

        const destinations = await Destination.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        const total = await Destination.countDocuments(filter);

        res.status(200).json({
            totalDestinations: total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            data: destinations
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 9. Get unique categories using distinct()
exports.getCategories = async (req, res) => {
    try {
        const categories = await Destination.distinct("category");

        res.status(200).json(categories);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 10. Count destinations using countDocuments()
exports.countDestinations = async (req, res) => {
    try {
        const count = await Destination.countDocuments();

        res.status(200).json({
            totalDestinations: count
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 11. Delete by ID using findByIdAndDelete()
exports.deleteDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(
            req.params.id
        );

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json({
            message: "Destination deleted successfully"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// 12. Delete by name using findOneAndDelete()
exports.deleteDestinationByName = async (req, res) => {
    try {
        const destination = await Destination.findOneAndDelete({
            name: req.params.name
        });

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json({
            message: "Destination deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 13. Delete multiple using deleteMany()
exports.deleteManyDestinations = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                message: "Please provide a category"
            });
        }

        const result = await Destination.deleteMany({
            category: category
        });

        res.status(200).json({
            message: "Destinations deleted successfully",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};