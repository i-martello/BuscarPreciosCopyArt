const productoSchema = require('../models/product');
const { search } = require('../routes/products');

const ctrlProduct = {}


ctrlProduct.getStatic = async (req, res)=> {
  const variabless = 'cuader'
  const productos = await productoSchema.find({name: { $regex: 'cuade', $options: 'i' }});
  res.json({productos});
}

ctrlProduct.getAll = async (req, res)=>{
    let filtro = {}
    if(req.query.search){
      const { search } = req.query
      filtro = {name: { $regex: search, $options: 'i' }}
    }
    const productos = await productoSchema.find(filtro);
      res.json({productos});
  }

module.exports = ctrlProduct;