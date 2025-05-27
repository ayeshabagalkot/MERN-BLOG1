import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";
import slugify from "slugify";

// Create Category
export const addCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body;

        if (!name) {
            return next(handleError(400, "Category name is required."));
        }

        const newSlug = slug || slugify(name.toLowerCase());

        const category = new Category({
            name: name.trim(),
            slug: newSlug.trim()
        });

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category added successfully.",
            category
        });
    } catch (error) {
        console.error("Error creating category:", error);
        next(handleError(500, error.message));
    }
};

// Show One Category
export const showCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params;
        const category = await Category.findById(categoryid);

        if (!category) {
            return next(handleError(404, "Data not found."));
        }

        res.status(200).json({ category });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Update Category
export const updateCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        const { categoryid } = req.params;

        const updatedSlug = slug || slugify(name.toLowerCase());

        const category = await Category.findByIdAndUpdate(
            categoryid,
            { name: name.trim(), slug: updatedSlug.trim() },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            category
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Delete Category
export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params;
        await Category.findByIdAndDelete(categoryid);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully."
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Get All Categories
export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find()
            .sort({ name: 1 })
            .lean()
            .exec();

        res.status(200).json({ category });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
