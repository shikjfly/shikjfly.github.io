window.onload = function(){

	/*  ----------------登录模块---------------------  */
	(function(){

		var username = document.getElementById('username'),
			password = document.getElementById('password'),
			authorized = document.getElementById('authorized'),
			login_form = document.getElementById('login-form'),
			login_submit = document.getElementById('login-submit'),
			logout_link = document.getElementById('logout-link'),
			register = document.getElementById('register'),
			login_link = document.getElementById('login-link');
				
			login_link.addEventListener("click",showloginForm,true);
			function showloginForm(){
				login_link.style.display = "none";
				register.style.display = "none";
				login_submit.style.display = "block";
				login_form.style.display = "block";
				username.value = "";
				password.value = "";
			}
			
			login_submit.addEventListener("click",showAuthor,true);
			function showAuthor(){
				if ( (username.value == "shikjfly") && (password.value == 123) ) {				
					login_link.style.display = "none";
					register.style.display = "none";
					login_submit.style.display = "none";
					login_form.style.display = "none";
					authorized.style.display = "block";
				}else{
					alert("请输入正确的用户名和密码，密码和用户名是提示框里面的")
				}
			}

			logout_link.addEventListener("click",showLoginBtn,true);
			function showLoginBtn(){
				login_link.style.display = "block";
				register.style.display = "block";
				login_submit.style.display = "none";
				login_form.style.display = "none";
				authorized.style.display = "none";
			}
	})();


	/*  ----------------捐赠模块---------------------  */
	(function(){
		var donation_address = document.getElementById("donation-address"),
		    donation_form = document.getElementById("donate-form-container"),
		    donate_botton = document.getElementById("donate-botton"),
		    donate_later_link = document.getElementById("donate-later-link");

		donate_botton.addEventListener("click",showDonateBtn,true);
		function showDonateBtn(){
			donation_form.style.display = "block";
			donation_address.style.display = "none";
		}

		donate_later_link.addEventListener("click",hiddeDonateBtn,true);
		function hiddeDonateBtn(){
			donation_form.style.display = "none";
			donation_address.style.display = "block";
		}
	})();


	/*  ----------------地理位置模块---------------------  */
	(function(){

		var locationUI = document.getElementById('location-ui');
		var locationMap = document.getElementById('location-map');
		

	   // 地理位置调用成功函数
		function successGeoData(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			successMessage += '<br> 维度Latitude = ' + latitude;
			successMessage += '<br> 经度Longitude = ' + longitude;
			successMessage += '<br> 精度Accuracy = ' + position.coords.accuracy + ' 米';
			console.log(successMessage);	
			locationUI.innerHTML = successMessage;			
			
			var map = new BMap.Map(locationMap); 
			var point = new BMap.Point(120.38345, 30.30025); 
			map.centerAndZoom(point, 15);  
		}

	   // 地理位置调用失败函数
		function failGeoData(error) {
			console.log('error code = ' + error.code);			
			switch(error.code) {
				case error.POSITION_UNAVALABLE:
					errorMessage = "定位失败,位置信息是不可用";
					break;
				case error.PERMISSION_DENIED:
					errorMessage = "定位失败,用户拒绝请求地理定位";
					break;
				case error.TIMEOUT:
					errorMessage = "定位失败,请求获取用户位置超时";
					break;
				case error.UNKNOWN_ERROR:
					errorMessage = "定位失败,定位系统失效: " + error.code;
					break;
			}
			console.log(errorMessage);
			locationUI.innerHTML = errorMessage;				

			var map = new BMap.Map(locationMap); 
			var point = new BMap.Point(120.38345, 30.30025); 
			map.centerAndZoom(point, 15);  
			map.enableScrollWheelZoom(true); 
		}

		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(successGeoData, failGeoData, {
				maximumAge : 1000,
				enableHighAccuracy : true,
				timeout : 5000
			});
			
		} else {
			console.log('您的浏览器不支持定位 geolocation :(');
		}
	})();

	/*  ----------------Json---------------------  */
	(function(){

		var statesList = document.getElementById('state');
		var counriesList = document.getElementById('counriesList');

		function loadData(dataUrl, target) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', dataUrl, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
						target.innerHTML += xhr.responseText;
					} else {
						console.log(xhr.statusText);
						
						// Show the error on the Web page
                        tempContainer.innerHTML += '<p class="error">Error getting ' + 
                                      target.name + ": "+ xhr.statusText + ",code: "+ xhr.status + "</p>";
   					}
				}
			}
			xhr.send();
		}

		// Load the countries and states using XHR
		loadData('data/states.html', statesList);
		//loadData('data/countries.html', counriesList);

		//test error - set the wrong url
		loadData('data/countries.html', counriesList);

	})();


}