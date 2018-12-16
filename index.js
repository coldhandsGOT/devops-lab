const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //DB-Con              ///////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create:

var db = mysql.createConnection({
host: process.env.MYSQL_HOST,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD,
database: process.env.MYSQL_DATABASE,
port : process.env.MYSQL_PORT,
});


   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //       FIREWALL              ///////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//&apikey=ceciestmonjeton
/*
app.use(function(req, res, next) {
		if ("key" in req.query)
		 {
			var apikey = req.query["key"];
		
			var query = "SELECT * FROM users WHERE  apikey='" + apikey + "'";
			db.query(query, function(err, result, fields) 
			{
				if (err) throw err;
				
				if (result.length > 0) 
				{	
					res.status(200)
					next();
				}
				else {
					res.status(403)
					res.send('Forbidden');
				}
			});
		} else {
		res.status(403)
					res.send('Forbidden');

		}

});

*/
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Animals            ////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create
//access by the body on postman
//all atributes are mandatory for the object creation
app.post('/animals', function(req,res)
{
	var query = "INSERT INTO ANIMALS (";
	var arrayKey={};
	var arrayAtr={};

	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}
		 
	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query + ""+arrayKey[j];

			if(j>0)
				query = query + ", "+arrayKey[j];
	}

	query = query + ") VALUES ('"

	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query +arrayAtr[j]+"'";

			if(j>0)
				query = query + ", '"+arrayAtr[j]+"'";
	}

	query= query+");";

	//var query2 ="INSERT INTO ANIMALS (name, breed) VALUES ('help', 'test') ";

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL
app.get('/animals', function(req,res)
{
	query = "select * ";
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}

	query += "from animals";

//sort
		if ("sort" in req.query) {
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) 
			{
				var direction = sort[index].substr(0, 1);
				var field = sort[index].substr(1);
				query += " " + field;
				if (direction == "-")
					query += " DESC,";
				else
					query += " ASC,";
			}
			query = query.slice(0, -1);
		}
		
//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

//conditions
	var conditions = ["name", "breed", "food_per_day", "birthday", "entry_date", "id_cage"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				if (query.indexOf("WHERE") < 0) 
				{
				query += " WHERE";
				} else {
				query += " AND";
				}
				query += " " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});



 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ BY ID
app.get('/animals/:id(\\d+)', function(req,res)
{
	var id = req.params.id;
	var query = "SELECT *  ";
		 
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}



	query += "FROM animals WHERE id="+id;
	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//delete
app.delete('/animals', function(req, res) {
var query = "DELETE FROM animals";
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});

app.delete('/animals/:id', function(req, res) {
var id = req.params.id;
var query = "DELETE FROM ANIMALS WHERE id=" + id;
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});


   /////////////////////////////////////////////////////////////////////////////////////////////
  //UPDATE             
 //Update Animals

app.put('/animals/:id(\\d+)', function(req, res) 
{
	var id = req.params.id;
	var query = "UPDATE animals set  ";
	var arrayKey={};
	var arrayAtr={};


	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}

	for(var j=0;j<i;j++)
	{
		    if(j==0)
   		 query = query+arrayKey[j]+" = '"+arrayAtr[j]+"' ";

			if(j>0)
				query = query + ", "+arrayKey[j]+ "= '"+arrayAtr[j]+"' ";
	}

	query += "WHERE id ="+id; 

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});







   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Cages            ////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create
//access by the body on postman
//all atributes are mandatory for the object creation
app.post('/cages', function(req,res)
{
	var query = "INSERT INTO cages (";
	var arrayKey={};
	var arrayAtr={};

	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}
		 
	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query + ""+arrayKey[j];

			if(j>0)
				query = query + ", "+arrayKey[j];
	}

	query = query + ") VALUES ('"

	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query +arrayAtr[j]+"'";

			if(j>0)
				query = query + ", '"+arrayAtr[j]+"'";
	}

	query= query+");";

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL
app.get('/cages', function(req,res)
{
	query = "select * ";
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}

	query += "from cages";

//sort
		if ("sort" in req.query) {
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) 
			{
				var direction = sort[index].substr(0, 1);
				var field = sort[index].substr(1);
				query += " " + field;
				if (direction == "-")
					query += " DESC,";
				else
					query += " ASC,";
			}
			query = query.slice(0, -1);
		}
		
//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

//conditions
	var conditions = ["name", "description", "area"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				if (query.indexOf("WHERE") < 0) 
				{
				query += " WHERE";
				} else {
				query += " AND";
				}
				query += " " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});



 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ BY ID
app.get('/cages/:id(\\d+)', function(req,res)
{
	var id = req.params.id;
	var query = "SELECT *  ";
		 
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}



	query += "FROM cages WHERE id="+id;
	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//delete
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/cages', function(req, res) {
var query = "DELETE FROM cages";
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});

app.delete('/cages/:id', function(req, res) {
var id = req.params.id;
var query = "DELETE FROM cages WHERE id=" + id;
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});


   /////////////////////////////////////////////////////////////////////////////////////////////
  //UPDATE              /////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Update cages

app.put('/cages/:id(\\d+)', function(req, res) 
{
	var id = req.params.id;
	var query = "UPDATE cages set  ";
	var arrayKey={};
	var arrayAtr={};


	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}

	for(var j=0;j<i;j++)
	{
		    if(j==0)
   		 query = query+arrayKey[j]+" = '"+arrayAtr[j]+"' ";

			if(j>0)
				query = query + ", "+arrayKey[j]+ "= '"+arrayAtr[j]+"' ";
	}

	query += "WHERE id ="+id; 

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});



   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FOOD            ////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create
//access by the body on postman
//all atributes are mandatory for the object creation
app.post('/food', function(req,res)
{
	var query = "INSERT INTO food (";
	var arrayKey={};
	var arrayAtr={};

	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}
		 
	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query + ""+arrayKey[j];

			if(j>0)
				query = query + ", "+arrayKey[j];
	}

	query = query + ") VALUES ('"

	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query +arrayAtr[j]+"'";

			if(j>0)
				query = query + ", '"+arrayAtr[j]+"'";
	}

	query= query+");";

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL
app.get('/food', function(req,res)
{
	query = "select * ";
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}

	query += "from food";

//sort
		if ("sort" in req.query) {
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) 
			{
				var direction = sort[index].substr(0, 1);
				var field = sort[index].substr(1);
				query += " " + field;
				if (direction == "-")
					query += " DESC,";
				else
					query += " ASC,";
			}
			query = query.slice(0, -1);
		}
		
//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

//conditions
	var conditions = ["name", "quantity", "id_animal"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				if (query.indexOf("WHERE") < 0) 
				{
				query += " WHERE";
				} else {
				query += " AND";
				}
				query += " " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});



 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ BY ID
app.get('/food/:id(\\d+)', function(req,res)
{
	var id = req.params.id;
	var query = "SELECT *  ";
		 
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}



	query += "FROM food WHERE id="+id;
	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//delete

app.delete('/food', function(req, res) {
var query = "DELETE FROM food";
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});

app.delete('/food/:id', function(req, res) {
var id = req.params.id;
var query = "DELETE FROM food WHERE id=" + id;
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});

  /////////////////////////////////////////////////////////////////////////////////////////////
  //Food              /////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Update food

app.put('/food/:id(\\d+)', function(req, res) 
{
	var id = req.params.id;
	var query = "UPDATE food set  ";
	var arrayKey={};
	var arrayAtr={};


	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}

	for(var j=0;j<i;j++)
	{
		    if(j==0)
   		 query = query+arrayKey[j]+" = '"+arrayAtr[j]+"' ";

			if(j>0)
				query = query + ", "+arrayKey[j]+ "= '"+arrayAtr[j]+"' ";
	}

	query += "WHERE id ="+id; 

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});




   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //STAFF            ////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create
//access by the body on postman
//all atributes are mandatory for the object creation
app.post('/staff', function(req,res)
{
	var query = "INSERT INTO staff (";
	var arrayKey={};
	var arrayAtr={};

	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}
		 
	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query + ""+arrayKey[j];

			if(j>0)
				query = query + ", "+arrayKey[j];
	}

	query = query + ") VALUES ('"

	for(var j=0;j<i;j++)
	{
		    if(j==0)
				query = query +arrayAtr[j]+"'";

			if(j>0)
				query = query + ", '"+arrayAtr[j]+"'";
	}

	query= query+");";

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL
app.get('/staff', function(req,res)
{
	query = "select * ";
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}

	query += "from staff";

//sort
//usage example:  key = sort value=+id
		if ("sort" in req.query) {
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) 
			{
				var direction = sort[index].substr(0, 1);
				var field = sort[index].substr(1);
				query += " " + field;
				if (direction == "-")
					query += " DESC,";
				else
					query += " ASC,";
			}
			query = query.slice(0, -1);
		}
		
//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

//conditions
	var conditions = ["firstname", "lastname", "wage"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				if (query.indexOf("WHERE") < 0) 
				{
				query += " WHERE";
				} else {
				query += " AND";
				}
				query += " " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});



 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL
//READ BY ID
app.get('/staff/:id(\\d+)', function(req,res)
{
	var id = req.params.id;
	var query = "SELECT *  ";
		 
//filtering fields
//usage example: key: fields value: name
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"].toString();
			var key = arrayKeys.toString().split(',');

			query = query.replace("*", arrayKeys);
		}



	query += "FROM staff WHERE id="+id;
	db.query(query, function(err, result, fields) {
	if (err) throw err;
	res.send(JSON.stringify(result));
	});
});
  /////////////////////////////////////////////////////////////////////////////////////////////
  //UPDATE              /////////////////////////////////////////////////////////////////////////////////////////////

app.put('/staff/:id(\\d+)', function(req, res) 
{
	var id = req.params.id;
	var query = "UPDATE staff set  ";
	var arrayKey={};
	var arrayAtr={};


	var i =0;

	for (const key in req.body) 
	{
			arrayKey[i] = key;
			arrayAtr[i] = req.body[key];
		  	i++;
	}

	for(var j=0;j<i;j++)
	{
		    if(j==0)
   		 query = query+arrayKey[j]+" = '"+arrayAtr[j]+"' ";

			if(j>0)
				query = query + ", "+arrayKey[j]+ "= '"+arrayAtr[j]+"' ";
	}

	query += "WHERE id ="+id; 

	db.query(query, function(err, result, fields) 
	{
	if (err) throw err;
	res.send(JSON.stringify("Success"));
	});		

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//delete
app.delete('/staff', function(req, res) {
var query = "DELETE FROM staff";
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});

app.delete('/staff/:id', function(req, res) {
var id = req.params.id;
var query = "DELETE FROM staff WHERE id=" + id;
db.query(query, function(err, result, fields) {
if (err) throw err;
res.send(JSON.stringify("Delete"));
});
});


-





   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //RELATIONSHIP ANIMALS/CAGES              ///////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL ANIMALS/ID/CAGES
app.get('/animals/:id/cages', function(req, res) 
{
		var id = req.params.id;

		var query = "SELECT cages.id, cages.name, cages.description, cages.area";

//fields
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"];
			if(Array.isArray(arrayKeys) ==false)
				{
					arrayKeys = "cages."+arrayKeys;
				}
				else
					for(var i=0; i<arrayKeys.length; i++)
					{
							arrayKeys[i] = "cages."+arrayKeys[i];
					}
			query = query.replace("cages.id, cages.name, cages.description, cages.area", arrayKeys);
		}


		query += " FROM animals INNER JOIN cages ON animals.id_cage = cages.id WHERE animals.id="+id;

//conditions
	var conditions = ["id", "name", "description", "area"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				query += " AND " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

		db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
		});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ BY ONE ANIMALS/ID/CAGES/ID

app.get('/animals/:id_animals/cages/:id_cages', function(req, res) 
{
		var id_animals = req.params.id_animals;
		var id_cages = req.params.id_cages;


		var query = "SELECT cages.id, cages.name, cages.description, cages.area";

//fields
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"];

			if(Array.isArray(arrayKeys) ==false)
				{
					arrayKeys = "cages."+arrayKeys;
				}
				else
					for(var i=0; i<arrayKeys.length; i++)
					{
							arrayKeys[i] = "cages."+arrayKeys[i];
					}
				
			query = query.replace("cages.id, cages.name, cages.description, cages.area", arrayKeys);
		}


		query += " FROM animals INNER JOIN cages ON animals.id_cage = cages.id WHERE animals.id="+id_animals+" AND cages.id = "+id_cages;

//conditions
	var conditions = ["id", "name", "description", "area"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				query += " AND " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

		db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
		});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL CAGES IN ANIMALS
app.get('/cages/:id/animals', function(req, res) 
{
		var id = req.params.id;

		var query = "SELECT animals.id, animals.name, animals.breed, animals.food_per_day, animals.birthday, animals.entry_date, animals.id_cage";
//fields
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"];
			if(Array.isArray(arrayKeys) ==false)
				{
					arrayKeys = "animals."+arrayKeys;
				}
				else
					for(var i=0; i<arrayKeys.length; i++)
					{
							arrayKeys[i] = "animals."+arrayKeys[i];
					}
			query = query.replace("animals.id, animals.name, animals.breed, animals.food_per_day, animals.birthday, animals.entry_date, animals.id_cage", arrayKeys);
		}


		query += " FROM cages INNER JOIN animals ON cages.id = animals.id_cage  WHERE cages.id="+id;

//conditions
	var conditions = ["id", "name", "breed", "food_per_day", "birthday", "entry_date", "id_cage"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				query += " AND " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

		db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
		});
});



   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //RELATIONSHIP FOOD/ANIMALS               ///////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL FOOD/ID/ANIMALS

//READ ALL ANIMALS/ID/CAGES
app.get('/food/:id/animals', function(req, res) 
{
		var id = req.params.id;

		var query = "SELECT animals.id, animals.name, animals.breed, animals.food_per_day, animals.birthday, animals.entry_date, animals.id_cage";

//fields
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"];
			if(Array.isArray(arrayKeys) ==false)
				{
					arrayKeys = "animals."+arrayKeys;
				}
				else
					for(var i=0; i<arrayKeys.length; i++)
					{
							arrayKeys[i] = "animals."+arrayKeys[i];
					}
			query = query.replace("animals.id, animals.name, animals.breed, animals.food_per_day, animals.birthday, animals.entry_date, animals.id_cage", arrayKeys);
		}


		query += " FROM food INNER JOIN animals ON food.id_animal= animals.id WHERE food.id="+id;

//conditions
	var conditions = ["id", "name", "breed", "food_per_day","birthday","entry_date","id_cage"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				query += " AND " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

		db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
		});
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ BY ONE ANIMALS/ID/CAGES/ID

app.get('/food/:id_food/animals/:id_animals', function(req, res) 
{
		var id_animals = req.params.id_animals;
		var id_food = req.params.id_food;


		var query = "SELECT animals.id, animals.name, animals.breed, animals.food_per_day, animals.birthday, animals.entry_date, animals.id_cage";

//fields
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"];

			if(Array.isArray(arrayKeys) ==false)
				{
					arrayKeys = "animals."+arrayKeys;
				}
				else
					for(var i=0; i<arrayKeys.length; i++)
					{
							arrayKeys[i] = "animals."+arrayKeys[i];
					}
				
			query = query.replace("animals.id, animals.name, animals.breed, animals.food_per_day, animals.birthday, animals.entry_date, animals.id_cage", arrayKeys);
		}

		query += " FROM food INNER JOIN animals ON food.id_animal = animals.id WHERE food.id="+id_food+" AND animals.id = "+id_animals;

//conditions
	var conditions = ["id", "name", "breed", "food_per_day","birthday","entry_date","id_cage"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				query += " AND " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

		db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
		});
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ ALL ANIMALS IN FOOD
app.get('/animals/:id/food', function(req, res) 
{
		var id = req.params.id;

		var query = "SELECT food.id, food.name, food.quantity, food.id_animal";
//fields
	if ("fields" in req.query) 
		{
			arrayKeys= req.query["fields"];
			if(Array.isArray(arrayKeys) ==false)
				{
					arrayKeys = "food."+arrayKeys;
				}
				else
					for(var i=0; i<arrayKeys.length; i++)
					{
							arrayKeys[i] = "food."+arrayKeys[i];
					}
			query = query.replace("food.id, food.name, food.quantity, food.id_animal", arrayKeys);
		}


		query += " FROM animals INNER JOIN food ON animals.id = food.id_animal  WHERE animals.id="+id;

//conditions
	var conditions = ["id", "name", "quantity", "id_animal"];
		
		for (var index in conditions) 
		{
			if (conditions[index] in req.query) 
			{
				query += " AND " + conditions[index] + "='" +
				req.query[conditions[index]] + "'";
			}
		}

//pagination
//usage example:  key = limit value 1
		if ("limit" in req.query) 
		{
			query += " LIMIT " + req.query["limit"];
			if ("offset" in req.query) 
			{
			query += " OFFSET " + req.query["offset"];
			}
		}	

		db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
		});
});





   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //food-stats                /////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Simple food stats:
 app.get('/food-stats', function(req, res) {


    var query = "SELECT a.id as id , IF(food_per_day=0,0, quantity/food_per_day) as days_left FROM animals a JOIN food f WHERE a.id = f.id_animal";


    db.query(query, function(err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  });
  




app.listen(5000, function()
{
	db.connect(function(err){
		if (err) throw err;
	console.log('Connection to database successful!!!');
	});
	console.log("listening on port 3000!")
});