const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql =require('mysql');
const cors = require('cors');
var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database :"testing",
    multipleStatements:true
});
mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("connectée");
    }
    else{
        console.log("connection failed");
    }
})
const PORT = 4000;
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//add new produict
app.post('/save',(req,res) =>{
    //let data = {nom:req.body.nom,adresse:req.body.adresse};
    let sql = "INSERT into businees SET?";
    let query=mysqlConnection.query(sql,req.body,(err, results) =>{
       if(err) throw err;
       res.json({
           status:200
       });
    });
   });

   //add new client
app.post('/saveclient',(req,res) =>{
    //let data = {nom:req.body.nom,adresse:req.body.adresse};
    let sql = "INSERT into eleve SET?";
    let query=mysqlConnection.query(sql,req.body,(err, results) =>{
       if(err) throw err;
       res.json({
        status:200
    });
      // res.redirect('/');
    });
   });

   //add new fournisseur
app.post('/savefourni',(req,res) =>{
    //let data = {nom:req.body.nom,adresse:req.body.adresse};
    let sql = "INSERT into infoperson SET?";
    let query=mysqlConnection.query(sql,req.body,(err, results) =>{
       if(err) throw err;
      // res.redirect('/');
      res.json({
        status:200
    });
    });
   });

    //add new fournisseur
app.post('/savefourni12',(req,res) =>{
    const numpro = req.body.numpro;
    let sql = `SELECT business_name,business_gst_number from businees where id=${numpro}`;
    var query=mysqlConnection.query(sql,(err, rows) =>{
       if(err) throw err;
      // res.redirect('/');
      res.json(rows);
    });
   });

    //add new fournisseur
app.post('/savefourni122',(req,res) =>{
    //const numpro = req.body.numpro;
    let sql = "UPDATE businees set business_gst_number='"+req.body.business_gst_number+"' where id='"+req.body.numpro+"'";
    var query=mysqlConnection.query(sql,(err, rows) =>{
       if(err) throw err;
      // res.redirect('/');
      res.json({
        status:200
    });
    });
   });

   //add new commande
app.post('/savecom',(req,res) =>{
    /*const quantite = req.body.quantite;
    let sql = `SELECT business_gst_number from businees where id= ${quantite}`;
    var query=mysqlConnection.query(sql,(err, rows) =>{
       if(err) throw err;
      // res.redirect('/');
      var stock=parseInt(rows.business_gst_number);
      if (stock > req.body.quantite ){*/
         // var quanite1=parseInt(results.business_gst_number)-parseInt(req.body.quantite);
          let sql1="INSERT into commande SET?";
          let query1=mysqlConnection.query(sql1,req.body,(err,result1) =>{
            if(err) throw err;
            res.json({
                status:200
            });
          });
      //}
    });
   //});
   //index of produits
app.get('/',(req, res) =>{
    let sql ="SELECT *from businees order by id desc";
    let query = mysqlConnection.query(sql, (err,rows) =>{
       if(err) throw err;
        res.json(rows);
    });
   });

   //index of comptable
app.get('/comptable',(req, res) =>{
    let sql ="SELECT eleve.person_name,sum(commande.montant)as okay from eleve,commande where eleve.id=commande.numcli group by commande.numcli";
    let query = mysqlConnection.query(sql, (err,rows) =>{
       if(err) throw err;
        res.json(rows);
    });
   });

//index of commande
app.get('/indexcom',(req, res) =>{
    let sql ="SELECT commande.id,eleve.person_name as nomclient,businees.person_name as libelle,commande.quantite,commande.date from commande,businees,eleve where (eleve.id=commande.numcli and businees.id=commande.numpro) order by commande.id desc";
    let query = mysqlConnection.query(sql, (err,rows) =>{
       if(err) throw err;
        res.json(rows);
    });
   });

   //index of produits2
app.get('/',(req, res) =>{
    let sql ="SELECT *from businees order by id desc";
    let query = mysqlConnection.query(sql, (err,rows1) =>{
       if(err) throw err;
        res.json(rows1);
    });
   });

   //index of client
app.get('/client',(req, res) =>{
    let sql ="SELECT *from eleve order by id desc";
    let query = mysqlConnection.query(sql, (err,rows) =>{
       if(err) throw err;
        res.json(rows);
    });
   });

   //index of fournisseur
app.get('/fournisseur',(req, res) =>{
    let sql ="SELECT *from infoperson order by id desc";
    let query = mysqlConnection.query(sql, (err,rows) =>{
       if(err) throw err;
        res.json(rows);
    });
   });

   //edit produits
  app.get('/edit/:userNumcli',(req,res) =>{
    const userNumcli= req.params.userNumcli;
    let sql =` SELECT *from businees where id= ${userNumcli}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json(result[0]);
    });
});

//edit client
app.get('/editcli/:userNumcli2',(req,res) =>{
    const userNumcli2= req.params.userNumcli2;
    let sql =` SELECT *from eleve where id= ${userNumcli2}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json(result[0]);
    });
});

//commande
//edit client
app.get('/commande/:userNumclii2',(req,res) =>{
    const userNumclii2= req.params.userNumclii2;
    let sql =` SELECT *from eleve where id= ${userNumclii2}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json(result[0]);
    });
});

//edit fournisseur
app.get('/editfourni/:userFourni',(req,res) =>{
    const userFourni= req.params.userFourni;
    let sql =` SELECT *from infoperson where id= ${userFourni}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json(result[0]);
    });
});

//edit commande
app.get('/editcom/:userFourni12',(req,res) =>{
    const userFourni12= req.params.userFourni12;
    let sql =` SELECT *from commande where id= ${userFourni12}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json(result[0]);
    });
});

//update prod
app.post('/updatepro/:userNumcli1',(req,res) =>{
    const userNumcli1= req.params.userNumcli1;
    let data = {person_name:req.body.person_name,business_name:req.body.business_name,business_gst_number:req.body.business_gst_number};
    let sql ="UPDATE businees set person_name='"+req.body.person_name+"' ,business_name='"+req.body.business_name+"' , business_gst_number='"+req.body.business_gst_number+"' where id='"+userNumcli1+"'";
    let query=mysqlConnection.query(sql,data,(err, results) =>{
        if(err) throw err;
        res.json({
            status:200
        });
    });
   });

   //update client
app.post('/updatecli/:userNumcli3',(req,res) =>{
    const userNumcli3= req.params.userNumcli3;
    let data = {person_name:req.body.person_name,business_name:req.body.business_name};
    let sql ="UPDATE eleve set person_name='"+req.body.person_name+"' ,business_name='"+req.body.business_name+"' where id='"+userNumcli3+"'";
    let query=mysqlConnection.query(sql,data,(err, results) =>{
        if(err) throw err;
        res.json({
            status:200
        });
    });
   });


   //update fournisseur
app.post('/updatefourni/:userFourni1',(req,res) =>{
    const userFourni1= req.params.userFourni1;
    let data = {person_name:req.body.person_name,business_name:req.body.business_name};
    let sql ="UPDATE infoperson set person_name='"+req.body.person_name+"' ,business_name='"+req.body.business_name+"' where id='"+userFourni1+"'";
    let query=mysqlConnection.query(sql,data,(err, results) =>{
        if(err) throw err;
        res.json({
            status:200
        });
    });
   });

   //update commande
app.post('/updatecom/:userFourni111',(req,res) =>{
    const userFourni111= req.params.userFourni111;
    let data = {numcli:req.body.numcli,numpro:req.body.numpro,quantite:req.body.quantite,date:req.body.date,montant:req.body.montant};
    let sql ="UPDATE commande set numcli='"+req.body.numcli+"' ,numpro='"+req.body.numpro+"' ,quantite='"+req.body.quantite+"', date='"+req.body.date+"' ,montant='"+req.body.montant+"' where id='"+userFourni111+"'";
    let query=mysqlConnection.query(sql,data,(err, results) =>{
        if(err) throw err;
        res.json({
            status:200
        });
    });
   });

   //delete produits
   app.get('/delete/:userNumcli',(req,res) =>{
    const userNumcli= req.params.userNumcli;
    let sql =` DELETE from businees where id= ${userNumcli}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json('Successfully removed');
    });

});

//delete client
app.get('/deletecli/:userNumcli',(req,res) =>{
    const userNumcli= req.params.userNumcli;
    let sql =` DELETE from eleve where id= ${userNumcli}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json('Successfully removed');
    });

});

//delete fournisseur
app.get('/deletefourni/:userFourni2',(req,res) =>{
    const userFourni2= req.params.userFourni2;
    let sql =` DELETE from infoperson where id= ${userFourni2}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json('Successfully removed');
    });

});

//delete commande
app.get('/deletecom/:userFourni3',(req,res) =>{
    const userFourni3= req.params.userFourni3;
    let sql =` DELETE from commande where id= ${userFourni3}`;
    let query=mysqlConnection.query(sql,(err, result) =>{
        if(err) throw err;
        res.json('Successfully removed');
    });

});

app.listen(PORT, function(){
console.log('Server is running on Port:',PORT);
});