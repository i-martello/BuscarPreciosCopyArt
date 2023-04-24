const fs = require('fs');
const path = require('path');
const excelReader = require('../excel/ExcelReader');
const ctrlUpdate = {}

ctrlUpdate.add = async (req, res) => {
  
  rutaExcel = path.resolve(__dirname, '../uploads')
  fs.readdir(rutaExcel, (err, files)=>{
    if(err){
      console.log(err);
      return
    }
    excelReader(files[0], (err, productos)=>{
      if(err){
        console.log(err);
        return
      }
      
    })
  })
  res.end();
}

module.exports = ctrlUpdate;