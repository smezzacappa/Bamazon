
const fs = require("fs");
const mysql=require('mysql');
const inquire=require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    // database: 'Songs_db'
});

const readSeed=(path)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(path,"utf8",(err,data)=>{
      if(err) reject(err);
      let arr = data.split(';')
      resolve(arr.splice(0,arr.length-1))
      
    })
  })
}

const readData=(path)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(path,"utf8",(err,data)=>{
      if(err) reject(err)
      let datas=data.split("\n").map(item=>{
          var items = item.split(',')
        return `insert into products (product_name,department_name,price,stock_quantity) values ("${items[0]}","${items[1]}","${items[2]}","${items[3]}")`
      })
      resolve(datas)
    })
  })
}

Promise.all([readSeed("bamazon.sql"),readData("products.csv")])
  .then(data=>{
    return [...data[0],...data[1]]
  })
  .then(data=>{ 
      console.log(data)
      connection.connect()
  data.forEach(statement => {
      connection.query(statement,(err,res)=>{
          if(err) throw err
      })
  })

  
