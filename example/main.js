define(function(require, exports, module) {
	var nav = require('ui/nav');

	$.ajax({
		url: basePath + 'category/list.html?' + new Date().getTime(),
		dataType: "json",
		type: "get",
		async: false,
		success: function(data) {
				var opt = {
					navId: 'myNav',
					attach: 'categoryNav',
					data: data
				};
				var kk = new nav(opt);
		},
		error: function(data) {
			console.log(data);
			alert("出错了！");
		}
	});
	var opt = {
		navId: 'myNav',
		attach: 'categoryNav',
	};

	var kk = new nav(opt);
});