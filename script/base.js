(function(window, angular , undefined) {
	window.ARGUMENTS = {}; //?号后面的参数
	window.KEYCODE = {
		"space":32,
		"enter":13,
		"delete":8
	}

	if(window.location.search.length>0){
		window.ARGUMENTS = {};
		var search = window.location.search.replace("?","");
		var searchArr = search.split("&");
		for (var i = searchArr.length - 1; i >= 0; i--) {
			searchArr[i] = searchArr[i].split("=");
			window.ARGUMENTS[searchArr[i][0]] = searchArr[i][1];
		};
	}

	angular.module('commonUtil', ['ng','ngCookies']);
})(window,window.angular);