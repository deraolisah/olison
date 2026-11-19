import Product from "../models/ProductModel.js";

// GET /api/products
export async function getProducts(req, res, next) {
  try {
    const { search, category, featured, sort } = req.query;
    const filter = {};

    if (category && category !== "all") filter.category = category.toLowerCase();
    if (featured === "true") filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sortBy = { createdAt: -1 };
    if (sort === "price-low") sortBy = { price: 1 };
    if (sort === "price-high") sortBy = { price: -1 };
    if (sort === "name") sortBy = { name: 1 };

    const products = await Product.find(filter).sort(sortBy);
    res.json(products);
  } catch (err) {
    next(err);
  }
}

// GET /api/products/:id
export async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

// POST /api/products  (admin)
export async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

// PUT /api/products/:id  (admin)
export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/products/:id  (admin)
export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ id: req.params.id, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
}