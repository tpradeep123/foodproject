var mysql=require('mysql')

var foodpool=mysql.createPool({

host:'localhost',
port:3306,
user:'root',
database:'food',
password:'1234',
multipleStatements:true,
connectionLimit:100

})


module.exports=foodpool