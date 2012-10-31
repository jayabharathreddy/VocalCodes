$(document).ready(function () {
	if(role==''){
		document.getElementById("loginContainer").style.display="block";
	}
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
    				console.log("<-------data returned from url for new ajax request-------> "+ responseText);    				
    				var response = responseText;
    				if (response == "0"){
    					 document.getElementById("vcContainer").style.display="none";
    					 document.getElementById("loginContainer").style.display="block";
    				}else{
    					var n=response.split("&");
    					if(n[1]=='false'){
    						$("#settingTab").remove();
    					}
    					document.getElementById("vcContainer").style.display="block";
    					document.getElementById("loginContainer").style.display="none";
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
    
});

$(function(){
$("#signOut").click(function() 
	{	
		 if(is_chrome || is_safari)
			 $.jStorage.set("loginId", "id=");
		 else
		     document.cookie="id=";    
			 
		 window.location.replace("../pages/index.html");
	});
	});
