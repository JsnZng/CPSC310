function checkname(){
                var div = document.getElementById("div1");
                div.innerHTML = "";
                var name1 = document.form1.text1.value;
                if (name1 == "") {
                    div.innerHTML = "<font color=red>Name can not be empty！</font>";
                    document.form1.text1.focus();
                    return false;
                }
                if (name1.length < 4) {
                    div.innerHTML = "<font color=purple>Input name should at least be four character！</font>";
                    document.form1.text1.select();
                    return false;
                }          
                return true;
                
            }
            
            function checkpassword(){
                var div = document.getElementById("div2");
                div.innerHTML = "";
                var password = document.form1.text2.value;
                if (password == "") {
                    div.innerHTML = "<font color=red>Password can not be empty！</font>";
                    document.form1.text2.focus();
                    return false;
                }
                if (password.length < 4 || password.length > 12) {
                    div.innerHTML = "<font color=purple>Input password should be in a range of 4~12 character！</font>";
                    document.form1.text2.select();
                    return false;
                }
                return true;
            }
            
            function checkrepassword(){
                var div = document.getElementById("div3");
                div.innerHTML = "";
                var password = document.form1.text2.value;
                var repass = document.form1.text3.value;
                if (repass == "") {
                    div.innerHTML = "<font color=red>Password can not be empty！</font>";
                    document.form1.text3.focus();
                    return false;
                }
                if (password != repass) {
                    div.innerHTML = "<font color=purple>Input password is not inconsistent with comfirm password</font>";
                    document.form1.text3.select();
                    return false;
                }
                return true;
            }
            
            
            function check(){
                if (checkname() && checkpassword() && checkrepassword() ) {
				  var a = document.form1.text1.value;
				  var b = document.form1.text2.value;
                  var c = document.form1.text3.value;
				 
				  alert("Username:"+a+",Password:"+b+",Comfirm Password:"+c+"");
                    return true;
                }
                else {
                    return false;
                }
            }
   
