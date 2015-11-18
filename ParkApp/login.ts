class Login{
	username: string;
	password:string;

	constructor(){
	this.username = abc;
	this.password = 123;
	}

	var un = document.getElementById('username');
	var pw = document.getElementById('password');

	clicked(){
		if(un.value == username){
		if(pw.value == password){
		window.alert("Logged in as " +  un.value);

		}else{
			window.alert("Invalid username or password!")
		    }
	     } else {
	        window.alert("Invalid username or password!")
	}
	}
}
