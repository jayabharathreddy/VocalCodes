$(function(){
$.support.cors = true;
	$("#login").click(function() 
	{
		$("div#errorMsg").css("display", "block");
		$("div#errorMsg").html("<p style='color:#000'>Please wait!</p>");
		
		//Get values		
		var txtUserName = $("input#username").val();
		var txtPassword = $("input#password").val();

		// check if the fields are empty
		if((txtUserName=="" ) || (txtPassword== ""))
		{ 
			$("div#errorMsg").css("display", "block");
			$("div#errorMsg").html("<p style='color:#FB1D1D'>Please Enter Username, Password!</p>");
		} 
		else 
		{
			//Call the ajax function to check the usernames
			checkUser(txtUserName, txtPassword);
		}
	}); //end of click event
	
	
	// function to check if the username exists in our Database
	function checkUser(txtUserName, txtPassword)
	{
		var dataString = "sUname=" + txtUserName + "&sPass=" + txtPassword; // constructing our param variable that will be send with ajax call
		var params = encodeURIComponent(dataString);
		var url=urlForServer+"login/check";
		var response="";
		$.ajax({		
			type : 'POST',
			url : url,
			data : params,
			success : function(responseText) 
		    {
				
			    response = responseText;
			    if(is_chrome || is_safari)
			    $.jStorage.set("loginId", "id="+response);
			    else
			    document.cookie="id="+response;    
               
				if (response == "0" || response == "")
				{
					$("div#errorMsg").css("display", "block");
					$("div#errorMsg").html("<p style='color:#FB1D1D'>Sorry, Username was not found!</p>");
				} 
				else 
				{
					loginauthenticationcheck();
				}
		    },
			error : function() 
			{
				console.log("<-------error returned for new ajax request login.js-------> ");
			}
		});
	}
 });

function loginauthenticationcheck(){
	var id="";
	if(is_chrome || is_safari)
	id=$.jStorage.get("loginId");
	else
	id=document.cookie;

	    if(id !=null && id !="" && id.indexOf("&") > -1) {
	    	var param=id;
	    	console.log("param"+param);
	    	if(param!=null && param!="")
	    	{
	    		var params = encodeURIComponent(param);
	    		var url=urlForServer+"login/logintime";
	    		$.support.cors = true;
	    		$.ajax(
	    		{
	    			type : 'POST',
	    			url : url,
	    			data : params,
	    			success : function(responseText) 
	    			{
	    				console.log("<-------data returned from url for login js-------> "+ responseText);    				
	    				var response = responseText;
	    				if (response == "0"){
	    					 document.getElementById("vcContainer").style.display="none";
	    					 document.getElementById("loginContainer").style.display="block";
	    				}else{
	    					var n=response.split("&");
	    					if(n[1]=='false'){
	    						$("#settingTab").remove();
	    					}
	    					$('#loginContainer').remove();
	    					window.location.replace("../pages/index.html");
	    					
	    				}
	    			
	    			},
	    			error : function() 
	    			{
	    				console.log("<-------error returned for new ajax request login autonication-------> ");
	    			}
	    		});	
	    	}
	    	else
	    	{
	    		document.getElementById("vcContainer").style.display="none";
				document.getElementById("loginContainer").style.display="block";
	        }
	    }
	    else
	    {
	    	document.getElementById("vcContainer").style.display="none";
			document.getElementById("loginContainer").style.display="block";
	    }
}
function onload()	{
	$('#username').focus();
}
function onKeyPress(e)	{
    if(e.keyCode === 13)//for enter key
        $("#login").focus();
}  	
