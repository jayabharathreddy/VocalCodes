/**
 * public variables
 */

var broadcastGroupSid;
var toSelectedValues;
function showTags(tags) {
	console.log(tags);
	var string = "Selected Call List\r\n";
	string += "--------\r\n";
	toSelectedValues= new Array();
	for ( var i in tags)
	//string += tags[i].label + " : " + tags[i].value + "\r\n";
		if(tags[i].value!=null && tags[i].value!="" && tags[i].value!='undefined')
		{
			toSelectedValues[i]= tags[i].value;
		}
	//alert(this.toSelectedValues);
}

$(document).ready(function() {

	// $("#audioSrc").attr( 'src', audioLocation());
//		$('#pickScheduleAnch').click(function() 
//			{
//				getBroadcastGroupDesc();//ajax function
//			});

	
		$('#broadcastSubmit').click(function() 
			{
				showTags($('#demo31').tagit('tags'));
				//showTags($('#demo31').tagit('tags'));
				$("#statusicon").remove();
				$("#loadingIcon").remove();
				$("#statusbtn").remove();
				$("#statusicon").remove();
				$("#spaninfo").text(" ");
				if(toSelectedValues !=null && toSelectedValues !='undefined' && toSelectedValues.length>=1)
				{
					$("#modalheaderinfo").attr('class',"label label-info");
					$("#modalheaderinfo").text("Info !");
					$("#loadingIcon").remove();
					$("#statusbtn").remove();
					$("#statusicon").remove();
					$("#loadingImg").attr('src',loadingImgUrl);					
					$("#modal-body-span").prepend('<i id="loadingIcon"><img id="loadingImg" src="http://173.201.188.106:8080/vocalimg/images/loading.gif"/> </i>');
					$("#spaninfo").attr('class',"label label-info");
					$("#spaninfo").text("  Creating broadcast...!");
					$("#modalfooter").append('<button id="statusbtn" class="btn btn-info" data-dismiss="modal" aria-hidden="true"></button>');
					$("#statusbtn").prepend('<i class="icon-white icon-time" id="statusicon"></i> ');
					$("#broadcastclose").attr('class',"label label-info");
					
				    createBroadcastGroupDesc();//ajax function
				}
				else
				{
					$("#modalheaderinfo").attr('class',"label label-warning");
					$("#modalheaderinfo").text("Warning !");
					$("#loadingImg").attr('src',"");
					$("#spaninfo").attr('class',"label label-warning");
					$("#spaninfo").text("To Values are empty");
					$("#loadingIcon").remove();
					$("#statusbtn").remove();
					$("#statusicon").remove();					
					$("#modalfooter").append('<button id="statusbtn" class="btn btn-warning" data-dismiss="modal" aria-hidden="true"></button>');
					$("#statusbtn").prepend('<i class="icon-white icon-remove" id="statusicon"></i> ');
					
				}
				$('#myModal').modal('show');
				
			});
	});


function createBroadcastGroupDesc() 
{
	var url = urlForServer+"broadcast/create/";
	//toMap
	var contactGroupSidMap="";
	for(var i=0;i<this.toSelectedValues.length;i++)
	{
		if(toSelectedValues[i]!=null && toSelectedValues[i]!="" && toSelectedValues[i]!='undefined')
		{
			contactGroupSidMap += toMap[toSelectedValues[i]]+",";
		}
	}
	
	var datastr = '_audio.wav~' + contactGroupSidMap +'~'+ this.loginUserId +'~'+gcLoginUserId;
	var params = encodeURIComponent(datastr);
	
	$.ajax(
	{
		type : 'POST',
		url : url,
		data : params,
		success : function(responseText) 
		{
			console.log("<-------Scuccessfully created broadcast with response as -------> "+ responseText);
			var data=jQuery.parseJSON(responseText);
			broadcastGroupSid=data.sid;
			$("#modalheaderinfo").attr('class',"label label-success");
			$("#modalheaderinfo").text("Info !");
			$("#loadingIcon").remove();
			$("#statusbtn").remove();
			$("#statusicon").remove();
			$("#loadingImg").attr('src',"");
			$("#spaninfo").attr('class',"label label-success");
			$("#spaninfo").text("  Broadcast Successfully Created...!");
			$("#modalfooter").append('<button id="statusbtn" class="btn" data-dismiss="modal" aria-hidden="true"></button>');
			$("#statusbtn").prepend('<i class="icon-white icon-ok" id="statusicon"></i>');
			$("#statusbtn").attr('class','btn btn-success');
			
			setTimeout(function(){
//				$('#myModal').modal('hide');
				createSchedule();//ajax function
			},2000);
//			
		},
		error : function() 
		{
			$("#modalheaderinfo").attr('class',"label label-warning");
			$("#modalheaderinfo").text("Warning !");
			$("#loadingImg").attr('src',"");
			$("#spaninfo").attr('class',"label label-warning");
			$("#spaninfo").text(" Error in creating broadcast...");
			$("#loadingIcon").remove();
			$("#statusbtn").remove();
			$("#statusicon").remove();					
			$("#modalfooter").append('<button id="statusbtn" class="btn btn-warning" data-dismiss="modal" aria-hidden="true"></button>');
			$("#statusbtn").prepend('<i class="icon-white icon-remove" id="statusicon"></i> ');
			setTimeout(function(){
				$('#myModal').modal('hide');
			},5000);
			console.log("<-------error returned for new ajax request   createBroadcastGroupDesc-------> ");
		}
	});
}

function getBroadcastGroupDesc() 
{
	var url = urlForServer+"broadcast/user/"+gcLoginUserId;
	$.ajax({
		type : 'POST',
		url : url,
		success : function(responseText) 
		{
			console.log("<-------Broadcast description returned with response as -------> "+ responseText);
			$(function() 
			{
				var data=jQuery.parseJSON(responseText);
				$("#pickScheduleAnch").attr('data-toggle', 'dropdown');
				$("#pickScheduleUl").empty();
				for ( var i = 0; i < data.length; i++) 
				{
					var obj = data[i];
					var displayText = obj['broadcastGroupDesc'];
					if(displayText!=null && displayText!='')
					$("#pickScheduleUl").append('<li><a href="#" >' + displayText + '</a></li>');
				}
			});
		},
		error : function() 
		{
			console.log("<-------Error returned while fetching the broadcast description -------> ");
		}
	});
}

function createSchedule() 
{
	$("#modalheaderinfo").attr('class',"label label-info");
	$("#modalheaderinfo").text("Info !");
	$("#loadingIcon").remove();
	$("#statusbtn").remove();
	$("#statusicon").remove();
	$("#loadingImg").attr('src',loadingImgUrl);					
	$("#modal-body-span").prepend('<i id="loadingIcon"><img id="loadingImg" src="http://173.201.188.106:8080/vocalimg/images/loading.gif"/> </i>');
	$("#spaninfo").attr('class',"label label-info");
	$("#spaninfo").text("   Scheduling broadcast...!");
	$("#modalfooter").append('<button id="statusbtn" class="btn btn-info" data-dismiss="modal" aria-hidden="true"></button>');
	$("#statusbtn").prepend('<i class="icon-white icon-time" id="statusicon"></i> ');
	
	
	
	//$('#myModal').modal('show');
	
	var url = urlForServer+"schedule/create/"+broadcastGroupSid;
	$.ajax({
		type : 'POST',
		url : url,
		success : function(responseText) 
		{
			console.log("<-------Successfully scheduled with response as -------> "+ responseText);
			var data = jQuery.parseJSON(responseText);
			$("#modalheaderinfo").attr('class',"label label-success");
			$("#modalheaderinfo").text("Info !");
			$("#loadingIcon").remove();
			$("#statusbtn").remove();
			$("#statusicon").remove();
			$("#loadingImg").attr('src',"");
			$("#spaninfo").attr('class',"label label-success");
			$("#spaninfo").text("  Broadcast Successfully Scheduled...!");
			$("#modalfooter").append('<button id="statusbtn" class="btn" data-dismiss="modal" aria-hidden="true"></button>');
			$("#statusbtn").prepend('<i class="icon-white icon-ok" id="statusicon"></i>');
			$("#statusbtn").attr('class','btn btn-success');
			setTimeout(function(){
				$('#myModal').modal('hide');
			},5000);
		},
		error : function() 
		{
			$("#modalheaderinfo").attr('class',"label label-warning");
			$("#modalheaderinfo").text("Warning !");
			$("#loadingImg").attr('src',"");
			$("#spaninfo").attr('class',"label label-warning");
			$("#spaninfo").text(" Error in creating broadcast...");
			$("#loadingIcon").remove();
			$("#statusbtn").remove();
			$("#statusicon").remove();					
			$("#modalfooter").append('<button id="statusbtn" class="btn btn-warning" data-dismiss="modal" aria-hidden="true"></button>');
			$("#statusbtn").prepend('<i class="icon-white icon-remove" id="statusicon"></i> ');
			setTimeout(function(){
				$('#myModal').modal('hide');
			},5000);
			consloe.log("<-------error returned for new ajax request createSchedule-------> ");
		}
	});	
}
