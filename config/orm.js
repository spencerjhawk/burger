var connection = require('./connection.js');

// mysql connection
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };
  console.log('connected as id ' + connection.threadId);
});

var orm = {
	// returns all table entries
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";";

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			// callback results
			cb(result);
		});
	},

	// inserts single table entry
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			// callback results
			cb(result);
		});
	},

	// updates single table entry
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			// callback results
			cb(result);
		});
	}
};

module.exports = orm;