import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newProduct = new Product({ name, price, image });
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
