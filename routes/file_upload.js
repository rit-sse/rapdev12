var fs=require('fs');

exports.index = function(req, res) {
  res.render('file_upload', {title: "File Uploader"});
};

exports.post = function(req, res) {
  console.log(req.files);

  // Move the file from a temporary file into a "normal" file
  var new_path = 'uploads/' + req.files.js_file.name;
  fs.rename(req.files.js_file.path, new_path);

  res.redirect("back");
}
