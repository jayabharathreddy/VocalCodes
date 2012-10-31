var host=location.host;
	var path=location.pathname;
	var arraydata=path.split("/");
	var projName=arraydata.splice(1,1);
	//var hosturl="http://"+host+"/"+"VcApi/v1.0/Upload/file";
	var hosturl=urlForServer+"Upload/file/"+gcLoginUserId;

   function audioLocation()
   {
//	   var host=location.host;
	   if(host.search('localhost')!=-1)
		   return "file:///E:/wavefiles/_audio.wav";
	   else
		   return "/mnt/shared/files/upload/audio/_audio.wav";
   }
  
   function excelopen(){
	   document.getElementById("audio_recording").style.display="none";
	   document.getElementById("excel_uploading").style.display="block";
	   
	   //window.open('../pages/upload/upload.html', "upload", 'width=400,height=500');
   }
   function excelclose(){
	   document.getElementById("excel_uploading").style.display="none";
   }
   function audioOpen()
   {
	   document.getElementById("audio_recording").style.display="block";
	   document.getElementById("excel_uploading").style.display="none";
   }
   function settingrecordopen(){
	   
	   document.getElementById("setting_audio_recording").style.display="block";
   }
   function settingrecordclose(){
	   document.getElementById("setting_audio_recording").style.display="none";
   }
$(function() {
	   $('some').mouseover(function() {
			$('#uploadbtn').tooltip('show');
			});
		
		});
   $(document).ready(function() {
	   
   $("#audioSrc").attr( 'src', audioLocation());
   $('#excelupload').click(function(){
	   excelopen();
   });
   $('#recordwithmic').click(function(){
	   audioOpen();
   });
   $('#settingsrecordwithmic').click(function(){
	   settingrecordopen();
   });
  // ajaxFunction1();
   });
   
   function save(){
		document.uploadForm.action = urlForServer+'Upload/file/'+gcLoginUserId;
		document.uploadForm.submit();
	}

	function ajaxFunction1()
	{
		var url = urlForServer + "CallList/Create";
		var paramsToSend = '{"contacts":[{"contactPhoneNum":"9994381879","contactNotes":"sample test case 3","firstName":"Rajesh","lastName":"P","fullName":"Rajesh P","email":"rajbe.mce@gmail.com","other":"department 3"},{"contactPhoneNum":"9894418178","contactNotes":"sample test case 3","firstName":"Bashied","lastName":"S","fullName":"Bshied S","email":"mdbashid@gmail.com","other":"department 3"}],"contactGroupDesc":"Rajesh call list from webservice","countryCode":"91","connectbackCountryCode":"1","dnc":"false","duplicatesAllowed":"false","emailAllowed":"false","cellPhoneAllowed":"false","createSeparateDuplicateList":"false","createAlternateAreaCodeList":"false","broadcastGroupSIDs":[]}';
		var params = encodeURIComponent(paramsToSend);
	
		$.ajax({
					type : 'POST',
					url : url,
					data : params,
					success : function(data) {
						console.log("<-------data returned from url for new ajax request-------> "+ data);
					},
					error : function() {
						// failed request; give feedback to user
					console.log("<-------error returned for new ajax request-------> ");
					}
				});
	}

	//-->
  