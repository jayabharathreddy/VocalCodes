(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery','tmpl','load-image','./jquery.fileupload-fp'],factory)}else{factory(window.jQuery,window.tmpl,window.loadImage)}}(function($,tmpl,loadImage){'use strict';var parentWidget=($.blueimpFP||$.blueimp).fileupload;$.widget('blueimpUI.fileupload',parentWidget,{options:{autoUpload:false,maxNumberOfFiles:undefined,maxFileSize:undefined,minFileSize:undefined,acceptFileTypes:/.+$/i,previewSourceFileTypes:/^image\/(gif|jpeg|png)$/,previewSourceMaxFileSize:5000000,previewMaxWidth:80,previewMaxHeight:80,previewAsCanvas:true,uploadTemplateId:'template-upload',downloadTemplateId:'template-download',filesContainer:undefined,prependFiles:false,dataType:'json',add:function(e,data){var that=$(this).data('fileupload'),options=that.options,files=data.files;$(this).fileupload('process',data).done(function(){that._adjustMaxNumberOfFiles(-files.length);data.maxNumberOfFilesAdjusted=true;data.files.valid=data.isValidated=that._validate(files);data.context=that._renderUpload(files).data('data',data);options.filesContainer[options.prependFiles?'prepend':'append'](data.context);that._renderPreviews(files,data.context);that._forceReflow(data.context);that._transition(data.context).done(function(){if((that._trigger('added',e,data)!==false)&&(options.autoUpload||data.autoUpload)&&data.autoUpload!==false&&data.isValidated){data.submit()}})})},send:function(e,data){var that=$(this).data('fileupload');if(!data.isValidated){if(!data.maxNumberOfFilesAdjusted){that._adjustMaxNumberOfFiles(-data.files.length);data.maxNumberOfFilesAdjusted=true}if(!that._validate(data.files)){return false}}if(data.context&&data.dataType&&data.dataType.substr(0,6)==='iframe'){data.context.find('.progress').addClass(!$.support.transition&&'progress-animated').attr('aria-valuenow',100).find('.bar').css('width','100%')}return that._trigger('sent',e,data)},done:function(e,data){var that=$(this).data('fileupload'),template;if(data.context){data.context.each(function(index){var file=($.isArray(data.result)&&data.result[index])||{error:'emptyResult'};if(file.error){that._adjustMaxNumberOfFiles(1)}that._transition($(this)).done(function(){var node=$(this);template=that._renderDownload([file]).replaceAll(node);that._forceReflow(template);that._transition(template).done(function(){data.context=$(this);that._trigger('completed',e,data)})})})}else{if($.isArray(data.result)){$.each(data.result,function(index,file){if(data.maxNumberOfFilesAdjusted&&file.error){that._adjustMaxNumberOfFiles(1)}else if(!data.maxNumberOfFilesAdjusted&&!file.error){that._adjustMaxNumberOfFiles(-1)}});data.maxNumberOfFilesAdjusted=true}template=that._renderDownload(data.result).appendTo(that.options.filesContainer);that._forceReflow(template);that._transition(template).done(function(){data.context=$(this);that._trigger('completed',e,data)})}},fail:function(e,data){var that=$(this).data('fileupload'),template;if(data.maxNumberOfFilesAdjusted){that._adjustMaxNumberOfFiles(data.files.length)}if(data.context){data.context.each(function(index){if(data.errorThrown!=='abort'){var file=data.files[index];file.error=file.error||data.errorThrown||true;that._transition($(this)).done(function(){var node=$(this);template=that._renderDownload([file]).replaceAll(node);that._forceReflow(template);that._transition(template).done(function(){data.context=$(this);that._trigger('failed',e,data)})})}else{that._transition($(this)).done(function(){$(this).remove();that._trigger('failed',e,data)})}})}else if(data.errorThrown!=='abort'){data.context=that._renderUpload(data.files).appendTo(that.options.filesContainer).data('data',data);that._forceReflow(data.context);that._transition(data.context).done(function(){data.context=$(this);that._trigger('failed',e,data)})}else{that._trigger('failed',e,data)}},progress:function(e,data){if(data.context){var progress=parseInt(data.loaded/data.total*100,10);data.context.find('.progress').attr('aria-valuenow',progress).find('.bar').css('width',progress+'%')}},progressall:function(e,data){var $this=$(this),progress=parseInt(data.loaded/data.total*100,10),globalProgressNode=$this.find('.fileupload-progress'),extendedProgressNode=globalProgressNode.find('.progress-extended');if(extendedProgressNode.length){extendedProgressNode.html($this.data('fileupload')._renderExtendedProgress(data))}globalProgressNode.find('.progress').attr('aria-valuenow',progress).find('.bar').css('width',progress+'%')},start:function(e){var that=$(this).data('fileupload');that._transition($(this).find('.fileupload-progress')).done(function(){that._trigger('started',e)})},stop:function(e){var that=$(this).data('fileupload');that._transition($(this).find('.fileupload-progress')).done(function(){$(this).find('.progress').attr('aria-valuenow','0').find('.bar').css('width','0%');$(this).find('.progress-extended').html('&nbsp;');that._trigger('stopped',e)})},destroy:function(e,data){var that=$(this).data('fileupload');if(data.url){$.ajax(data);that._adjustMaxNumberOfFiles(1)}that._transition(data.context).done(function(){$(this).remove();that._trigger('destroyed',e,data)})}},_enableDragToDesktop:function(){var link=$(this),url=link.prop('href'),name=link.prop('download'),type='application/octet-stream';link.bind('dragstart',function(e){try{e.originalEvent.dataTransfer.setData('DownloadURL',[type,name,url].join(':'))}catch(err){}})},_adjustMaxNumberOfFiles:function(operand){if(typeof this.options.maxNumberOfFiles==='number'){this.options.maxNumberOfFiles+=operand;if(this.options.maxNumberOfFiles<1){this._disableFileInputButton()}else{this._enableFileInputButton()}}},_formatFileSize:function(bytes){if(typeof bytes!=='number'){return''}if(bytes>=1000000000){return(bytes/1000000000).toFixed(2)+' GB'}if(bytes>=1000000){return(bytes/1000000).toFixed(2)+' MB'}return(bytes/1000).toFixed(2)+' KB'},_formatBitrate:function(bits){if(typeof bits!=='number'){return''}if(bits>=1000000000){return(bits/1000000000).toFixed(2)+' Gbit/s'}if(bits>=1000000){return(bits/1000000).toFixed(2)+' Mbit/s'}if(bits>=1000){return(bits/1000).toFixed(2)+' kbit/s'}return bits+' bit/s'},_formatTime:function(seconds){var date=new Date(seconds*1000),days=parseInt(seconds/86400,10);days=days?days+'d ':'';return days+('0'+date.getUTCHours()).slice(-2)+':'+('0'+date.getUTCMinutes()).slice(-2)+':'+('0'+date.getUTCSeconds()).slice(-2)},_formatPercentage:function(floatValue){return(floatValue*100).toFixed(2)+' %'},_renderExtendedProgress:function(data){return this._formatBitrate(data.bitrate)+' | '+this._formatTime((data.total-data.loaded)*8/data.bitrate)+' | '+this._formatPercentage(data.loaded/data.total)+' | '+this._formatFileSize(data.loaded)+' / '+this._formatFileSize(data.total)},_hasError:function(file){if(file.error){return file.error}if(this.options.maxNumberOfFiles<0){return'maxNumberOfFiles'}if(!(this.options.acceptFileTypes.test(file.type)||this.options.acceptFileTypes.test(file.name))){return'acceptFileTypes'}if(this.options.maxFileSize&&file.size>this.options.maxFileSize){return'maxFileSize'}if(typeof file.size==='number'&&file.size<this.options.minFileSize){return'minFileSize'}return null},_validate:function(files){var that=this,valid=!!files.length;$.each(files,function(index,file){file.error=that._hasError(file);if(file.error){valid=false}});return valid},_renderTemplate:function(func,files){if(!func){return $()}var result=func({files:files,formatFileSize:this._formatFileSize,options:this.options});if(result instanceof $){return result}return $(this.options.templatesContainer).html(result).children()},_renderPreview:function(file,node){var that=this,options=this.options,dfd=$.Deferred();return((loadImage&&loadImage(file,function(img){node.append(img);that._forceReflow(node);that._transition(node).done(function(){dfd.resolveWith(node)});if(!$.contains(document.body,node[0])){dfd.resolveWith(node)}},{maxWidth:options.previewMaxWidth,maxHeight:options.previewMaxHeight,canvas:options.previewAsCanvas}))||dfd.resolveWith(node))&&dfd},_renderPreviews:function(files,nodes){var that=this,options=this.options;nodes.find('.preview span').each(function(index,element){var file=files[index];if(options.previewSourceFileTypes.test(file.type)&&($.type(options.previewSourceMaxFileSize)!=='number'||file.size<options.previewSourceMaxFileSize)){that._processingQueue=that._processingQueue.pipe(function(){var dfd=$.Deferred();that._renderPreview(file,$(element)).done(function(){dfd.resolveWith(that)});return dfd.promise()})}});return this._processingQueue},_renderUpload:function(files){return this._renderTemplate(this.options.uploadTemplate,files)},_renderDownload:function(files){return this._renderTemplate(this.options.downloadTemplate,files).find('a[download]').each(this._enableDragToDesktop).end()},_startHandler:function(e){e.preventDefault();var button=$(this),template=button.closest('.template-upload'),data=template.data('data');if(data&&data.submit&&!data.jqXHR&&data.submit()){button.prop('disabled',true)}},_cancelHandler:function(e){e.preventDefault();var template=$(this).closest('.template-upload'),data=template.data('data')||{};if(!data.jqXHR){data.errorThrown='abort';e.data.fileupload._trigger('fail',e,data)}else{data.jqXHR.abort()}},_deleteHandler:function(e){e.preventDefault();var button=$(this);e.data.fileupload._trigger('destroy',e,{context:button.closest('.template-download'),url:button.attr('data-url'),type:button.attr('data-type')||'DELETE',dataType:e.data.fileupload.options.dataType})},_forceReflow:function(node){return $.support.transition&&node.length&&node[0].offsetWidth},_transition:function(node){var dfd=$.Deferred();if($.support.transition&&node.hasClass('fade')){node.bind($.support.transition.end,function(e){if(e.target===node[0]){node.unbind($.support.transition.end);dfd.resolveWith(node)}}).toggleClass('in')}else{node.toggleClass('in');dfd.resolveWith(node)}return dfd},_initButtonBarEventHandlers:function(){var fileUploadButtonBar=this.element.find('.fileupload-buttonbar'),filesList=this.options.filesContainer,ns=this.options.namespace;fileUploadButtonBar.find('.start').bind('click.'+ns,function(e){e.preventDefault();filesList.find('.start button').click()});fileUploadButtonBar.find('.cancel').bind('click.'+ns,function(e){e.preventDefault();filesList.find('.cancel button').click()});fileUploadButtonBar.find('.delete').bind('click.'+ns,function(e){e.preventDefault();filesList.find('.delete input:checked').siblings('button').click();fileUploadButtonBar.find('.toggle').prop('checked',false)});fileUploadButtonBar.find('.toggle').bind('change.'+ns,function(e){filesList.find('.delete input').prop('checked',$(this).is(':checked'))})},_destroyButtonBarEventHandlers:function(){this.element.find('.fileupload-buttonbar button').unbind('click.'+this.options.namespace);this.element.find('.fileupload-buttonbar .toggle').unbind('change.'+this.options.namespace)},_initEventHandlers:function(){parentWidget.prototype._initEventHandlers.call(this);var eventData={fileupload:this};this.options.filesContainer.delegate('.start button','click.'+this.options.namespace,eventData,this._startHandler).delegate('.cancel button','click.'+this.options.namespace,eventData,this._cancelHandler).delegate('.delete button','click.'+this.options.namespace,eventData,this._deleteHandler);this._initButtonBarEventHandlers()},_destroyEventHandlers:function(){var options=this.options;this._destroyButtonBarEventHandlers();options.filesContainer.undelegate('.start button','click.'+options.namespace).undelegate('.cancel button','click.'+options.namespace).undelegate('.delete button','click.'+options.namespace);parentWidget.prototype._destroyEventHandlers.call(this)},_enableFileInputButton:function(){this.element.find('.fileinput-button input').prop('disabled',false).parent().removeClass('disabled')},_disableFileInputButton:function(){this.element.find('.fileinput-button input').prop('disabled',true).parent().addClass('disabled')},_initTemplates:function(){var options=this.options;options.templatesContainer=document.createElement(options.filesContainer.prop('nodeName'));if(tmpl){if(options.uploadTemplateId){options.uploadTemplate=tmpl(options.uploadTemplateId)}if(options.downloadTemplateId){options.downloadTemplate=tmpl(options.downloadTemplateId)}}},_initFilesContainer:function(){var options=this.options;if(options.filesContainer===undefined){options.filesContainer=this.element.find('.files')}else if(!(options.filesContainer instanceof $)){options.filesContainer=$(options.filesContainer)}},_stringToRegExp:function(str){var parts=str.split('/'),modifiers=parts.pop();parts.shift();return new RegExp(parts.join('/'),modifiers)},_initRegExpOptions:function(){var options=this.options;if($.type(options.acceptFileTypes)==='string'){options.acceptFileTypes=this._stringToRegExp(options.acceptFileTypes)}if($.type(options.previewSourceFileTypes)==='string'){options.previewSourceFileTypes=this._stringToRegExp(options.previewSourceFileTypes)}},_initSpecialOptions:function(){parentWidget.prototype._initSpecialOptions.call(this);this._initFilesContainer();this._initTemplates();this._initRegExpOptions()},_create:function(){parentWidget.prototype._create.call(this);this._refreshOptionsList.push('filesContainer','uploadTemplateId','downloadTemplateId');if(!$.blueimpFP){this._processingQueue=$.Deferred().resolveWith(this).promise();this.process=function(){return this._processingQueue}}},enable:function(){parentWidget.prototype.enable.call(this);this.element.find('input, button').prop('disabled',false);this._enableFileInputButton()},disable:function(){this.element.find('input, button').prop('disabled',true);this._disableFileInputButton();parentWidget.prototype.disable.call(this)}})}));