import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(401).send({ message: 'Name is Required' })
    }
    const existingCategory = await categoryModel.findOne({ name })
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: 'Category exists',
      })
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save()
    res.status(201).send({
      success: true,
      message: `"${category.name}" was successfully created!`,
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in creating category',
    })
  }
}

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    const prev = await categoryModel.findById(id)
    const { name } = req.body
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    )
    res.status(200).send({
      success: true,
      message: `"${prev.name}" was updated to "${name}"`,
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      messsage: 'Error while updating category',
    })
  }
}

export const categoriesController = async (req, res) => {
  try {
    const category = await categoryModel.find({})
    res.status(200).send({
      success: true,
      message: 'All Categories',
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error while fetching Categories',
    })
  }
}

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug })
    if (category === null) {
      res.status(500).send({
        message: 'Not Found',
      })
    } else {
      res.status(200).send({
        success: true,
        message: 'Category',
        category,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error while fetching Category',
    })
  }
}

export const deleteCategoryController = async (req, res) => {
  try {
    const { name } = await categoryModel.findByIdAndDelete(req.params.id)
    res.status(200).send({
      success: true,
      message: `"${name}" deleted successfully`,
      name,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while Deleting',
      error,
    })
  }
}
