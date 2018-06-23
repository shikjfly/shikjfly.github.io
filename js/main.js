window.onload = function(){

	var username = document.getElementById('username'),
		password = document.getElementById('password'),
		authorized = document.getElementById('authorized'),
		login_form = document.getElementById('login-form'),
		login_submit = document.getElementById('login-submit'),
		logout_link = document.getElementById('logout-link'),
		login_link = document.getElementById('login-link');
			
		login_link.addEventListener("click",showloginForm,true);
		function showloginForm(){
			login_link.style.display = "none";
			login_submit.style.display = "block";
			login_form.style.display = "block";
			username.value = "";
			password.value = "";
		}
		
		login_submit.addEventListener("click",showAuthor,true);
		function showAuthor(){
			if ( (username.value == "shikjfly") && (password.value == 123) ) {				
				login_link.style.display = "none";
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
			login_submit.style.display = "none";
			login_form.style.display = "none";
			authorized.style.display = "none";
		}


}
