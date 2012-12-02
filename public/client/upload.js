
document.getElementById('js_file').addEventListener('change', function(evt) {
    this.files = evt.target.files;
    console.log("File change duly noted!!");
}, false);


document.getElementById('upload_go').addEventListener('click', function() {
    var fileIn = document.getElementById('js_file');
    console.log("Trying to send file!");
    if (fileIn && fileIn.files) {
        console.log("Sending file!");
        var reader = new FileReader();
        reader.readAsText(fileIn.files[0]);
        reader.onload = function(e) { 
            console.log("File Emitted!");
            biogame.socket.emit("file_upload",{
                name: fileIn.files[0].name,
                contents: e.target.result
            });
        }
    }
});