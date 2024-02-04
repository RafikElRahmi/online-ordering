import CategoryModel from "../models/category.mjs";
import ProductCategoryModel from "../models/productCategory.mjs";

export async function getCategories(req, res, next) {
  try {
    CategoryModel.getAll((err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.length) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function getAvailableCategories(req, res, next) {
  try {
    ProductCategoryModel.getAll((err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.length) {
        const relations =result
        const originalArray = result.map((ele) => ele.category_id);
        const uniqueIdCategory = originalArray.filter(
          (item, index, self) => index === self.indexOf(item)
        );
        const categories =[]
        uniqueIdCategory.forEach((element,ind) => {
          CategoryModel.getOne(element, (err, result) => {
            if (err) return res.status(500).send("Internal Server Error");
            categories.push(result[0]);
            if (ind === uniqueIdCategory.length - 1)
              return res.status(200).send({categories,relations  });
          });
        });
        
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function getCategory(req, res, next) {
  try {
    const id = req.params.id;
    CategoryModel.getOne(id, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.length) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function createCategory(req, res, next) {
  try {
    const categoryData = req.body;
    CategoryModel.add(categoryData, (err, result) => {
      if (err) return res.status(500).send("Internal Server Error");
      else {
        return res.status(201).send("created");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function updateCategory(req, res, next) {
  try {
    const id = req.params.id;
    const categoryData = req.body;
    CategoryModel.update(id, categoryData, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.affectedRows === 1) {
        return res.status(200).send("updated");
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function deleteCategory(req, res, next) {
  try {
    const id = req.params.id;
    CategoryModel.remove(id, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else {
        return res.status(200).send("deleted");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function getOptions(req, res, next) {
  try {
    CategoryModel.getAll((err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.length) {
        const options = [];
        result.forEach((element) => {
          options.push({ value: element.id, label: element.name });
          if (options.length == result.length) {
            return res.status(200).send(options);
          }
        });
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
