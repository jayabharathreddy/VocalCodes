var toMap = {};
var fromMap = {};
var availableTags = new Array();
var availableFroms = new Array();

function loadCallList() {
	//alert(gcLoginUserId);
	var url = urlForServer+"CallList/getContacts/"+loginUserId+"/0";
	$.ajax({
		type : 'POST',
		url : url,
		success : function(responseText) {
		console.log("<-------data returned from url for new ajax request-------> "+ responseText);
		var data = jQuery.parseJSON(responseText);
		/**
		 * mapping the calllist name with contactgroup sid value
		 */
		for ( var i = 0; i < data.length; i++) 
		{
			var obj = data[i];
			toMap[obj.contactGroupDesc] = obj.contactGroupSID;
			for ( var key in obj) 
			{
				var attrName = key;
				var attrValue = obj[key];
				name = name + attrValue;
			}
			
			callListName = data[i].contactGroupDesc;
			var contactGroupSID = data[i].contactGroupSID;
			availableTags.push(callListName);

			$("#toul").append('<li><a href="#" >' + data[i].contactGroupDesc + '</a></li>');
		}
		$(function() {
			//$('.dropdown-menu li').text(name1);
			$("#toanch").attr('data-toggle', 'dropdown');
		});
		$(function() {
			$('#demo31').tagit( {
				tagSource : availableTags,
				triggerKeys : [ 'enter', 'comma', 'tab' ]
			});
		});
		},
		error : function() {
		console.log("<-------error returned for new ajax request tagit 1-------> ");
		}
	});
	
}

(function($) {

	var restfulApp = Backbone.Router
			.extend( {
				restfulUrl : urlForServer, // This
				
				routes : {
					
					"*ClientInfo" : "fromCall",
					"*CallList" : "toCall"
				},
				
				fromCall : function(ClientInfo) {
					if (ClientInfo) {						
						var restfulfrmPageUrl = this.restfulUrl + ClientInfo;// +
						this.loadRestfulData(restfulfrmPageUrl);
					}

				},
				toCall : function(CallList) {
					if (CallList) {
						
				var restfultoPageUrl = this.restfulUrl + CallList;// + 'page';
				this.loadRestfulData(restfultoPageUrl);
			}

		},
		loadRestfulData : function(pageUrl) {

			if (pageUrl.search("ClientInfo") != -1) {

				// Load the from data in using jQuerys ajax call
				var url = urlForServer+"ClientInfo/for/"+loginUserId;
				$.ajax({
					type : 'POST',
					url : url,
					success : function(responseText) {
					console.log("<-------Data returned for ClientInfo -------> "+ responseText);


					var data = jQuery.parseJSON(responseText);
					$("#fromanch").attr('data-toggle', 'dropdown');
					$("#fromul").empty();
					availableFroms = new Array();
					for ( var i = 0; i < data.length; i++) 
					{
						var obj = data[i];
						fromMap[obj.callerName] = obj._id;
						availableFroms.push(data[i].callerName);
						$("#fromul").append('<li><a href="#" >' + obj.callerName + '</a></li>');
					}

					$(function() {

						$('#fromulselect').tagit( {
							tagSource : availableFroms,
							triggerKeys : [ 'enter', 'comma', 'tab' ]
						});

					});

				},
					error : function() {
					console.log("<-------Error returned while fetching from info!!!!-------> ");
					}
				});

			} else if (pageUrl.search("CallList") != -1)
			// /tooo
			{
				loadCallList();
			} else if (pageUrl.search("Broadcast"))
			// /tooo
			{
				//createBroadCastGrup();

			}

		}
			});

	new restfulApp;
	// Initiate a new history and controller class
	Backbone.emulateHTTP = true;
	Backbone.emulateJSON = true;
	Backbone.history.start();
})(jQuery);
