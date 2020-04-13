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


					
	//fetching data
	const viewData = document.querySelector('.viewdata');
	const viewDataTable = viewData.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>S no.</th><th>Topic</th><th></th></tr>';
	if(JSON.parse(localStorage.getItem("osData")) === null){
		tableData += '<tr><th>No Data Found</th></tr>';
	}else{
		let uploaded = 0;
		let places = [];
		JSON.parse(localStorage.getItem("osData")).map(data=>{
			places.push(data.category+" ");
			uploaded +=1;
		});
		tableData += `<tr><td>1</td><td>How many Uploades?</td><td>${uploaded}</td></tr>`;
		tableData += `<tr><td>2</td><td>How many views?</td><td>0</td></tr>`;
		tableData += `<tr><td>3</td><td>Places added?</td><td>${places}</td></tr>`;
	}

	viewDataTable.innerHTML = tableData;
}