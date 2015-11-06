	

	memoriesModule.post('/upload', function (req, res) {
		setTimeout(
			function () {
				res.setHeader('Content-Type', 'text/html');
				if (req.files.length == 0 || req.files.file.size == 0)
					res.send({ msg: 'No file uploaded at ' + new Date().toString() });
				else {
						var file = req.files.file;
						fs.unlink(file.path, function (err) {
						if (err)
							throw err;
						else
							//res.end("Hello");
							res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });
						});
					}
			},
			(req.param('delay', 'yes') == 'yes') ? 2000 : -1
		);
	});