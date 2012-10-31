$(document).ready(function() {
$.support.cors = true;
	$('ul.nav.nav-pills li a').click(function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	
	console.log("Started");

		
		$('#jqgrid2').append('<table id="fromgrid"></table><div id="frompager"></div>');
		

		//$('#settingsPage').attr("data","./settings.html"+loginQueryString);
		
		//console.log($('#jqgrid2').append('<table id="fromgrid"></table><div id="frompager"></div>'));
		console.log("Started 2");
	
	//	$(function() {
		//		//$('.dropdown-menu li').text(name1);
		//		$("#fromanch").attr( 'data-toggle', 'dropdown' );
		//		$("#fromul").append('<li><a href="#ClientInfo/for/clientinfo" id="testaction1">Action</a></li>').append('<li><a href="#ClientInfo/for/clientinfo" id="testaction1">Action</a></li>');
		//	});

		//	$(function() {
		//		//$('.dropdown-menu li').text(name1);
		//		$("#dropdownmenu").append('<li><a href="#ClientInfo/for/clientinfo" id="testaction1">Action</a></li>').append('<li><a href="#ClientInfo/for/clientinfo" id="testaction1">Action</a></li>');
		//	});
		//$('.dropdown-menu li').text("hi");

	});
//
//
//
//	
//
//	(function($){
//				
//				// cache nav
//				var nav = $("#topNav");
//				
//				// add indicator and hovers to submenu parents
//				nav.find("li").each(function() {
//					if ($(this).find("ul").length > 0) {
//						$("<span>").text("^").appendTo
//
//($(this).children(":first"));
//
//						// show subnav on hover
//						$(this).mouseenter(function() {
//							$(this).find("ul").stop
//
//(true, true).slideDown();
//						});
//						
//						// hide submenus on exit
//						$(this).mouseleave(function() {
//							$(this).find("ul").stop
//
//(true, true).slideUp();
//						});
//					}
//				});
//			})(jQuery);

// fluid menu

//$(function()
//		{
//		 
//		$('#menuBar li').click(function()
//		{
//		  var url = $(this).find('a').attr('href');
//		  document.location.href = url;
//		 
//		});
//		
//		
//		$('#menuBar li').hover(function()
//				{
//				   $(this).find('.menuInfo').slideDown();
//				},
//				function()
//				{
//				  $(this).find('.menuInfo').slideUp();
//				 
//				});
//				 
//				});

// datepicker

$(function() {
	$('#example17').datepicker( {
		addSliderAccess : true,
		sliderAccessArgs : {
			touchonly : false
		}
	});
});

$(function() {
$('#reportDate').datepicker( {
	addSliderAccess : true,
	sliderAccessArgs : {
		touchonly : false
	}
});
});

$(function() {
	$('#drillDownDate').datepicker( {
		addSliderAccess : true,
		sliderAccessArgs : {
			touchonly : false
		}
	});
	});


//$(function() {
//	   
//	   
//	   $("#ucancel").mouseover(function() {
//			$('#ucancel').tooltip('show');
//			});
//		
//		});
//$(function() {
//	$('#uadd').mouseover()
//	{
//
//		$('#uadd').tooltip('show');
//		$('#uupload').tooltip('show');
//		$('#ucancel').tooltip('show');
//		$('#udelete').tooltip('show');
//	}
//});
//$(function() {
//	$( "#selectable" ).selectable({
//		stop: function() {
//			var result = $( "#select-result" ).empty();
//			$( ".ui-selected", this ).each(function() {
//				var index = $( "#selectable li" ).index( this );
//				result.append( " #" + ( index + 1 ) );
//			});
//		}
//	});
//});
//
//
//$(function() {
//	$( "#selectable2" ).selectable({
//		stop: function() {
//			var result = $( "#select-result2" ).empty();
//			$( ".ui-selected", this ).each(function() {
//				var index = $( "#selectable2 li" ).index( this );
//				result.append( " #" + ( index + 1 ) );
//			});
//		}
//	});
//});
//$(function () {
// var availableTags=[];
//	
//	  $('#demo3').tagit({tagSource:availableTags, triggerKeys:['enter', 'comma', 'tab']});
//	  $('#demo31').tagit({tagSource:availableTags, triggerKeys:['enter', 'comma', 'tab']});
//	  
//});

//	 
//
//	
//
//	  function showTags(tags) {
//		console.log(tags);
//		var string = "Tags (label : value)\r\n";
//		string += "--------\r\n";
//		for (var i in tags)
//		  string += tags[i].label + " : " + tags[i].value + "\r\n";
//		alert(string);
//	  }
//
//	  $('.browser').hover(
//		function () {
//		  $(this).children('a').children('div').show('fast');
//		},
//		function () {
//		  $(this).children('a').children('div').hide('fast');
//		});
//
//	  setInterval("$('#fork').effect('pulsate', { times:1 }, 500);", 5000);
//
//
//	});
