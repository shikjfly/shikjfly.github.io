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
			var latitude  = position.coords.latitude
	    	var longitude = position.coords.longitude
			locationUI.innerHTML = '<p>Latitude维度： ' + latitude + '° Longitude经度： ' + longitude + '°</p>';

			var map = new BMap.Map("locationMap");   //创建地图示例
			var point = new BMap.Point(longitude, latitude);  // 设置中心点坐标
			map.centerAndZoom(point, 18);   //地图初始化，同时设置地图展示级别
		}

	   // 地理位置调用失败函数
		function failGeoData() {		

			var map = new BMap.Map("locationMap");   //创建地图示例
			var point = new BMap.Point(120.383779, 30.3000093);  // 设置中心点坐标
			map.centerAndZoom(point, 15);   //地图初始化，同时设置地图展示级别
			locationUI.innerHTML = '无法获取您的位置';				
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successGeoData, failGeoData);
		} else {
			console.log('您的浏览器不支持定位 geolocation :(');
		}


	})();

	/*  ----------------Json---------------------  */
	(function(){

		var statesList = document.getElementById('state');
		var counriesList = document.getElementById('counriesList');
		// html格式的方式
		function loadDataHtml(dataUrl, target) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', dataUrl, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
						// +=再原有的基础上再新增
						target.innerHTML += xhr.responseText;
					} else {
						console.log(xhr.statusText);
   					}
				}
			}
			xhr.send();
		}

		// json格式的方式
		function loadDataJson(dataUrl, rootElement, target) {
			var xhr = new XMLHttpRequest();
			xhr.overrideMimeType("application/json");
			xhr.open('GET', dataUrl, true);

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						
						//利用parse进行数据切分
						var jsonData = JSON.parse(xhr.responseText);
						
						var optionsHTML = ''
						for(var i= 0; i < jsonData[rootElement].length; i++){
							optionsHTML+='<option value="'+jsonData[rootElement][i].name+'">'+jsonData[rootElement][i].name+'</option>'
						}
						
						var targetCurrentHtml = target.innerHTML;
						target.innerHTML = targetCurrentHtml + optionsHTML;
						
					} else {
						console.log(xhr.statusText);
					}
				}
			}
			xhr.send();
		}


		
		// 国家用html格式
		loadDataHtml('data/countries.html', counriesList);
		// 省份用Json格式
		loadDataJson('data/states.json', 'stateslist', statesList);
	})();

	/* ---------  start // creating pie chart using HTML5 Canvas   -------------- */
	(function() {

		function drawPieChart (canvas, chartData, centerX, centerY, pieRadius) {
			var ctx;  // The context of canvas
			var previousStop = 0;  // The end position of the slice
			var totalDonors = 0;
			
			var totalCities = chartData.items.length;
			
            // Count total donors
			for (var i = 0; i < totalCities; i++) {
					totalDonors += chartData.items[i].donors;
			}

			ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.heigh);

		    var colorScheme = ["#2F69BF", "#A2BF2F", "#BF5A2F", 
		                       "#BFA22F", "#772FBF", "#2F94BF", "#c3d4db"];
		                       
			
			for (var i = 0; i < totalCities; i++) {
				
				//draw the sector
				ctx.fillStyle = colorScheme[i];
				ctx.beginPath();
				ctx.moveTo(centerX, centerY);
				ctx.arc(centerX, centerY, pieRadius, previousStop, previousStop + 
					(Math.PI * 2 * (chartData.items[i].donors / totalDonors)), false);
				ctx.lineTo(centerX, centerY);
				ctx.fill();
				
				// label's bullet
				var labelY = 20 * i + 40;
				var labelX = pieRadius*2 + 30;
				
				ctx.rect(labelX, labelY, 10, 10);
				ctx.fillStyle = colorScheme[i];
        		ctx.fill();
        		
        		// label's text
				ctx.font = "italic 12px sans-serif";
				ctx.fillStyle = "#222";
				var txt = chartData.items[i].location + " | " + chartData.items[i].donors;
				ctx.fillText (txt, labelX + 18, labelY + 8);
				
				previousStop += Math.PI * 2 * (chartData.items[i].donors / totalDonors);
			}
		}
		
			
		function loadData(dataUrl, canvas) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', dataUrl, true);

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
                   if ((xhr.status >= 200 && xhr.status < 300) || 
                                             xhr.status === 304) {
						var jsonData = xhr.responseText;

						var chartData = JSON.parse(jsonData).ChartData;

						drawPieChart(canvas,chartData, 65, 100, 49);
						
					} else {
						console.log(xhr.statusText);
					}
				}
			}
			xhr.send();
		}
	
		loadData('data/chartdata.json', document.getElementById("canvas"));
	})();


}