window.onload = function(){
	alert('make sure your internet connection is working to view the images');
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



	//images fetching
	let imagesBox = document.querySelector('.imagesData');
	let imagesData = '';
	const currentUser  = JSON.parse(localStorage.getItem('osLoginedUser'))[0];
	const items = JSON.parse(localStorage.getItem('osData'));

	if(JSON.parse(localStorage.getItem('osData')) === null){
		imagesData += 'no data found';
	}else{
		items.map(item=>{
			if(currentUser.id == item.id){
				// console.log(item);
				imagesData += '<div class="item filter-item '+item.category+'">',
				imagesData += '<img src="'+item.imageData.data.url+'" />',
				imagesData += '<div class="itemInfo">',
				imagesData += '<h1>'+item.name+'</h1>',
				imagesData += '<p class="category">Category: '+item.category+'</p>',
				imagesData += '<p class="details">'+item.details+'</p>',
				imagesData += '</div>',
				imagesData += '</div>';
				console.log('image:'+item.imageData.data.url);
				console.log('name:'+item.name);
				console.log('location:'+item.location);
				console.log('details:'+item.details);
				console.log('category:'+item.category);
			}
		});
	}
	imagesBox.innerHTML = imagesData;
}