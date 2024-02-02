import CategoryModel from "../models/category.mjs";

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
