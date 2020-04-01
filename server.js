  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mirs'
  })
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });

  connection.query('select * from category', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[3]);
  });

  connection.end();