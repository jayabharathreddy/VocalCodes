
 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
	$('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
        var $this = $(this), href
          , target = $this.attr('data-target')
            || e.preventDefault()
            || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
        
        editAdminBroadcast(href);
        
      });
    $('body').on('mouseenter.collapse.data-api', '[data-toggle=collapse]', function (e) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data();
      $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
      $(target).collapse(option);
    });
  });

$(document).ready(function() {
		getAdminBroadcast();
		$('#create').click(function() {
			$("#header-span").attr('class',"label label-info").text("  Create broadcast");
			$('#brdModal').modal('show');
			$('#brdSubmit').show();
			$('#brdUpdate').hide();
			$("#errorSpan").text("");
			$("#bgDescription").val("");
			$("#messageAudioFile").val("");
		});
		$('#brdSubmit').click(function() {
			var brdName =	$("#bgDescription").val();
			var audioFile = $("#messageAudioFile").val();
			if(brdName!=null && brdName!='' && audioFile!=null && audioFile!='')
			{
				if($.inArray(brdName,adminBroadcasts) ==-1)
				{
					$("#errorSpan").text("");
					$('#brdModal').modal('hide');
					$('#msgModal').modal('show');
					$("#loadingImg").attr('src',loadingImgUrl);
					$("#msg-header-span").attr('class',"label label-info").text("info!");
					$("#modal-message").attr('class',"label label-info").text("  Creating broadcast...!");
					$("#schedulestatusicon").remove();
					$("#schedulefooterbtn").prepend('<i class="icon-white icon-time" id="schedulestatusicon"></i>');
					$("#schedulefooterbtn").attr('class','btn btn-info');
					
//					console.log('loginUserId : '+loginUserId);
					var url = urlForServer+"adminBroadcast/createAdminBroadcast/"+loginUserId;
					var datastr = '{"bgDescription":"'+brdName+'","messageAudioFile":"'+audioFile+'"}';
					var params = encodeURIComponent(datastr);
					$.ajax({
						type : 'POST', url : url, data : params,
						success : function(responseText){
							console.log("<-------Scuccessfully created broadcast with response as -------> "+ responseText);
							var data=jQuery.parseJSON(responseText);
							
							$("#loadingImg").attr('src',"");
							$("#msg-header-span").attr('class',"label label-success").text("info");
							$("#modal-message").attr('class',"label label-success").text("  Broadcast created successfully...!");
							$("#schedulestatusicon").remove();
							$("#schedulefooterbtn").prepend('<i class="icon-white icon-ok" id="schedulestatusicon"></i>');
							$("#schedulefooterbtn").attr('class','btn btn-success');
							setTimeout(function(){
								$('#msgModal').modal('hide');	
							},5000);
							getAdminBroadcast();
						},
						error : function(){
							$("#loadingImg").attr('src',"");
							$("#msg-header-span").attr('class',"label label-warning").text("info");
							$("#modal-message").attr('class',"label label-warning").text("  Error in creating broadcast...!");
							$("#schedulestatusicon").remove();
							$("#schedulefooterbtn").prepend('<i class="icon-white icon-remove" id="schedulestatusicon"></i>');
							$("#schedulefooterbtn").attr('class','btn btn-warning');
							setTimeout(function(){
								$('#msgModal').modal('hide');
							},5000);
							console.log("<-------Error returned while creating broadcast-------> ");
						}
					});
				}
				else
					$("#errorSpan").text("  Broadcast name already exists!");
			}
			else
				$("#errorSpan").text("  All fields must be entered!");
		});
		$('#client_info').click(function() {
			$("#clientheader-span").attr('class',"label label-info").text("  Create Client Info");
			$('#clientModal').modal('show');
			$('#clientinfoSubmit').show();
			$('#clientinfoUpdate').hide();
			$("#clienterrorSpan").text("");
			$("#clientName").val("");
			$("#callerId").val("");
		});
		$('#clientinfoSubmit').click(function() {
			var clName =	$("#clientName").val();
			var callerId = $("#callerId").val();
			if(clName!=null && clName!='' && callerId!=null && callerId!='')
			{
				//if($.inArray(clName,adminBroadcasts) ==-1)
				//{
					$("#clienterrorSpan").text("");
					$('#clientModal').modal('hide');
					$('#msgModal').modal('show');
					$("#loadingImg").attr('src',loadingImgUrl);
					$("#msg-header-span").attr('class',"label label-info").text("info!");
					$("#modal-message").attr('class',"label label-info").text("  Creating broadcast...!");
					$("#schedulestatusicon").remove();
					$("#schedulefooterbtn").prepend('<i class="icon-white icon-time" id="schedulestatusicon"></i>');
					$("#schedulefooterbtn").attr('class','btn btn-info');
					
//					console.log('loginUserId : '+loginUserId);
					var url = urlForServer+"ClientInfo/Create/"+loginUserId;
					var datastr = clName+","+callerId;
					var params = encodeURIComponent(datastr);
					$.ajax({
						type : 'POST', url : url, data : params,
						success : function(responseText){
							console.log("<-------Scuccessfully created client info with response as -------> "+ responseText);
							var data=jQuery.parseJSON(responseText);
							
							$("#loadingImg").attr('src',"");
							$("#msg-header-span").attr('class',"label label-success").text("info");
							$("#modal-message").attr('class',"label label-success").text("  Client Info created successfully...!");
							$("#schedulestatusicon").remove();
							$("#schedulefooterbtn").prepend('<i class="icon-white icon-ok" id="schedulestatusicon"></i>');
							$("#schedulefooterbtn").attr('class','btn btn-success');
							setTimeout(function(){
								$('#msgModal').modal('hide');	
							},5000);
						},
						error : function(){
							$("#loadingImg").attr('src',"");
							$("#msg-header-span").attr('class',"label label-warning").text("info");
							$("#modal-message").attr('class',"label label-warning").text("  Error in creating Client Info...!");
							$("#schedulestatusicon").remove();
							$("#schedulefooterbtn").prepend('<i class="icon-white icon-remove" id="schedulestatusicon"></i>');
							$("#schedulefooterbtn").attr('class','btn btn-warning');
							setTimeout(function(){
								$('#msgModal').modal('hide');
							},5000);
							console.log("<-------Error returned while creating broadcast-------> ");
						}
					});
				//}
				//else
					//$("#clienterrorSpan").text("  Client name already exists!");
			}
			else
				$("#clienterrorSpan").text("  All fields must be entered!");
		});
});
var adminBroadcasts=new Array();
var adminBroadcastsWithoutSpaceMap={};
var adminBroadcastMap={};
function getAdminBroadcast()
{
	//console.log('loginUserId : '+loginUserId);
	var url = urlForServer+"adminBroadcast/getAdminBroadcast/"+loginUserId;
	$.support.cors = true;
	$.ajax({
		type : 'POST', url : url,
		success : function(responseText) {
			console.log("<-------Broadcast received with response as -------> "+ responseText);
			var data=jQuery.parseJSON(responseText);
			$("#accordion2").empty();
			var broadcasts = new Array();
			adminBroadcastsWithoutSpaceMap={};
			adminBroadcastMap={};
			for ( var i = 0; i < data.length; i++) {
				if(data.length > 5){
					$("#accordion2").attr('style',"height:200px;overflow-y:scroll;");
				}
				var obj = data[i];
				broadcasts.push(obj['bgDescription']);
				var idObject=obj['_id'];
				var objId=idObject.$oid;
				var bgDescription = obj['bgDescription'];
				var messageAudioFile = obj['messageAudioFile'];
				adminBroadcastMap[objId] = obj;
				if(bgDescription!=null && bgDescription!=''){
					var tempDesc=bgDescription;
					do{
						tempDesc=tempDesc.replace(" ", "");
					}while (tempDesc.search(" ")!=-1);
					adminBroadcastsWithoutSpaceMap[tempDesc] = objId;
					$("#accordion2").append('<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#'+tempDesc+'">'+bgDescription+'</a></div><div id="'+tempDesc+'" class="accordion-body collapse "><div class="accordion-inner"><div> messageAudioFile : '+messageAudioFile+'</div></div></div></div>');
				}
			}
			adminBroadcasts=broadcasts;
		},
		error : function() 
		{
			console.log("<-------error returned retrieving broadcast-------> ");
		}
	});
}

//var $editAdminBroadcast = $(function (editBrdId)
function editAdminBroadcast(editBrdId)
{
	editBrdId=editBrdId.replace('#','');
    var objId=adminBroadcastsWithoutSpaceMap[editBrdId];
    var obj = adminBroadcastMap[objId];
    var bgDescription = obj['bgDescription'];
	var messageAudioFile = obj['messageAudioFile'];
	$("#header-span").attr('class',"label label-info").text("  Update broadcast");
	$('#brdModal').modal('show');
	$('#brdSubmit').hide();
	$('#brdUpdate').show();
	$("#errorSpan").text("");
	$("#bgDescription").val(bgDescription);
	$("#messageAudioFile").val(messageAudioFile);
	
	$('#brdUpdate').click(function() {
		var brdName =	$("#bgDescription").val();
		var audioFile = $("#messageAudioFile").val();
		
		if(brdName!=null && brdName!='' && audioFile!=null && audioFile!='')
		{
			var flag=true;
			if(bgDescription!=brdName)
			{
				if($.inArray(brdName,adminBroadcasts) !=-1)
					flag=false;
			}
			if(flag)
			{
				$("#errorSpan").text("");
				$('#brdModal').modal('hide');
				$('#msgModal').modal('show');
				$("#loadingImg").attr('src',loadingImgUrl);
				$("#msg-header-span").attr('class',"label label-info").text("info");
				$("#modal-message").attr('class',"label label-info").text("Updating broadcast...!");
				$("#schedulestatusicon").remove();
				$("#schedulefooterbtn").prepend('<i class="icon-white icon-time" id="schedulestatusicon"></i>');
				$("#schedulefooterbtn").attr('class','btn btn-info');
				
				
				console.log('loginUserId : '+loginUserId);
				var url = urlForServer+"adminBroadcast/updateAdminBroadcast/"+loginUserId;
				obj['bgDescription']=brdName;
				obj['messageAudioFile']=audioFile;
				var datastr =JSON.stringify(obj);
				var params = encodeURIComponent(datastr);
				$.ajax({
					type : 'POST', url : url, data : params,
					success : function(responseText){
						console.log("<-------Scuccessfully updated broadcast with response as -------> "+ responseText);
						var data=jQuery.parseJSON(responseText);
						$("#msg-header-span").attr('class',"label label-success").text("info");
						$("#modal-message").attr('class',"label label-success").text("  Broadcast updated successfully...!");
						$("#schedulestatusicon").remove();
						$("#schedulefooterbtn").prepend('<i class="icon-white icon-ok" id="schedulestatusicon"></i>');
						$("#schedulefooterbtn").attr('class','btn btn-success');
						setTimeout(function(){
							$('#msgModal').modal('hide');	
						},5000);
						getAdminBroadcast();
					},
					error : function(){
						$("#loadingImg").attr('src',"");
						$("#msg-header-span").attr('class',"label label-warning").text("info");
						$("#modal-message").attr('class',"label label-warning").text("  Error in updating broadcast...!");
						$("#schedulestatusicon").remove();
						$("#schedulefooterbtn").prepend('<i class="icon-white icon-remove" id="schedulestatusicon"></i>');
						$("#schedulefooterbtn").attr('class','btn btn-warning');
						setTimeout(function(){
							$('#msgModal').modal('hide');
						},5000);
						console.log("<-------Error returned while updating broadcast-------> ");
					}
				});
			}
			else
				$("#errorSpan").text("  Broadcast name already exists!");
		}
		else
			$("#errorSpan").text("  All fields must be entered!");
	});
    
}