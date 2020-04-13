window.onload = function(){
	alert('make sure your internet connection is working to upload the image');
	if(JSON.parse(localStorage.getItem('osLoginedUser')) === null){
		window.location.replace('../index.html');
	}

	document.querySelector('.logout').onclick = ()=>{
		localStorage.removeItem("osLoginedUser");
		window.location.replace('../index.html');
		alert('You are loged out successfully');
	}
	//adding user name
	const userActiveName = document.querySelector('.userActiveName');
	const userActiveNameSpan = userActiveName.querySelector('span');
	if(JSON.parse(localStorage.getItem('osLoginedUser')) != null){
		userActiveNameSpan.innerHTML = JSON.parse(localStorage.getItem('osLoginedUser'))[0].name;
	}



	//upload form
	const uploadForm = document.querySelector('.uploadForm');
	uploadForm.addEventListener("submit",e=>{
		e.preventDefault();
		const img = e.target.image;
		const name = e.target.name.value;
		const category = e.target.category.value;
		const location = e.target.location.value;
		const details = e.target.details.value;
		if(name == '' || category == '' || location == '' || details == ''){
			alert('Please fill all the fields');
		}else{
			let allImages = [];
			let uploadedItem = {};
			let id = null;
			if(img.files[0] == undefined){
				alert('please choose a file');
			}else{
				// console.log(img.files[0]);
				let formData = new FormData();
				 formData.append('image', img.files[0]);
				fetch('https://api.imgbb.com/1/upload?key=951f4cfa54ef86948a2394107840a4d4',{
					method:'post',
					body:formData,
					redirect: 'follow'
				})
			  .then(response => response.text())
			  .then(result => {
					id = JSON.parse(localStorage.getItem("osLoginedUser"))[0].id;
					uploadedItem = {
							id:id,
							name:name,
							category:category,
							location:location,
							details:details,
							imageData:JSON.parse(result)
						};
					console.log(uploadedItem);
					if(JSON.parse(localStorage.getItem('osData')) === null){
						allImages.push(uploadedItem);
						localStorage.setItem("osData",JSON.stringify(allImages));
						alert('Successfully Uploaded !!');
						window.location.reload();
					}else{
						const data = JSON.parse(localStorage.getItem('osData'));
						data.map(data=>{
								allImages.push(data);
						});
						allImages.push(uploadedItem);
						localStorage.setItem('osData',JSON.stringify(allImages));
						alert('Successfully Uploaded !!');
						window.location.reload();
					}
			  })
			  .catch(error => console.log('error', error));

			}
		}
		
	});
}