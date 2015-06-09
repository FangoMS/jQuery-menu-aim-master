define(function(require, exports, module) {
	var _htmlNav = '<div class="nav nav-locked nav-cat" id="<%=navId%>" role="menu">\
			<% for(var i = 0;i<data.length;i++) { var navItem = data[i];%>\
					<div class="item cat<%=i %>" data-group=<%=data[i].groupCode %>>\
					<% for(var j = 0;j<navItem.catList.length;j++) { var cat = navItem.catList[j]; if(j>0) {%> 、 <% } %>\
						<a target="_blank" href="<%=cat.linkInfo %>"><%=cat.name%></a>\
						<% } %>\
						<i>></i></div>\
			<% }%>\
				</div>';

		var _htmlSubNav = '<div class="nav-subcats" id="<%=navSubCatId %>">\
			<% for(var i = 0;i<data.length;i++) { var navSubcat = data[i]; console.log(navSubcat);%>\
				<div class="nav-subcat nav-template">\
				<% for(var j = 0;j<navSubcat.subSection.length;j++) { var subSection = navSubcat.subSection[j]; %>\
					<div class="nav-subcat-section">\
						<div class="nav-subcat-title"><a href="<%=subSection.linkInfo %>" class="nav-title"><span class="nav-title-text"><%=subSection.name %></span></a></div>\
						<div class="nav-subcat-links">\
								<% for(var k = 0;k<subSection.subLinks.length;k++) { var sublink = subSection.subLinks[k]; if(k>0) {%> | <% } %>\
									<a href="<%=sublink.linkInfo %>" class="nav-item"><span class="nav-link-text"><%=sublink.name %></span></a>\
									<% } %>\
						</div>\
					</div>\
					<% } %>\
				</div>\
				<% } %>\
			</div>';

	var _nav = function(opt) {
		this.opt = opt||{};
		// var html = tmpl(_html, {
		// 	title:opt.title||'',
		// 	navId: opt.navId||'',
		// 	body:opt.body||'',
		// 	textStyle:opt.textStyle
		// });
		this.opt.attach = opt.attach || '';
		this.opt.navId = opt.navId||'';

		this.htmlNav = _htmlNav;
		this.htmlSubNav = _htmlSubNav;

//		$("#"+opt.attach).append(html);

// 		var $menu = $("#myNav");
// //		console.log($menu);
// 		$menu.menuAim({
// 			 activate: activateSubmenu,
//        deactivate: deactivateSubmenu
// 		});

		//激活二级菜单

		// function activateSubmenu(row) {
		// 	alert("哈哈哈");
		// }

		// //关闭二级菜单
		// function deactivateSubmenu(row) {

		// }

		///渲染后可以自己定义一些自定义事件
		setTimeout(function(){
			opt.afterRender&&opt.afterRender();
		},0);
	};

	_nav.prototype.init = function(){
		//导航栏初始化
		var i = 0;
		var j = 11;
		var data = {
			nav:[{groupCode:'1',catList:[{linkInfo:'123', name: i++},{linkInfo:'123', name: i++}]},{groupCode:'1',catList:[{linkInfo:'123', name: i++},{linkInfo:'123', name: i++}]},{groupCode:'1',catList:[{linkInfo:'123', name: i++},{linkInfo:'123', name: i++}]}],
			subNav:[{subSection:[{linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}, {linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}]},{subSection:{linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}},{subSection:{linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}}]
		};
	//	console.log(this.htmlNav);
		var htmlNav = tmpl(this.htmlNav, {
			navId:this.opt.navId,
			data:data.nav
		});
		
		$("#"+this.opt.attach).append(htmlNav);

		//展开项初始化
		var htmlSubNav = tmpl(this.htmlSubNav, {
			navSubCatId: 'testSubCat',
			data: data.subNav
		});
		$("#"+this.opt.attach).after(htmlSubNav);

	//	var $menu = $("#"+this.opt.navId);
		var $menu = $("#myNav");
		console.log($menu);
		$menu.menuAim({
			activate: cc,
   		deactivate: deactivateSubmenu,
   		rowSelector: "> div",
   		exitMenu: exitMenu
		});

		function exitMenu() {
			//当鼠标离开submenu的时候，关闭submenu
			$('.nav-subcats').mouseleave(function(event) {
					
			});
		}

		$(".nav-all").mouseleave(function(event) {
			$(".nav-subcats").css("display", "none");
		});

		function cc(row) {
			var $row = $(row);
      var left = $menu.offset().left;
      var top = $menu.offset().top;

			$(".nav-subcats").css({
				display: "block",
				// top: 10,
				left: left + 118,
				top: top
			});
			$(".nav-subcats>div.nav-subcat").eq($row.index()).css({
				display: "block",
				top: 21
			});
			
		}

		function deactivateSubmenu(row) {
			var $row = $(row);
			$(".nav-subcats").css({
				display: "none",
			});
			$(".nav-subcats>div.nav-subcat").eq($row.index()).css({
				display: "none",
			});
		}

		$(document).click(function() {
			$(".nav-subcats").css("display", "none");
		});
/*			$.ajax({
				url: "",
				type: "post",
				dataType: "json",
				success: function(data) {
					//创建左侧导航栏的一级列表
						var nav = data.nav;
						var htmlNav = tmpl(_htmlNav, {
								data: nav
						});
						$("#"+this.opt.attach).append(htmlNav);

						//创建左侧导航栏的子列表
						var subNav = data.subNav;
						var htmlSubNav = tmpl(_htmlSubNav, {
							data: subNav
						});

				},
				error: function(data) {
					alert("出错了！");
					console.log(data);
				}
			});*/
	};

	_nav.prototype.show = function() {

	};
	_nav.prototype.hide = function() {

	};


	module.exports = _nav;
});