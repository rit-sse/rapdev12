$('#upload-ui input[type=submit]').click(function() {
	var formdata = 'change me';
	$.ajax({
		url: '/file_upload',
		type: 'POST',
		data: formdata,
		processData: false,
		contentType: false,
		success: function(res) {
			$('#js_file').html(res);
		}
	});
});
