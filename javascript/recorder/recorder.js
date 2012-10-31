
	var search=location.search;
	var searchDatas=search.split('&');
	var userId=searchDatas.splice(1,1);
	//alert(userId);
	//var hosturl="http://"+host+"/"+projName+"/pages/savefile.jsp";
	var hosturl=urlForServer+'Upload/audio/'+userId;
	//alert('hosturl : '+hosturl);

   $.jRecorder(

     { 
        host : hosturl ,  //replace with your server path please
        
        callback_started_recording:     function(){callback_started(); },
        callback_stopped_recording:     function(){callback_stopped(); },
        callback_activityLevel:          function(level){callback_activityLevel(level); },
        callback_activityTime:     function(time){callback_activityTime(time); },
        
        callback_finished_sending:     function(time){ callback_finished_sending(); },
        
        swf_path : '../javascript/jRecorder.swf'
     
     }
   );
   function recordopen(){
	   
		   document.getElementById("audio_recording").style.display="block";
		   document.getElementById("excel_uploading").style.display="none";
	}
   function recordclose(){
	   document.getElementById("audio_recording").style.display="none";
   }
   $('#recordwithmic').click(function(){
	   recordopen();
   });
   $('#excelupload').click(function(){
	   excelopen();
   });
   
   // record/play/stop purpose using
   
   $('#record').click(function(){
       $.jRecorder.record(30);
   });
   $('#stop').click(function(){
      $.jRecorder.stop();
   });
    $('#send').click(function(){
      $.jRecorder.sendData();
     // recordclose();
   });
    
   function callback_finished()
   {
       $('#status').html('Recording is finished');
   }
   
   function callback_started()
   {
       $('#status').html('Recording is started');
   }
   
   function callback_error(code)
   {
       $('#status').html('Error, code:' + code);
   }
   
   function callback_stopped()
   {
       $('#status').html('Stop request is accepted');
   }

   function callback_finished_recording()
   {
       $('#status').html('Recording event is finished');
   }
   
   function callback_finished_sending()
   {
       $('#status').html('File has been sent to server mentioned as host parameter');
   }
   
   function callback_activityLevel(level)
   {
     $('#level').html(level);
     
     if(level == -1)
     {
       $('#levelbar').css("width",  "2px");
     }
     else
     {
       $('#levelbar').css("width", (level * 2)+ "px");
     }
   }
   
   function callback_activityTime(time)
   {
    //$('.flrecorder').css("width", "1px"); 
    //$('.flrecorder').css("height", "1px"); 
     $('#time').html(time);
   }