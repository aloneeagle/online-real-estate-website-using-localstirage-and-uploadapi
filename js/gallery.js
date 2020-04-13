window.onload = function(){
	alert('make sure you are connect to internet');
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

	//retrieveing gallery
	let gallery = document.querySelector('.gallery');
	let galleryData = '';
	if(JSON.parse(localStorage.getItem("osData")) == null){
		gallery.innerHTML = '<p align="center">No Data Found</p>';
	}else{
		JSON.parse(localStorage.getItem("osData")).map(data=>{
			galleryData += `<img src="${data.imageData.data.url}" />`;
		});
		gallery.innerHTML = galleryData;
	}
}