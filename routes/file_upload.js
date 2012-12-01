var fs = require("fs");

exports.index = function(req, res) {
  res.render('file_upload', {title: "File Uploader"});
};

exports.post = function(req, res) {
  console.log(req.files);

  // Check to see if the file is a JS file
  var file = req.files.js_file;
  
  // File is Javascript
  if (file.name.substr(-3) === ".js" && file.type === "application/javascript")
  {
    // Move the file from a temporary file into a "normal" file
    var new_path = 'uploads/' + file.name;
    fs.rename(file.path, new_path);  
  
    res.send(200);
  }

  else {
    console.log("nope");

    res.send(400);
  }



}
