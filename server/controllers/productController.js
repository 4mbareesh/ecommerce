import slugify from 'slugify'
import productModel from '../models/productModel.js'
import categoryModel from '../models/categoryModel.js'
import orderModel from '../models/orderModel.js'
import fs from 'fs'
import braintree from 'braintree'
import dotenv from 'dotenv'

dotenv.config()

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields
    const { image } = req.files

    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is required' })
      case !description:
        return res.status(500).send({ error: 'description is required' })
      case !price:
        return res.status(500).send({ error: 'price is required' })
      case !category:
        return res.status(500).send({ error: 'category is required' })
      case !quantity:
        return res.status(500).send({ error: 'quantity is required' })
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: 'Image is required and should be less than 1mb' })
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) })
    if (image) {
      product.image.data = fs.readFileSync(image.path)
      product.image.contentType = image.type
    }

    await product.save()
    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in creating product',
    })
  }
}

export const viewProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate('category')
      .select('-image')
      .limit(12)
      .sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      Total: products.length,
      message: 'All Products',
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting products',
      error: error.message,
    })
  }
}

export const viewProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select('-image')
      .populate('category')
    res.status(200).send({
      success: true,
      message: 'Single Product fetched',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while getting product',
    })
  }
}

export const viewProductImageController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select('image')
      .populate('image')
    if (product.image.data) {
      res.set('Content-type', product.image.contentType)
      return res.status(200).send(product.image.data)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while getting product image',
    })
  }
}

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select('-image')
    res.status(200).send({
      success: true,
      message: 'Product Deleted Successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while deleting product image',
    })
  }
}

//update

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields
    const { image } = req.files
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is required' })
      case !description:
        return res.status(500).send({ error: 'description is required' })
      case !price:
        return res.status(500).send({ error: 'price is required' })
      case !category:
        return res.status(500).send({ error: 'category is required' })
      case !quantity:
        return res.status(500).send({ error: 'quantity is required' })
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: 'Image is required and should be less than 1mb' })
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    )
    if (image) {
      product.image.data = fs.readFileSync(image.path)
      product.image.contentType = image.type
    }

    await product.save()
    res.status(201).send({
      success: true,
      message: 'Product updated successfully',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in updating product',
    })
  }
}

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body
    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
    const products = await productModel.find(args).select('-image')
    res.status(200).send({
      success: true,
      message: 'Done',
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error in filtering products',
      error,
    })
  }
}

// export const productFilterController = async (req, res) => {
//   try {
//     const { categories, priceRange } = req.body
//     let query = {}
//     // Filter by categories
//     if (categories && categories.length > 0) {
//       query.category = { $in: categories }
//     }

//     // Filter by price range
//     if (priceRange && priceRange.length === 2) {
//       query.price = { $gte: priceRange[0], $lte: priceRange[1] }
//     }

//     // Execute the query
//     const products = await productModel.find(query).select('-image')

//     res.status(200).json({
//       success: true,
//       message: 'Products filtered successfully',
//       products,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: 'Error in filtering products',
//       error,
//     })
//   }
// }

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
      success: true,
      message: 'loaded',
      total,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error in total',
      error,
    })
  }
}

export const productListController = async (req, res) => {
  try {
    const perPage = 8
    const page = req.params.page ? req.params.page : 1
    const products = await productModel
      .find({})
      .select('-image')
      .populate('category')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })

    res.status(200).send({
      success: true,
      message: 'Success',
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error in count',
      error,
    })
  }
}

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      })
      .select('-image')
    res.json(results)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error in Search',
      error,
    })
  }
}

export const relatedProductsController = async (req, res) => {
  try {
    const { pid, cid } = req.params
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select('-image')
      .limit(3)
      .populate('category')
    res.status(200).send({
      success: true,
      message: 'success',
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error in fetching related product',
      error,
    })
  }
}

export const ProductCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug })
    const products = await productModel.find({ category }).populate('category')
    res.status(200).send({
      succes: true,
      message: 'Done',
      category,
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error in fetching Categories',
      error,
    })
  }
}

//payment

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body
    let total = 0
    cart.map((data) => {
      total += data.price
    })
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user.id,
          }).save()
          res.json({ ok: true })
        } else {
          res.status(500).send(error)
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}
