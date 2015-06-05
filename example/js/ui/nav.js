define(function(require, exports, module) {
	var _html = '<ul class="nav nav-pills nav-stacked" id="<%=navId%>" role="menu">\
					<li class="active"><a href="#">Home</a>\
						<div id="subItem"></div>\
					</li>\
					<li role="presentation"><a href="#">Profile</a></li>\
  				<li role="presentation"><a href="#">Messages</a></li>\
				</ul>';

	var _nav = function(opt) {
		this.opt = opt||{};
		var html = tmpl(_html, {
			title:opt.title||'',
			navId: opt.navId||'',
			body:opt.body||'',
			textStyle:opt.textStyle
		});
		opt.attach = opt.attach || '';
		opt.navId = opt.navId||'';
		$("#"+opt.attach).append(html);

		$("#"+opt.navId).menuAim({
			 activate: activateSubmenu,
       deactivate: deactivateSubmenu
		});

		//激活二级菜单
		var activateSubmenu = function(row) {
				alert("哈哈哈");
		};
		//关闭二级菜单
		var deactivateSubmenu = function(row) {

		};

		///渲染后可以自己定义一些自定义事件
		setTimeout(function(){
			opt.afterRender&&opt.afterRender();
		},0);
	};

	_nav.prototype.show = function() {

	};
	_nav.prototype.hide = function() {

	};


	module.exports = _nav;
});