define(function(require, exports, module) {
	var nav = require('ui/nav');

	var opt = {
		navId: 'myNav',
		attach: 'categoryNav',
	};

	var kk = new nav(opt);
	kk.init();
});