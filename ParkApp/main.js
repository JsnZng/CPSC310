function clicked(){
	var un = document.getElementById('username');
	var pw = document.getElementById('password');

	var corun = "test";
	var corpw = "123";

	if(un.value == corun){
		if(pw.value == corpw){
		window.alert("Logged in as" + un.value);
		
		}else{
			window.alert("Invalid username or password!")
		}else{
		window.alert("Invalid username or password!")
		}
	}

}
