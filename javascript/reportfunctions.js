$(function(){
	
	
	
	$("#submitAdvance").click(function(){	
		var currentTime ,month , day , year;

		var Duration ;
		var reportType= $('input:radio[name=broadcastReportType]:checked').val();
		var advanceReportType= $("#advanceType").val();

		 currentTime = new Date();
		 day = currentTime.getDate();
		 month = currentTime.getMonth() + 1;
		 year = currentTime.getFullYear();
		
		
		if(advanceReportType=='Today')
		{			
			 reportType='singleDay';			
		}else if(advanceReportType=='Yesterday')
		{
			 reportType='singleDay';			
			// day = currentTime.getDate()-1;

		}
		else if(advanceReportType=='last3Days')
		{
			 reportType='monthly';	
			 Duration =2;
		}
		else if(advanceReportType=='last7Days')
		{
			 reportType='monthly';	
			 Duration =6;
		}else if(advanceReportType=='currentMonth')
		{
			 reportType='monthly';	
			
				 Duration = day-1; 
			
			 
		}
		
		
		
		if(reportType =="singleDay")
		{			
		  loadRestForSingleDay(urlForServer + '/report/SingleDayReport'+"/"+day+"/"+month+"/"+year);
		}
		else if(reportType =="monthly")
		{
			 loadRestForSingleDay(urlForServer + '/report/MonthlyDayReport'+"/"+day+"/"+month+"/"+year+"/"+Duration);
		}
		
		
		
		
	});
	
	$("#submit").click(function(){	
		var Duration =31 ;
		var date= $("#reportDate").val();
		var reportType= $('input:radio[name=broadcastReportType]:checked').val();

			var mySplitResult = date.split("/");		
			var month ,day ,year ;	    		
			for(i = 0; i < mySplitResult.length; i++){
				if(i==0)
				{
					month = mySplitResult[i];				
				}else if(i==1)
				{
					day = mySplitResult[i];				
				}
				else if(i==2)
				{
					year = mySplitResult[i];				
				}
			}
			

		if(reportType =="singleDay")
		{			
		  loadRestForSingleDay(urlForServer + '/report/SingleDayReport'+"/"+day+"/"+month+"/"+year);
		}
		else if(reportType =="monthly")
		{
			 loadRestForSingleDay(urlForServer + '/report/MonthlyDayReport'+"/"+day+"/"+month+"/"+year+"/"+Duration);
		}		
	});

	$("#submit1").click(function(){	
		
		
		//var date= $("#drillDownDate").val();
		
		var reportMonth =  $("#drillDownMonth").val();
		var reportYear =  $("#drillDownYear").val();
		
		
		var chartType= $("#chartType").val();
		
		if(reportYear=='defaultYear'&& reportMonth=='defaultMonth' && chartType=='defaultValue')
		{
			alert("Select Year , Month and Chart Type");
		}
		else if(reportYear=='defaultYear')
		{
			alert("Select Year ");
		}
		else if(reportMonth=='defaultMonth')
		{
			alert("Select Month");
		}
		
		else if(chartType=='defaultValue' )
		{
			alert("Select Chart Type ");
		}
		else
		{		
			
			
			
			
			
			
		//	$("#drillDownDate").attr("disabled", true);
			
			$("#drillDownMonth").attr("disabled", true);
			$("#drillDownYear").attr("disabled", true);	
			$("#chartType").attr("disabled", true);
			$("#submit1").attr("disabled", true);
			$("#drillDownReport").attr("disabled", true);
			$("#broadcastReport").attr("disabled", true);
			$("#drillDownLoading").removeClass("hidden");
			
			loadRestFulldataForDrillDown(urlForServer+"report/"+"DrillDown/"+"01"+"/"+reportMonth+"/"+reportYear);
			
			
			
		}
		
		
		
	
	});

	$("#cancel1").click(function(){
		$("#drillDownChart").addClass("hidden");	
		$("#chartType").removeAttr("disabled");
		//$("#drillDownDate").removeAttr("disabled"); 
		$("#submit1").removeAttr("disabled");
		$("#drillDownReport").removeAttr("disabled"); 
		$("#broadcastReport").removeAttr("disabled");	
		$("#drillDownMonth").removeAttr("disabled");	
		$("#drillDownYear").removeAttr("disabled");	
		
	});

	 $("#generateReportBtn").click(function(){ 
		 var myGrid = $('#taskTable'),
		     selRowId = myGrid.jqGrid ('getGridParam', 'selrow'),
		     celValue = myGrid.jqGrid ('getCell', selRowId, 'taskId');
		
		 var restfulUrl=urlForServer+"report/get/" ;
		 
				if(celValue!=null)
				{
				  $("#loading").removeClass("hidden");
				  var restfulPageUrl = restfulUrl + celValue ;//+ 'page'; http://192.168.1.65:8080/api.vc/v1.0/CallList
                  loadRestfuldata(restfulPageUrl);
				}
				else
				{
					alert('Select any one TaskSid');
				}
	 });
	 
	 
	 $("#cancel").click(function(){	
		 $("#taskHeading").addClass("hidden");
		 $("#report").addClass("hidden");	 
		 // Enabling the Buttons
		 $("#submit").removeAttr("disabled"); 		
		 $("#reportDate").removeAttr("disabled");
		 $("#drillDownReport").removeAttr("disabled");
		 $("#broadcastReport").removeAttr("disabled");
		 $("#singleDay").removeAttr("disabled");
		// $("#monthly").removeAttr("disabled");
		 $("#advance").removeAttr("disabled");
		
 
		});
	 
	 $("#cancelAdvance").click(function(){	
		 $("#taskHeading").addClass("hidden");
		 $("#report").addClass("hidden");	 
		 // Enabling the Buttons
		 $("#submitadvance").removeAttr("disabled"); 	
		 $("#advanceType").removeAttr("disabled");
		 $("#reportDate").removeAttr("disabled");
		 $("#drillDownReport").removeAttr("disabled");
		 $("#broadcastReport").removeAttr("disabled");
		 $("#singleDay").removeAttr("disabled");
		// $("#monthly").removeAttr("disabled");
		 $("#advance").removeAttr("disabled");
		});
 
	 $("#drillDownReport").click(function(){	
			var reportType= $('input:radio[name=mainReportType]:checked').val();
			
			if(reportType =="drillDownReport")
			{
				$("#drillDown").removeClass("hidden");
				$("#broadcastHistory").addClass("hidden");
			}	
	 });
	 
	 $("#broadcastReport").click(function(){
			var reportType= $('input:radio[name=mainReportType]:checked').val();
			
			if(reportType =="broadcastReport")
			{
				$("#broadcastHistory").removeClass("hidden");
				$("#drillDown").addClass("hidden");
			}
	 });
	 
	 $("#singleDay").click(function(){
			var reportFor= $('input:radio[name=broadcastReportType]:checked').val();
			
			if(reportFor =="singleDay")
			{
				$("#broadcastAdvance").addClass("hidden");
				$("#broadcastDate").removeClass("hidden");	
			}
	 });
	 
	 /* Removed because Monthly option is removed from broadcastreport tab 
	 
	 $("#monthly").click(function(){
			var reportFor= $('input:radio[name=broadcastReportType]:checked').val();
			
			if(reportFor =="monthly")
			{
				$("#broadcastAdvance").addClass("hidden");
				$("#broadcastDate").removeClass("hidden");
				
			}
	 });
	 
	 */
	 
	 $("#advance").click(function(){
			var reportFor= $('input:radio[name=broadcastReportType]:checked').val();
			
			if(reportFor =="advance")
			{
				$("#broadcastDate").addClass("hidden");
				$("#broadcastAdvance").removeClass("hidden");
				
			}
	 });
	 
	 
	function loadRestForSingleDay(pageUrl ) {
  		$("#taskLoading").removeClass("hidden");

  		$.ajax({
  			url:pageUrl,
  			type:"POST",
  			datatype:"json",
  			contentType:"application/x-www-form-urlencoded",
  			error:function(){
  				alert('Error');
  			},
  			success:function(data){

  				var data1 = jQuery.parseJSON(data);
  						
  				if(data1 ==null)
  				{
  					alert("No Record exist");  					
  					$("#taskLoading").addClass("hidden");
  					 //Enabling the Buttons 			 
  					 $("#submit").removeAttr("disabled"); 
  					 $("#submitadvance").removeAttr("disabled");
  					 $("#advanceType").removeAttr("disabled");
  					 $("#reportDate").removeAttr("disabled");
  					 $("#drillDownReport").removeAttr("disabled");
  					 $("#broadcastReport").removeAttr("disabled");
  					 $("#singleDay").removeAttr("disabled");
  					// $("#monthly").removeAttr("disabled");
  					 $("#advance").removeAttr("disabled");

  				}
  				else
  				{
 
  					$("#taskLoading").addClass("hidden");
  					$("#taskHeading").removeClass("hidden"); 					
  					//Disabling the buttons  					
  					$("#submit").attr("disabled", true);
  					$("#submitadvance").attr("disabled", true);
  					$("#advanceType").attr("disabled", true);
  					$("#reportDate").attr("disabled", true);
  					$("#singleDay").attr("disabled", true);
  				//	$("#monthly").attr("disabled", true);
  					$("#advance").attr("disabled", true);
  					$("#drillDownReport").attr("disabled", true);
  					$("#broadcastReport").attr("disabled", true);			
  					$("#taskTable").jqGrid("GridUnload");
					
  					 $("#taskTable").jqGrid({
  						data:data1,
      	        		datatype: "local",
      	        		sortable: true,       		
      	        		height: 250,
      	        		width: 350,
      	        		 colNames:['Task Sid','Description','Date'],
      	        	   	colModel:[
      	        	   	    {name:'taskId',index:'taskId', width:50},
      	        	   		{name:'taskDesc',index:'taskDesc', width:150},
      	        	   		{name:'date',index:'date', width:50}
      	      
      	        	   ],
      	        	  
      	        	   pager: "#tablePage",
      	        	   sortname: 'taskId', 
      	        	   viewrecords: true, 
      	        	   sortorder: "desc",
             	           caption: "Task Details"
      	        	 });
  				}	
  			}
      	});
	} 

	function loadRestfuldata(pageUrl) {

    		$.ajax({
    			url:pageUrl,
    			type:"POST",
    			datatype:"json",
    			contentType:"application/x-www-form-urlencoded",
    			error:function(){
    				alert('Error');
    			},
    			success:function(data){
    				var jsonobject=JSON.parse(data);
    				
    				$("#list1").jqGrid("GridUnload");
    	        	$("#list2").jqGrid("GridUnload");
    	        	$("#list3").jqGrid("GridUnload");
    	        	$("#list4").jqGrid("GridUnload");
    	        	$("#list5").jqGrid("GridUnload");
    	        	$("#list6").jqGrid("GridUnload");
    	        	$("#list7").jqGrid("GridUnload");
    	        	$("#list8").jqGrid("GridUnload");
    	        	
    	        	if(data[0].taskSid!='null' && data[0].taskSid!='')
    	        	$("#report").removeClass("hidden");
    	        	
    	        	$("#list1").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Broadcast Sid','Start Day','Start Month','Start Year','Start Hour','Start Minute','End Day','End Month','End Year','End Hour','End Minute'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'broadcastSid',index:'broadcastSid', width:80},
    	        	   		{name:'startDay' , index:'startDay' , width:80, align:"center"},
    	        	   		{name:'startMonth', index:'startMonth' , width:80 ,align:"center"},
    	        	   		{name:'startYear' , index:'startYear', width:80 ,align:"center"},
    	        	   		{name:'startHour', index:'startHour', width:80 ,align:"center"},
    	        	   		{name:'startMinute', index:'startMinute', width:80 ,align:"center"},
    	        	   		{name:'endDay' , index:'endDay', width:80 ,align:"center"},
    	        	   		{name:'endMonth', index:'endMonth', width:80 ,align:"center"},
    	        	   		{name:'endYear', index:'endYear', width:80 ,align:"center"},
    	        	   		{name:'endHour', index:'endHour', width:80 ,align:"center"},
    	        	   		{name:'endMinute', index:'endMinute', width:80 ,align:"center"}
    	        	   ],
    	        	   	caption: "Task Details"
    	        	 });
    	        	$("#list2").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Total Scheduled','Total Attempts','Total Remaining','Total Time','Total Charge'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'totalScheduled',index:'totalScheduled', width:100 ,align:"center"},
    	        	   		{name:'totalAttempts',index:'totalAttempts', width:100 ,align:"center"},
    	        	   		{name:'totalRemaining',index:'totalRemaining', width:100 ,align:"center"},
    	        	   		{name:'totalMinutesSeconds',index:'totalMinutesSeconds', width:80 ,align:"center"},
    	        	   		{name:'totalCharge',index:'totalCharge', width:80 ,align:"center"}
    	        	   ],
    	        	   	caption: "Schedule Details"
    	        	 });
    	        	$("#list3").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Answered','Machine','Busy','Tty','Fax'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'resultAnswered',index:'resultAnswered', width:80 ,align:"center"},
    	        	   		{name:'resultMachine',index:'resultMachine', width:80 ,align:"center"},
    	        	   		{name:'resultBusy',index:'resultBusy', width:80 ,align:"center"},
    	        	   		{name:'resultTty',index:'resultTty', width:80 ,align:"center"},
    	        	   		{name:'resultFax',index:'resultFax', width:80 ,align:"center"}
    	        	   ],
    	        	   	caption: "Call Details"
    	        	 });
    	        	$("#list4").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Invalid','DNC','Timed out','Cancelled'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'resultInvalid',index:'resultInvalid', width:80 ,align:"center"},
    	        	   		{name:'resultDoNotCall',index:'resultDoNotCall', width:80 ,align:"center"},
    	        	   		{name:'resultTimedOut',index:'resultTimedOut', width:80 ,align:"center"},
    	        	   		{name:'resultCancelled',index:'resultCancelled', width:80 ,align:"center"}
    	        	   		
    	        	   ],
    	        	   	caption: "Call Response Details"
    	        	 });
    	        	$("#list5").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Key 0','Key 1','Key 2','Key 3','Key 4','Key 5','Key 6','Key 7','Key 8','Key 9'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'zeroKeyCount',index:'zeroKeyCount', width:50 ,align:"center"},
    	        	   		{name:'oneKeyCount',index:'oneKeyCount', width:50 ,align:"center"},
    	        	   		{name:'twoKeyCount',index:'twoKeyCount', width:50 ,align:"center"},
    	        	   		{name:'threeKeyCount',index:'threeKeyCount', width:50 ,align:"center"},
    	        	   		{name:'fourKeyCount',index:'fourKeyCount', width:50 ,align:"center"},
    	        	   		{name:'fiveKeyCount',index:'fiveKeyCount', width:50 ,align:"center"},
    	        	   		{name:'sixKeyCount',index:'sixKeyCount', width:50 ,align:"center"},
    	        	   		{name:'sevenKeyCount',index:'sevenKeyCount', width:50 ,align:"center"},
    	        	   		{name:'eightKeyCount',index:'eightKeyCount', width:50 ,align:"center"},
    	        	   		{name:'nineKeyCount',index:'nineKeyCount', width:50 ,align:"center"}
    	        	   		
    	        	   ],
    	        	   	caption: "Key Value Details"
    	        	 });
    	        	$("#list6").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Linkback Answered','Linkback Talkoff','Dropped At Transfer','Dropped At Hold','Dropped Total'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'linkbacksAnswered',index:'linkbacksAnswered', width:120 ,align:"center"},
    	        	   		{name:'linkbackTalkOffs',index:'linkbackTalkOffs', width:120 ,align:"center"},
    	        	   		{name:'linkbacksDroppedAtTransfer',index:'linkbacksDroppedAtTransfer', width:120 ,align:"center"},
    	        	   		{name:'linkbacksDroppedAtHold',index:'linkbacksDroppedAtHold', width:100 ,align:"center"},
    	        	   		{name:'linkbacksDroppedTotal',index:'linkbacksDroppedTotal', width:100 ,align:"center"}
    	        	   		
    	        	   ],
    	        	   	caption: "Linkback Details"
    	        	 });
    	        	$("#list7").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Average Message','Average Transfer','Onekey Connect','Talk Off','Average Totaltime','Average Cost'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'linkbacksAvgMessage',index:'linkbacksAvgMessage', width:120 ,align:"center"},
    	        	   		{name:'linkbacksAvgTransfer',index:'linkbacksAvgTransfer', width:120 ,align:"center"},
    	        	   		{name:'linkbacksAvgOneKeyConnect',index:'linkbacksAvgOneKeyConnect', width:120 ,align:"center"},
    	        	   		{name:'linkbacksAvgTalkOff',index:'linkbacksAvgTalkOff', width:100 ,align:"center"},
    	        	   		{name:'linkbacksAvgTotalTime',index:'linkbacksAvgTotalTime', width:120 ,align:"center"},
    	        	   		{name:'linkbacksAvgCost',index:'linkbacksAvgCost', width:100 ,align:"center"}
    	        	   ],
    	        	   	caption: "Average Linkback Details"
    	        	 });
    	        	$("#list8").jqGrid({
    	        		datatype: "json",
    	        		sortable: true,
    	        		height: 25,
    	        		width: 950,
    	        		 colNames:['Task Sid','Email Sent','Email Invalid','Email DNC'],
    	        	   	colModel:[
    	        	   	    {name:'taskSid',index:'taskSid', width:50},
    	        	   		{name:'emailsSent',index:'emailsSent', width:80 ,align:"center"},
    	        	   		{name:'emailsInvalid',index:'emailsInvalid', width:80 ,align:"center"},
    	        	   		{name:'emailsDNC',index:'emailsDNC', width:80 ,align:"center"}
    	        	   		
    	        	   ],
    	        	   	caption: "Email Details"
    	        	 });
    	        	
    	        	for(var i=0;i<jsonobject.length;i++)
    	        	{
    	        		$("#list1").jqGrid('addRowData',i+1,jsonobject[i]);
    	        		$("#list2").jqGrid('addRowData',i+1,jsonobject[i]);
    	        		$("#list3").jqGrid('addRowData',i+1,jsonobject[i]);
    	        		$("#list4").jqGrid('addRowData',i+1,jsonobject[i]);
    	        		$("#list5").jqGrid('addRowData',i+1,jsonobject[i]);
    	        		$("#list6").jqGrid('addRowData',i+1,jsonobject[i]);
    	        		$("#list7").jqGrid('addRowData',i+1,jsonobject[i]);
    	        		$("#list8").jqGrid('addRowData',i+1,jsonobject[i]);
    	        	}
    	        	$("#loading").addClass("hidden");

    			}
		
    		});	
	}
		
	function loadRestFulldataForDrillDown(pageUrl)
	  {
    		$.ajax({
    			url:pageUrl,
    			type:"POST",
    			datatype:"json",
    			contentType:"application/x-www-form-urlencoded",
    			error:function(){
    				alert('Error');
    			},
    			success:function(data){
    				
    				var data1 = jQuery.parseJSON(data);
 
    				if(data1 ==null)
    				{
    					alert("No Record exist");
    					
    					$("#chartType").removeAttr("disabled");
    				//	$("#drillDownDate").removeAttr("disabled"); 
    					$("#submit1").removeAttr("disabled");
    					$("#drillDownReport").removeAttr("disabled");
      					$("#broadcastReport").removeAttr("disabled");
      					$("#drillDownLoading").addClass("hidden");     					
      					$("#drillDownMonth").removeAttr("disabled");	
      					$("#drillDownYear").removeAttr("disabled");
      					

    				}
    				else
    				{
    					
    					$("#drillDownLoading").addClass("hidden");

        				var chart;
        				$(document).ready(function() {

          				  var colors = Highcharts.getOptions().colors,
          				      categories=new Array() ,
          				      name = 'Broadcast Summary',
          				      basicChart='chart1';
          				   

          				   if(data1!=null)
          				   {
          					  $("#drillDownChart").removeClass("hidden");
          				    }
          				    
          				   for(var i=0;i<data1.length;i++)
          				    {
          				        categories[i] =  data1[i].maincategorieName  ;
          				     }

          				 function setChart( chartType , name, categories, data, color) 
    				       {
    				          
    				           chart.xAxis[0].setCategories(categories);
    				           

    				           chart.setTitle({text: name});
    				           
    				           var length = data.length;
    				           var seriesLength = chart.series.length; 

    				           

    				            

    				             for( var j=(seriesLength-1);j>=0;j--)
    				             {
    				                 // var m=j-1;
    				                 // alert(j);
    				               chart.series[j].remove(); 
    				               
    				             }


    				           

    				          if(basicChart=='chart1' || basicChart=='chart2' || basicChart=='chart3')
    				          {

    				             for( var i=0;i<length;i++)
    				             {
    				                chart.addSeries({
    				                  name: data[i].name,
    				                  data: data[i].data,
    				                  color: data[i].color || 'blue'
    				                 });    
    				               }
    				          }
    				          else
    				          {
    				               chart.addSeries({
    				                 name: name,
    				                 data:data,
    				                 color: data.color || 'red'
    				                });

    				          }


    				             if(basicChart=='chart1')
    				             {
    				                    basicChart='chart2';
    				             }
    				             else if(basicChart=='chart2')
    				             {
    				                    basicChart='chart3' ;           
    				             }
    				             else  if(basicChart=='chart3')
    				             {
    				                    basicChart='chart4' ; 
    				             }
    				             else  if(basicChart=='chart4')
    				             {
    				                    basicChart='chart1' ; 
    				             }
    				           

    				       }     
          				    
          				    
          				  var element = document.getElementById('chartType');

   				 	      var chartType = element.options[element.selectedIndex].value;

          				     if(chartType=='Line')
          				      {
 

          				       chart = new Highcharts.Chart({
          				           chart: {
          				               renderTo: 'container',
          				               type: 'line'
          				           },
          				           title: {
          				               text: 'Broadcast Report'
          				           },
          				           subtitle: {
          				               text: 'Click the points to view the Next Level. '
          				           },
          				           xAxis: {
          				               categories: categories,
          				             labels: {
                                           rotation: -45,
                                           align: 'right',
                                           style: {
                                                   fontSize: '13px',
                                                   fontFamily: 'Verdana, sans-serif'
                                                  }
                                           }
          				           },
          				           yAxis: {
          				               title: {
          				                   text: 'Total Call'
          				               }
          				           },
          				           plotOptions: {
          				               line: {
          				                   cursor: 'pointer',
          				                   point: {
          				                       events: {
          				                           click: function() {

          				                               

          				                               if(basicChart=='chart1')
          				                               {
          				    
          				                                   weaklyDrilldown = this.drillDown;
          				                                  
          				                                  if(weaklyDrilldown.week1)
          				                                  {
          				                                    week1 = weaklyDrilldown.week1 ;
          				                                  }

          				                                   if(weaklyDrilldown.week2)
          				                                  {
          				                                    week2 = weaklyDrilldown.week2 ;
          				                                  }

          				                                   if(weaklyDrilldown.week3)
          				                                  {
          				                                    week3 = weaklyDrilldown.week3 ;
          				                                  }

          				                                   if(weaklyDrilldown.week4)
          				                                  {
          				                                    week4 = weaklyDrilldown.week4 ;
          				                                  }

          				                                  if(weaklyDrilldown.week5)
          				                                  {
          				                                    week5 = weaklyDrilldown.week5 ;
          				                                  }

          				                                  if(weaklyDrilldown.week6)
          				                                  {
          				                                    week6 = weaklyDrilldown.week6 ;
          				                                  }




          				                                  // weakDrilldown = weaklyDrilldown.drilldown1; 

          				                                  // dayDrilldown = weakDrilldown.drilldown2; 

          				                               }
          				                                                   



          				                              
          				                               if (basicChart=='chart1')
          				                                { // drill down
          				                                   
          				                                   setChart(basicChart ,weaklyDrilldown.name, weaklyDrilldown.categories, weaklyDrilldown.series, weaklyDrilldown.color );
          				                               } 
          				                               else  if (basicChart=='chart2') 
          				                               {
          				                            	  
          				                                 if(this.x==0)
          				                                 {
          				                                    //Loading the day data according to the slected week 

          				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

          				                                    if(week1.day1)
          				                                    {
          				                                      day1 = week1.day1;
          				                                    } 

          				                                     if(week1.day2)
          				                                    {
          				                                      day2 = week1.day2;
          				                                    }

          				                                     if(week1.day2)
          				                                    {
          				                                      day2 = week1.day2;
          				                                    }

          				                                     if(week1.day3)
          				                                    {
          				                                      day3 = week1.day3;
          				                                    }

          				                                     if(week1.day4)
          				                                    {
          				                                      day4 = week1.day4;
          				                                    }


          				                                     if(week1.day5)
          				                                    {
          				                                      day5 = week1.day5;
          				                                    }

          				                                      if(week1.day6)
          				                                    {
          				                                      day6 = week1.day6;
          				                                    }

          				                                   if(week1.day7)
          				                                    {
          				                                      day7 = week1.day7;
          				                                    }




          				                                    setChart(basicChart ,week1.name, week1.categories, week1.series, week1.color );
          				                                 }
          				                                 else if(this.x==1)
          				                                 {

          				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

          				                                      if(week2.day1)
          				                                    {
          				                                      day1 = week2.day1;
          				                                    } 

          				                                     if(week2.day2)
          				                                    {
          				                                      day2 = week2.day2;
          				                                    }

          				                                     if(week2.day2)
          				                                    {
          				                                      day2 = week2.day2;
          				                                    }

          				                                     if(week2.day3)
          				                                    {
          				                                      day3 = week2.day3;
          				                                    }

          				                                     if(week2.day4)
          				                                    {
          				                                      day4 = week2.day4;
          				                                    }

          				                                     if(week2.day5)
          				                                    {
          				                                      day5 = week2.day5;
          				                                    }

          				                                      if(week2.day6)
          				                                    {
          				                                      day6 = week2.day6;
          				                                    }

          				                                   if(week2.day7)
          				                                    {
          				                                      day7 = week2.day7;
          				                                    }



          				                                    setChart(basicChart ,week2.name, week2.categories, week2.series, week2.color );
          				                                 }
          				                                 else if(this.x==2)
          				                                 {

          				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

          				                                      if(week3.day1)
          				                                    {
          				                                      day1 = week3.day1;
          				                                    } 

          				                                     if(week3.day2)
          				                                    {
          				                                      day2 = week3.day2;
          				                                    }

          				                                     if(week3.day2)
          				                                    {
          				                                      day2 = week3.day2;
          				                                    }

          				                                     if(week3.day3)
          				                                    {
          				                                      day3 = week3.day3;
          				                                    }

          				                                     if(week3.day4)
          				                                    {
          				                                      day4 = week3.day4;
          				                                    }

          				                                     if(week3.day5)
          				                                    {
          				                                      day5 = week3.day5;
          				                                    }

          				                                      if(week3.day6)
          				                                    {
          				                                      day6 = week3.day6;
          				                                    }

          				                                   if(week3.day7)
          				                                    {
          				                                      day7 = week3.day7;
          				                                    }



          				                                    setChart(basicChart ,week3.name, week3.categories, week3.series, week3.color );
          				                                 }

          				                                  else if(this.x==3)
          				                                 {

          				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

          				                                      if(week4.day1)
          				                                    {
          				                                      day1 = week3.day1;
          				                                    } 

          				                                     if(week4.day2)
          				                                    {
          				                                      day2 = week4.day2;
          				                                    }

          				                                     if(week4.day2)
          				                                    {
          				                                      day2 = week4.day2;
          				                                    }

          				                                     if(week4.day3)
          				                                    {
          				                                      day3 = week4.day3;
          				                                    }

          				                                     if(week4.day4)
          				                                    {
          				                                      day4 = week4.day4;
          				                                    }

          				                                     if(week4.day5)
          				                                    {
          				                                      day5 = week4.day5;
          				                                    }

          				                                      if(week4.day6)
          				                                    {
          				                                      day6 = week4.day6;
          				                                    }

          				                                   if(week4.day7)
          				                                    {
          				                                      day7 = week4.day7;
          				                                    }



          				                                    setChart(basicChart ,week4.name, week4.categories, week4.series, week4.color );
          				                                 }
          				                                  else if(this.x==4)
          				                                 {

          				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

          				                                      if(week5.day1)
          				                                    {
          				                                      day1 = week5.day1;
          				                                    } 

          				                                     if(week5.day2)
          				                                    {
          				                                      day2 = week5.day2;
          				                                    }

          				                                     if(week5.day2)
          				                                    {
          				                                      day2 = week5.day2;
          				                                    }

          				                                     if(week5.day3)
          				                                    {
          				                                      day3 = week5.day3;
          				                                    }

          				                                     if(week5.day4)
          				                                    {
          				                                      day4 = week5.day4;
          				                                    }

          				                                     if(week5.day5)
          				                                    {
          				                                      day5 = week5.day5;
          				                                    }

          				                                      if(week5.day6)
          				                                    {
          				                                      day6 = week5.day6;
          				                                    }

          				                                   if(week5.day7)
          				                                    {
          				                                      day7 = week5.day7;
          				                                    }



          				                                    setChart(basicChart ,week5.name, week5.categories, week5.series, week5.color );
          				                                 }
          				                                  else if(this.x==5)
          				                                 {

          				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

          				                                      if(week6.day1)
          				                                    {
          				                                      day1 = week6.day1;
          				                                    } 

          				                                     if(week6.day2)
          				                                    {
          				                                      day2 = week6.day2;
          				                                    }

          				                                     if(week6.day2)
          				                                    {
          				                                      day2 = week6.day2;
          				                                    }

          				                                     if(week6.day3)
          				                                    {
          				                                      day3 = week6.day3;
          				                                    }

          				                                     if(week6.day4)
          				                                    {
          				                                      day4 = week6.day4;
          				                                    }

          				                                     if(week6.day5)
          				                                    {
          				                                      day5 = week6.day5;
          				                                    }

          				                                      if(week6.day6)
          				                                    {
          				                                      day6 = week6.day6;
          				                                    }

          				                                   if(week6.day7)
          				                                    {
          				                                      day7 = week6.day7;
          				                                    }



          				                                    setChart(basicChart ,week6.name, week6.categories, week6.series, week6.color );
          				                                 }


          				                               //  setChart(basicChart ,weakDrilldown.name, weakDrilldown.categories, weakDrilldown.series, weakDrilldown.color );

  
          				                               }
          				                               else  if (basicChart=='chart3') { // Weakly Report

          				                                 if(this.x==0)
          				                                 {
          				                                     setChart(basicChart ,day1.name, day1.categories, day1.series, day1.color );
          				                                 }
          				                                 else if(this.x==1)
          				                                 {
          				                                     setChart(basicChart ,day2.name, day2.categories, day2.series, day2.color );
          				                                 }
          				                                 else if(this.x==2)
          				                                 {
          				                                     setChart(basicChart ,day3.name, day3.categories, day3.series, day3.color );
          				                                 }
          				                                 else if(this.x==3)
          				                                 {
          				                                     setChart(basicChart ,day4.name, day4.categories, day4.series, day4.color );
          				                                 }
          				                                 else if(this.x==4)
          				                                 {
          				                                     setChart(basicChart ,day5.name, day5.categories, day5.series, day3.color );
          				                                 }
          				                                 else if(this.x==5)
          				                                 {
          				                                     setChart(basicChart ,day6.name, day6.categories, day6.series, day6.color );
          				                                 }
          				                                 else if(this.x==6)
          				                                 {
          				                                     setChart(basicChart ,day7.name, day7.categories, day7.series, day7.color );
          				                                 }

          				                                   
          				                                   //setChart(basicChart ,dayDrilldown.name, dayDrilldown.categories, dayDrilldown.series, drilldown1.color );
          				                               }
          				                                else { // restore
          				                                   
          				                                   setChart(basicChart,name, categories, data1);
          				                               }
          				                           }
          				                       }
          				                   },
          				                   dataLabels: {
          				                       enabled: true,
          				                       color: colors[0],
          				                       style: {
          				                           fontWeight: 'bold'
          				                       }
          				                      
          				                   }
          				               }
          				           },
          				           tooltip: {
          				               formatter: function() {
          				                   var point = this.point ;
          				                     
          				                 if (point.drilldown) 
                                         {
                                               s ='<b>'+ this.x +':<b> <br/> Total Broadcast :'+ this.y +'  </b><br/>';
                                               s += 'Click to view the next level';
                                              
                                         } 
                                         else 
                                         {
                                               s ='<b>'+ this.x +':<b> <br/> '+this.series.name+':'+ this.y +'  </b><br/>';
                                               s += 'Click to view the next level';
                                         }
          				                   return s;
          				               }
          				           },
          				          
          				           series: [{
          				               name: name,
          				               data: data1,
          				               color: 'red'

          				           }],
          				           exporting: {
          				               enabled: true
          				           }
          				       });
	 
          				      }
          				     else  if(chartType=='Column')
          				     {
          				    	 //Column Type 
          				    	 

          				    	 

            				       chart = new Highcharts.Chart({
            				           chart: {
            				               renderTo: 'container',
            				               type: 'column'
            				           },
            				           title: {
            				               text: 'Broadcast Report'
            				           },
            				           subtitle: {
            				               text: 'Click the points to view the Next Level. '
            				           },
            				           xAxis: {
            				               categories: categories,
            				               labels: {
                                               rotation: -45,
                                               align: 'right',
                                               style: {
                                                       fontSize: '13px',
                                                       fontFamily: 'Verdana, sans-serif'
                                                      }
                                               }
            				           },
            				           yAxis: {
            				               title: {
            				                   text: 'Total Call'
            				               }
            				           },
            				           plotOptions: {
            				        	   column: {
            				                   cursor: 'pointer',
            				                   point: {
            				                       events: {
            				                           click: function() {

            				                               

            				                               if(basicChart=='chart1')
            				                               {
            				    
            				                                   weaklyDrilldown = this.drillDown;
            				                                  
            				                                  if(weaklyDrilldown.week1)
            				                                  {
            				                                    week1 = weaklyDrilldown.week1 ;
            				                                  }

            				                                   if(weaklyDrilldown.week2)
            				                                  {
            				                                    week2 = weaklyDrilldown.week2 ;
            				                                  }

            				                                   if(weaklyDrilldown.week3)
            				                                  {
            				                                    week3 = weaklyDrilldown.week3 ;
            				                                  }

            				                                   if(weaklyDrilldown.week4)
            				                                  {
            				                                    week4 = weaklyDrilldown.week4 ;
            				                                  }

            				                                  if(weaklyDrilldown.week5)
            				                                  {
            				                                    week5 = weaklyDrilldown.week5 ;
            				                                  }

            				                                  if(weaklyDrilldown.week6)
            				                                  {
            				                                    week6 = weaklyDrilldown.week6 ;
            				                                  }



            				                               }
            				                                                   



            				                              
            				                               if (basicChart=='chart1')
            				                                { // drill down
            				                                   
            				                                   setChart(basicChart ,weaklyDrilldown.name, weaklyDrilldown.categories, weaklyDrilldown.series, weaklyDrilldown.color );
            				                               } 
            				                               else  if (basicChart=='chart2') 
            				                               {
               				                            	  
                				                                 if(this.x==0)
                				                                 {
                				                                    //Loading the day data according to the slected week 

                				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

                				                                    if(week1.day1)
                				                                    {
                				                                      day1 = week1.day1;
                				                                    } 

                				                                     if(week1.day2)
                				                                    {
                				                                      day2 = week1.day2;
                				                                    }

                				                                     if(week1.day2)
                				                                    {
                				                                      day2 = week1.day2;
                				                                    }

                				                                     if(week1.day3)
                				                                    {
                				                                      day3 = week1.day3;
                				                                    }

                				                                     if(week1.day4)
                				                                    {
                				                                      day4 = week1.day4;
                				                                    }


                				                                     if(week1.day5)
                				                                    {
                				                                      day5 = week1.day5;
                				                                    }

                				                                      if(week1.day6)
                				                                    {
                				                                      day6 = week1.day6;
                				                                    }

                				                                   if(week1.day7)
                				                                    {
                				                                      day7 = week1.day7;
                				                                    }




                				                                    setChart(basicChart ,week1.name, week1.categories, week1.series, week1.color );
                				                                 }
                				                                 else if(this.x==1)
                				                                 {

                				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

                				                                      if(week2.day1)
                				                                    {
                				                                      day1 = week2.day1;
                				                                    } 

                				                                     if(week2.day2)
                				                                    {
                				                                      day2 = week2.day2;
                				                                    }

                				                                     if(week2.day2)
                				                                    {
                				                                      day2 = week2.day2;
                				                                    }

                				                                     if(week2.day3)
                				                                    {
                				                                      day3 = week2.day3;
                				                                    }

                				                                     if(week2.day4)
                				                                    {
                				                                      day4 = week2.day4;
                				                                    }

                				                                     if(week2.day5)
                				                                    {
                				                                      day5 = week2.day5;
                				                                    }

                				                                      if(week2.day6)
                				                                    {
                				                                      day6 = week2.day6;
                				                                    }

                				                                   if(week2.day7)
                				                                    {
                				                                      day7 = week2.day7;
                				                                    }



                				                                    setChart(basicChart ,week2.name, week2.categories, week2.series, week2.color );
                				                                 }
                				                                 else if(this.x==2)
                				                                 {

                				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

                				                                      if(week3.day1)
                				                                    {
                				                                      day1 = week3.day1;
                				                                    } 

                				                                     if(week3.day2)
                				                                    {
                				                                      day2 = week3.day2;
                				                                    }

                				                                     if(week3.day2)
                				                                    {
                				                                      day2 = week3.day2;
                				                                    }

                				                                     if(week3.day3)
                				                                    {
                				                                      day3 = week3.day3;
                				                                    }

                				                                     if(week3.day4)
                				                                    {
                				                                      day4 = week3.day4;
                				                                    }

                				                                     if(week3.day5)
                				                                    {
                				                                      day5 = week3.day5;
                				                                    }

                				                                      if(week3.day6)
                				                                    {
                				                                      day6 = week3.day6;
                				                                    }

                				                                   if(week3.day7)
                				                                    {
                				                                      day7 = week3.day7;
                				                                    }



                				                                    setChart(basicChart ,week3.name, week3.categories, week3.series, week3.color );
                				                                 }

                				                                  else if(this.x==3)
                				                                 {

                				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

                				                                      if(week4.day1)
                				                                    {
                				                                      day1 = week3.day1;
                				                                    } 

                				                                     if(week4.day2)
                				                                    {
                				                                      day2 = week4.day2;
                				                                    }

                				                                     if(week4.day2)
                				                                    {
                				                                      day2 = week4.day2;
                				                                    }

                				                                     if(week4.day3)
                				                                    {
                				                                      day3 = week4.day3;
                				                                    }

                				                                     if(week4.day4)
                				                                    {
                				                                      day4 = week4.day4;
                				                                    }

                				                                     if(week4.day5)
                				                                    {
                				                                      day5 = week4.day5;
                				                                    }

                				                                      if(week4.day6)
                				                                    {
                				                                      day6 = week4.day6;
                				                                    }

                				                                   if(week4.day7)
                				                                    {
                				                                      day7 = week4.day7;
                				                                    }



                				                                    setChart(basicChart ,week4.name, week4.categories, week4.series, week4.color );
                				                                 }
                				                                  else if(this.x==4)
                				                                 {

                				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

                				                                      if(week5.day1)
                				                                    {
                				                                      day1 = week5.day1;
                				                                    } 

                				                                     if(week5.day2)
                				                                    {
                				                                      day2 = week5.day2;
                				                                    }

                				                                     if(week5.day2)
                				                                    {
                				                                      day2 = week5.day2;
                				                                    }

                				                                     if(week5.day3)
                				                                    {
                				                                      day3 = week5.day3;
                				                                    }

                				                                     if(week5.day4)
                				                                    {
                				                                      day4 = week5.day4;
                				                                    }

                				                                     if(week5.day5)
                				                                    {
                				                                      day5 = week5.day5;
                				                                    }

                				                                      if(week5.day6)
                				                                    {
                				                                      day6 = week5.day6;
                				                                    }

                				                                   if(week5.day7)
                				                                    {
                				                                      day7 = week5.day7;
                				                                    }



                				                                    setChart(basicChart ,week5.name, week5.categories, week5.series, week5.color );
                				                                 }
                				                                  else if(this.x==5)
                				                                 {

                				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

                				                                      if(week6.day1)
                				                                    {
                				                                      day1 = week6.day1;
                				                                    } 

                				                                     if(week6.day2)
                				                                    {
                				                                      day2 = week6.day2;
                				                                    }

                				                                     if(week6.day2)
                				                                    {
                				                                      day2 = week6.day2;
                				                                    }

                				                                     if(week6.day3)
                				                                    {
                				                                      day3 = week6.day3;
                				                                    }

                				                                     if(week6.day4)
                				                                    {
                				                                      day4 = week6.day4;
                				                                    }

                				                                     if(week6.day5)
                				                                    {
                				                                      day5 = week6.day5;
                				                                    }

                				                                      if(week6.day6)
                				                                    {
                				                                      day6 = week6.day6;
                				                                    }

                				                                   if(week6.day7)
                				                                    {
                				                                      day7 = week6.day7;
                				                                    }



                				                                    setChart(basicChart ,week6.name, week6.categories, week6.series, week6.color );
                				                                 }


                				                               

        
                				                               }
            				                               else  if (basicChart=='chart3') { // Weakly Report

            				                                 if(this.x==0)
            				                                 {
            				                                     setChart(basicChart ,day1.name, day1.categories, day1.series, day1.color );
            				                                 }
            				                                 else if(this.x==1)
            				                                 {
            				                                     setChart(basicChart ,day2.name, day2.categories, day2.series, day2.color );
            				                                 }
            				                                 else if(this.x==2)
            				                                 {
            				                                     setChart(basicChart ,day3.name, day3.categories, day3.series, day3.color );
            				                                 }
            				                                 else if(this.x==3)
            				                                 {
            				                                     setChart(basicChart ,day4.name, day4.categories, day4.series, day4.color );
            				                                 }
            				                                 else if(this.x==4)
            				                                 {
            				                                     setChart(basicChart ,day5.name, day5.categories, day5.series, day3.color );
            				                                 }
            				                                 else if(this.x==5)
            				                                 {
            				                                     setChart(basicChart ,day6.name, day6.categories, day6.series, day6.color );
            				                                 }
            				                                 else if(this.x==6)
            				                                 {
            				                                     setChart(basicChart ,day7.name, day7.categories, day7.series, day7.color );
            				                                 }

            				                                   
            				                                   //setChart(basicChart ,dayDrilldown.name, dayDrilldown.categories, dayDrilldown.series, drilldown1.color );
            				                               }
            				                                else { // restore
            				                                   
            				                                   setChart(basicChart,name, categories, data1);
            				                               }
            				                           }
            				                       }
            				                   },
            				                   dataLabels: {
            				                       enabled: true,
            				                       color: colors[0],
            				                       style: {
            				                           fontWeight: 'bold'
            				                       }
            				                      
            				                   }
            				               }
            				           },
            				           tooltip: {
            				               formatter: function() {
            				                   var point = this.point ;
            				                     
            				                   if (point.drilldown) 
            				                   {
            				                         s ='<b>'+ this.x +':<b> <br/> Total Broadcast :'+ this.y +'  </b><br/>';
            				                         s += 'Click to view the next level';
            				                        
            				                   } 
            				                   else 
            				                   {
            				                         s ='<b>'+ this.x +':<b> <br/> '+this.series.name+':'+ this.y +'  </b><br/>';
            				                         s += 'Click to view the next level';
            				                   }
            				                   return s;
            				               }
            				           },
            				          
            				           series: [{
            				               name: name,
            				               data: data1,
            				               color: 'red'

            				           }],
            				           exporting: {
            				               enabled: false
            				           }
            				       });
  	 
            				      
          				    	 
          				     }
          				     else 
          				     {
          				    	 

          				    	 //Bar Type 
          				    	 

          				    	 

            				       chart = new Highcharts.Chart({
            				           chart: {
            				               renderTo: 'container',
            				               type: 'bar'
            				           },
            				           title: {
            				               text: 'Broadcast Report'
            				           },
            				           subtitle: {
            				               text: 'Click the points to view the Next Level. '
            				           },
            				           xAxis: {
            				               categories: categories,
            				               labels: {
                                               rotation: -45,
                                               align: 'right',
                                               style: {
                                                       fontSize: '13px',
                                                       fontFamily: 'Verdana, sans-serif'
                                                      }
                                               }
            				           },
            				           yAxis: {
            				               title: {
            				                   text: 'Total Call'
            				               }
            				           },
            				           plotOptions: {
            				        	   bar: {
            				                   cursor: 'pointer',
            				                   point: {
            				                       events: {
            				                           click: function() {

            				                               

            				                               if(basicChart=='chart1')
            				                               {
            				    
            				                                   weaklyDrilldown = this.drillDown;
            				                                  
            				                                  if(weaklyDrilldown.week1)
            				                                  {
            				                                    week1 = weaklyDrilldown.week1 ;
            				                                  }

            				                                   if(weaklyDrilldown.week2)
            				                                  {
            				                                    week2 = weaklyDrilldown.week2 ;
            				                                  }

            				                                   if(weaklyDrilldown.week3)
            				                                  {
            				                                    week3 = weaklyDrilldown.week3 ;
            				                                  }

            				                                   if(weaklyDrilldown.week4)
            				                                  {
            				                                    week4 = weaklyDrilldown.week4 ;
            				                                  }

            				                                  if(weaklyDrilldown.week5)
            				                                  {
            				                                    week5 = weaklyDrilldown.week5 ;
            				                                  }

            				                                  if(weaklyDrilldown.week6)
            				                                  {
            				                                    week6 = weaklyDrilldown.week6 ;
            				                                  }



            				                               }
            				                                                   



            				                              
            				                               if (basicChart=='chart1')
            				                                { // drill down
            				                                   
            				                                   setChart(basicChart ,weaklyDrilldown.name, weaklyDrilldown.categories, weaklyDrilldown.series, weaklyDrilldown.color );
            				                               } 
            				                               else  if (basicChart=='chart2') 
            				                               {

                				                            	  
              				                                 if(this.x==0)
              				                                 {
              				                                    //Loading the day data according to the slected week 

              				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

              				                                    if(week1.day1)
              				                                    {
              				                                      day1 = week1.day1;
              				                                    } 

              				                                     if(week1.day2)
              				                                    {
              				                                      day2 = week1.day2;
              				                                    }

              				                                     if(week1.day2)
              				                                    {
              				                                      day2 = week1.day2;
              				                                    }

              				                                     if(week1.day3)
              				                                    {
              				                                      day3 = week1.day3;
              				                                    }

              				                                     if(week1.day4)
              				                                    {
              				                                      day4 = week1.day4;
              				                                    }


              				                                     if(week1.day5)
              				                                    {
              				                                      day5 = week1.day5;
              				                                    }

              				                                      if(week1.day6)
              				                                    {
              				                                      day6 = week1.day6;
              				                                    }

              				                                   if(week1.day7)
              				                                    {
              				                                      day7 = week1.day7;
              				                                    }




              				                                    setChart(basicChart ,week1.name, week1.categories, week1.series, week1.color );
              				                                 }
              				                                 else if(this.x==1)
              				                                 {

              				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

              				                                      if(week2.day1)
              				                                    {
              				                                      day1 = week2.day1;
              				                                    } 

              				                                     if(week2.day2)
              				                                    {
              				                                      day2 = week2.day2;
              				                                    }

              				                                     if(week2.day2)
              				                                    {
              				                                      day2 = week2.day2;
              				                                    }

              				                                     if(week2.day3)
              				                                    {
              				                                      day3 = week2.day3;
              				                                    }

              				                                     if(week2.day4)
              				                                    {
              				                                      day4 = week2.day4;
              				                                    }

              				                                     if(week2.day5)
              				                                    {
              				                                      day5 = week2.day5;
              				                                    }

              				                                      if(week2.day6)
              				                                    {
              				                                      day6 = week2.day6;
              				                                    }

              				                                   if(week2.day7)
              				                                    {
              				                                      day7 = week2.day7;
              				                                    }



              				                                    setChart(basicChart ,week2.name, week2.categories, week2.series, week2.color );
              				                                 }
              				                                 else if(this.x==2)
              				                                 {

              				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

              				                                      if(week3.day1)
              				                                    {
              				                                      day1 = week3.day1;
              				                                    } 

              				                                     if(week3.day2)
              				                                    {
              				                                      day2 = week3.day2;
              				                                    }

              				                                     if(week3.day2)
              				                                    {
              				                                      day2 = week3.day2;
              				                                    }

              				                                     if(week3.day3)
              				                                    {
              				                                      day3 = week3.day3;
              				                                    }

              				                                     if(week3.day4)
              				                                    {
              				                                      day4 = week3.day4;
              				                                    }

              				                                     if(week3.day5)
              				                                    {
              				                                      day5 = week3.day5;
              				                                    }

              				                                      if(week3.day6)
              				                                    {
              				                                      day6 = week3.day6;
              				                                    }

              				                                   if(week3.day7)
              				                                    {
              				                                      day7 = week3.day7;
              				                                    }



              				                                    setChart(basicChart ,week3.name, week3.categories, week3.series, week3.color );
              				                                 }

              				                                  else if(this.x==3)
              				                                 {

              				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

              				                                      if(week4.day1)
              				                                    {
              				                                      day1 = week3.day1;
              				                                    } 

              				                                     if(week4.day2)
              				                                    {
              				                                      day2 = week4.day2;
              				                                    }

              				                                     if(week4.day2)
              				                                    {
              				                                      day2 = week4.day2;
              				                                    }

              				                                     if(week4.day3)
              				                                    {
              				                                      day3 = week4.day3;
              				                                    }

              				                                     if(week4.day4)
              				                                    {
              				                                      day4 = week4.day4;
              				                                    }

              				                                     if(week4.day5)
              				                                    {
              				                                      day5 = week4.day5;
              				                                    }

              				                                      if(week4.day6)
              				                                    {
              				                                      day6 = week4.day6;
              				                                    }

              				                                   if(week4.day7)
              				                                    {
              				                                      day7 = week4.day7;
              				                                    }



              				                                    setChart(basicChart ,week4.name, week4.categories, week4.series, week4.color );
              				                                 }
              				                                  else if(this.x==4)
              				                                 {

              				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

              				                                      if(week5.day1)
              				                                    {
              				                                      day1 = week5.day1;
              				                                    } 

              				                                     if(week5.day2)
              				                                    {
              				                                      day2 = week5.day2;
              				                                    }

              				                                     if(week5.day2)
              				                                    {
              				                                      day2 = week5.day2;
              				                                    }

              				                                     if(week5.day3)
              				                                    {
              				                                      day3 = week5.day3;
              				                                    }

              				                                     if(week5.day4)
              				                                    {
              				                                      day4 = week5.day4;
              				                                    }

              				                                     if(week5.day5)
              				                                    {
              				                                      day5 = week5.day5;
              				                                    }

              				                                      if(week5.day6)
              				                                    {
              				                                      day6 = week5.day6;
              				                                    }

              				                                   if(week5.day7)
              				                                    {
              				                                      day7 = week5.day7;
              				                                    }



              				                                    setChart(basicChart ,week5.name, week5.categories, week5.series, week5.color );
              				                                 }
              				                                  else if(this.x==5)
              				                                 {

              				                                    day1 = day2 = day3 = day4 = day5 = day6 = day7 = "";

              				                                      if(week6.day1)
              				                                    {
              				                                      day1 = week6.day1;
              				                                    } 

              				                                     if(week6.day2)
              				                                    {
              				                                      day2 = week6.day2;
              				                                    }

              				                                     if(week6.day2)
              				                                    {
              				                                      day2 = week6.day2;
              				                                    }

              				                                     if(week6.day3)
              				                                    {
              				                                      day3 = week6.day3;
              				                                    }

              				                                     if(week6.day4)
              				                                    {
              				                                      day4 = week6.day4;
              				                                    }

              				                                     if(week6.day5)
              				                                    {
              				                                      day5 = week6.day5;
              				                                    }

              				                                      if(week6.day6)
              				                                    {
              				                                      day6 = week6.day6;
              				                                    }

              				                                   if(week6.day7)
              				                                    {
              				                                      day7 = week6.day7;
              				                                    }



              				                                    setChart(basicChart ,week6.name, week6.categories, week6.series, week6.color );
              				                                 }
 
            				                            	   
            				                               }
            				                               else  if (basicChart=='chart3') { // Weakly Report

            				                                 if(this.x==0)
            				                                 {
            				                                     setChart(basicChart ,day1.name, day1.categories, day1.series, day1.color );
            				                                 }
            				                                 else if(this.x==1)
            				                                 {
            				                                     setChart(basicChart ,day2.name, day2.categories, day2.series, day2.color );
            				                                 }
            				                                 else if(this.x==2)
            				                                 {
            				                                     setChart(basicChart ,day3.name, day3.categories, day3.series, day3.color );
            				                                 }
            				                                 else if(this.x==3)
            				                                 {
            				                                     setChart(basicChart ,day4.name, day4.categories, day4.series, day4.color );
            				                                 }
            				                                 else if(this.x==4)
            				                                 {
            				                                     setChart(basicChart ,day5.name, day5.categories, day5.series, day3.color );
            				                                 }
            				                                 else if(this.x==5)
            				                                 {
            				                                     setChart(basicChart ,day6.name, day6.categories, day6.series, day6.color );
            				                                 }
            				                                 else if(this.x==6)
            				                                 {
            				                                     setChart(basicChart ,day7.name, day7.categories, day7.series, day7.color );
            				                                 }

            				                                   
            				                                   //setChart(basicChart ,dayDrilldown.name, dayDrilldown.categories, dayDrilldown.series, drilldown1.color );
            				                               }
            				                                else { // restore
            				                                   
            				                                   setChart(basicChart,name, categories, data1);
            				                               }
            				                           }
            				                       }
            				                   },
            				                   dataLabels: {
            				                       enabled: true,
            				                       color: colors[0],
            				                       style: {
            				                           fontWeight: 'bold'
            				                       }
            				                      
            				                   }
            				               }
            				           },
            				           tooltip: {
            				               formatter: function() {
            				                   var point = this.point ;
            				                     
            				                   if (point.drilldown) 
            				                   {
            				                         s ='<b>'+ this.x +':<b> <br/> Total Broadcast :'+ this.y +'  </b><br/>';
            				                         s += 'Click to view the next level';
            				                        
            				                   } 
            				                   else 
            				                   {
            				                         s ='<b>'+ this.x +':<b> <br/> '+this.series.name+':'+ this.y +'  </b><br/>';
            				                         s += 'Click to view the next level';
            				                   }
            				                   return s;
            				               }
            				           },
            				          
            				           series: [{
            				               name: name,
            				               data: data1,
            				               color: 'red'

            				           }],
            				           exporting: {
            				               enabled: false
            				           }
            				       });
  	 
            				      
          				    	 
          				     
          				    	 
          				    	 
          				     }
        				 
        				});
    				}

    			}

    		});

	}
});