window.addEventListener("load",function(){
	const loginBox = document.querySelector('.login');

	//login box data parsing dynamically
	if(typeof(Storage) != 'undefined'){
		if(JSON.parse(localStorage.getItem("osLoginedUser")) === null){
			alert('Please login to access admin panel and other pages');
			loginBox.innerHTML = '<h1>Login <br/>&nbsp;&nbsp;Here</h1><form id="loginForm" class="loginForm"><input type="email"  name="email"  id="email"  class="email"  placeholder="Email"  autocomplete="username"/><input type="password"  name="pass"  id="pass"  class="pass"  placeholder="Password" autocomplete="current-password"/><input type="submit"  name="submit-login"  id="submit-login"  class="submit-login"  value="Login" /></form>';
			//login form
		const loginForm = loginBox.querySelector('form');
		loginForm.addEventListener('submit',function(e){
			e.preventDefault(); //to prevent form submit default behavior
			const email = e.target.email.value;
			const pass = e.target.pass.value;

			if(email == '' || pass == ''){
				window.location.reload();
				alert('Please fill out empty fields');
			}else{
				let login = false;
				const registeredUsers = JSON.parse(localStorage.getItem("osRegisterUsers"));
				let loginUser = [];
				if(registeredUsers !==null){
					registeredUsers.map(user =>{
					if(user.email == email){
						loginUser = [];
						loginUser.push(user);
					}
				});
				}else{
					loginUser=[];
				}
				if(loginUser.length == 0){
					window.location.reload();
					alert('Please Register first');
					alert("you are redirecting to register page");
					window.location.replace('pages/register.html');
				}else{
					if(loginUser[0].pass == pass){
							const loginusers = localStorage.getItem("loginUser");
							localStorage.setItem("osLoginedUser",JSON.stringify(loginUser));
							alert('you are logined');
							window.location.reload();
					}else{
						e.target.pass.value = '';
						alert('sorry! your password is wrong');
					}
				}
			}
		});
		}else{
			const loginedUser =  JSON.parse(localStorage.getItem('osLoginedUser'));
			loginBox.innerHTML = '<div><p>Welcome<span>'+loginedUser[0].name+'</span></p><div class="btns"><button class="logout">Logout</button><button class="admin"}">Dashboard</button></div></div>';

			const logOutBtn = document.querySelector('.logout');
			const adminBtn = document.querySelector('.admin');

			logOutBtn.onclick = ()=>{
				localStorage.removeItem("osLoginedUser");
				window.location.reload();
				alert('You are loged out successfully');
			}
			adminBtn.onclick = ()=>{
				window.location.replace('pages/admin.html');
				alert('Welcome '+JSON.parse(localStorage.getItem('osLoginedUser'))[0].name+' to the dashboard');
			}

		}
	}else{
		alert('login System doesn\'t support your browser, please change the browser');
	}

	
});