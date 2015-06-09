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
		init.call(this, opt);
	};

	function init(opt) {
		var  i = 0, j = 1, data = {
			nav:[{groupCode:'1',catList:[{linkInfo:'123', name: i++},{linkInfo:'123', name: i++}]},{groupCode:'1',catList:[{linkInfo:'123', name: i++},{linkInfo:'123', name: i++}]},{groupCode:'1',catList:[{linkInfo:'123', name: i++},{linkInfo:'123', name: i++}]}],
			subNav:[{subSection:[{linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}, {linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}]},{subSection:{linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}},{subSection:{linkInfo:'123', name:j++, subLinks:[{linkInfo:'456',name:j++},{linkInfo:'456',name:j++},{linkInfo:'456',name:j++}]}}]
		}, options = $.extend({
				attach: '',
				title: '',
				navId: '',
				htmlNav: _htmlNav,
				htmlSubNav: _htmlSubNav,
				afterRender: $.noop
		}, opt);

		///渲染后可以自己定义一些自定义事件
		setTimeout(function(){
			options.afterRender();
		},0);

		// 导航界面初始化
		var htmlNav = tmpl(options.htmlNav, {
			navId:options.navId,
			data:data.nav
		});
		$("#"+options.attach).append(htmlNav);

		//展开项初始化
		var htmlSubNav = tmpl(options.htmlSubNav, {
			navSubCatId: 'testSubCat',
			data: data.subNav
		});
		$("#"+options.attach).after(htmlSubNav);

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
			//	top: 21
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
	}

	module.exports = _nav;
});