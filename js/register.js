window.addEventListener("load",()=>{
 	const registerForm = document.querySelector('form#registerForm');

	 //on form submit
	 registerForm.onsubmit = e=>{
		 	e.preventDefault();

		 	const name = e.target.name.value;
			const email = e.target.email.value;
			let pass = e.target.pass.value;
			let confirmPass = e.target.confirmPass.value;

			if(name == '' || email == '' || pass == '' || confirmPass == '' ){
					alert('Please fill out empty fields');
			}else if(pass != confirmPass){
			e.target.password.value = '';
			e.target.confirmPassword.value = '';
			alert('both passwords are not matching');
			}else{

				// working with object array
				let registerUsers = [	
							 		{
							 			'id':Math.random()*100,
							 			'name':name,
							 			'email':email,
							 			'pass':pass
							 		},
								];
				let alreadyRegistered = false; 
				if (typeof(Storage) !== "undefined") {
					if (localStorage.getItem("osRegisterUsers") === null) {
						localStorage.setItem("osRegisterUsers" , JSON.stringify(registerUsers));
						alert('you are registered successfully and you can login now');
						window.location.replace('../index.html');
					}else{
				  		let storageUsers = localStorage.getItem("osRegisterUsers");
				  		registerUsers = [];
				  		alreadyRegistered = false;
				  		JSON.parse(storageUsers).map(user =>{
							if(user.email != email){
								registerUsers.push(user);
							}else{
								alreadyRegistered =  true;
								return;
							}
				  		});
				  		if(alreadyRegistered == true){
							window.location.reload();
							alert("this email is already registered");
				  		}else{
								registerUsers.push({'id':Math.random()*100,"name":name,"email":email,"pass":pass} );
								localStorage.setItem("osRegisterUsers",JSON.stringify(registerUsers));
								alert('you are registered successfully and you can login now');
								window.location.replace('../index.html');
							}
						}
				} else {
				  	alert("Sorry, your browser does not support Web(Local) Storage...");
					window.location.reload();
				}
		}
	 };
});