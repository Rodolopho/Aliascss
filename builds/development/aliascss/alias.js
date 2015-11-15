
(function(){
	var AliasCSS={
	//Property Alias Object
	alias:{	 	
		"an":"animation",
		"adl":"animation-delay",
		"adu":"animation-duration",
		"aic":"animation-iteration-count",
		//"an":"animation-name",
		"atf":"animation-timimg-function",//atfcb0d1-0d7-1-0d1=animation-timimg-function:cubic-bezeir(0.1,0.7,1,0.1) for negative value use -- or _-1d5//
		"b"  :"border",
		"bb"  :"border-bottom",
		"bbc"  :"border-bottom-color",
		"bblr":"border-bottom-left-radius",
		"bbrr": "border-bottom-right-radius",
		"bbw"  :"border-bottom-width",
		"bc" :"border-color",
		"bg"  :"background",
		"bgc"  :"background-color",
		"bgi"  :"background-image",
		"bgp"  :"background-position",
		"bgs":"background-size",
		"bl"  :"border-left",
		"blc"  :"border-left-color",
		"brt"  :"border-right",
		"brc"  :"border-right-color",
		"br"  :"border-radius",
		"brw"  :"border-right-width",
		"bs"  :"border-spacing",
		"bt"  :"border-top",
		"btc"  :"border-top-color",
		"btlr":"border-top-left-radius",
		"btm"  :"bottom",
		"btrr": "border-top-right-radius",
		"btw"  :"border-top-width",
		"bw"  :"border-width",
		"bxs":"box-shadow",
		"c"  :"color",
		"cc":"column-count",
		"cg":"column-gap",
		"ci"  :"counter-increment",
		"cols":"columns",
		"con"  :"content",//string
		"cp"  :"clip",
		"cr"   :"counter-reset",
		"cr":"column-rule",
		"crc":"column-rule-color",
		"crw":"column-rule-width",
		//"c"  :"cursor",
		"cw":"column-width",
		"f"    :"font",
		"f":"flex",
		"fb":"flex-basis",
		"ff"  :"font-family",
		"fg":"flex-grow",
		"fs"  :"font-size",
		"fsk":"flex-shrink",
		"fsa":"font-size-adjust",
		"h":"height",
		"i":"icon",
		"io":"image-orientation",
		"ir":"image-resolution",
		"l"  :"left",
		"les"  :"letter-spacing",
		"lh"  :"line-height",
		"ls"  :"list-style",
		"lsi"  :"list-style-image",
		"m"  :"margin",
		"ma" :"margin",
		"mb"  :"margin-bottom",
		"mh"  :"min-height",
		"ml"  :"margin-left",
		"mo"  :"marker-offset",
		"mr"  :"margin-right",
		"mt"  :"margin-top",
		"mw"  :"min-width",
		"ord":"order",
		"ol"  :"outline",
		"olc"  :"outline-color",
		"olo":"outline-offset",
		"olw"  :"outline-width",
		"op":"object-position",
		"o":"opacity",
		"orp":"orphans",
		"p"  :"padding",
		"pb"  :"padding-bottom",
		"pers":"perspective",
		"perso":"perspective-origin",
		"pl"  :"padding-left",
		"pr"  :"padding-right",
		"pt"  :"padding-top",
		"q"    :"quotes",//string
		"r"  :"right",
		"t"  :"top",
		"t_": "transition",
		"tdl":"transition-delay",
		"tdu":"transition-duration",
		"tf":"transform",
		"tfo":"transform-origin",
		"ts":"tab-size",
		"ttf":"transition-timing-function",
		"ta":"text-align",//string
		"tdc":"text-decoration-color",
		"te":"text-emphasis",
		"tec":"text-emphasis-color",
		"ti" : "text-indent",
		"to":"text-overflow",//string
		"txs" :"text-shadow",
		"va":"vertical-align"	,
		"w" :"width",
		"ws":"word-spacing",
		"xh"  :"max-height",
		"xw"  :"max-width",
		"zi":"z-index",
		
	},
	//get all element
	allElements:document.getElementsByTagName('*'),
	
	//Class collector for reference and checking for repetion
	 classListAll:[],
	//filter class to be listed
	//following match will be allow add your match if you want custom class also you can define custom function for handling custom class in factory function in makeAndCall object_
	 filterClass:/(aic|adu|tdu|bgp|bgs|bw|blw|brw|btw|btw|bbw|br|bblrs|btrrs|bblrs|btlrs|btm|bs|cw|cg|crw|fb|fs|h|l|lh|les|m|ma|mt|mr|mb|ml|xw|xh|mw|mh|mo|op|olw|olo|p|pa|pt|pr|pb|pl|pers|perso|r|t|tfo|ts|ti|va|w|ws|cc|fg|fs|o|ord|lh|orp|op|zib|brt|bl|bt|bb|ol|cr)[-]?[0-9]|c_|url[-_]|ff_|f_|(h|a|l|fo)[-_]|bg[i]?(lg|rg)|tf|t_|an_/,
	//reptiton count
	repCount:0,
	//this checks the our custom style tag where we print the class is already exists for future reference
	tagStyleExists:false,
	//create DOM style tag to hold the class printed
	styleTag:function(){ 
		if(this.tagStyleExists==true){ return document.getElementById("styleAlias");}
	var styleTag=document.createElement("style");
	styleTag.id="styleAlias";
	document.getElementsByTagName("head")[0].appendChild(styleTag);
	this.tagStyleExists=true;
	return styleTag;
	},
	//you can always apend a class if you like
	appendToStyleTag:function(classStatement){
				var createNewClass=document.createTextNode(classStatement);
				this.styleTag().appendChild(createNewClass);
	},
	//check the state and return psedo or "" used with serverside compiler
	stateChecker:function(className){
		var stateObj={h:"hover",fo:"focus",l:"link",a:"active",v:"visited"};
		if(className!=false && className.match(/^(h|a|fo|l)[-_]/)){
			return [className.match(/^(h|a|fo|l)[-_]/)[0],":"+stateObj[className.match(/^(h|a|l|fo)[-_]/)[1]]];
		}else{
			return ['',''];
		}

	} ,
//////--------------[helper functions]-------------------------------------rowser
	// Cross-browser-support
	prefix:["-moz-","-webkit-","-o-","-ms-"],
	//used for rendering animation-timimg-fucntion and transition-timing function
	animation_transition_tf:function(each){
			var func="";
			var N="";
			 var funcAlias={e:"ease",l:"linear",ei:"ease-in",eo:"ease-out",eio:"ease-in-out",ss:"step-start",se:"step-end"};
			 if(each.match(/cb[-]?[0-9]/)){
			 	if(each.match(/cb[-]/)){N="-"};
			 	var getN=each.match(/cb[-]?([0-9]+[d]?[0-9]*[-|_][-|_]?[0-9]+[d]?[0-9]*[-|_][-|_]?[0-9]+[d]?[0-9]*[-|_][-|_]?[0-9]+[d]?[0-9]*)/)[1];
			 		var value=getN.replace(/[-|_]([-]?)/g,",$1");
			 	value=value.replace(/d/g,".");
			 	func="cubic-bezeir("+N+value+")";
			 }else{
			 
			 if(each.match(/[0-9]?[s|ms]?(e|l|ei|eo|eio|ss|se|s[0-9]+[s|e])/)){
			 	if(each.match(/s[0-9]+[s|e]/)){
			 		var se="";
			 		var eors=each.match(/s([0-9]+)([s|e])/);
			 			if(eors[2].match("s")){se="start";}else{se="end";}
			 		
			 		func="steps("+eors[1]+" ,"+ se+")";
			 	}else{
			 	func=each.match(/^(l|eo|eio|ss|se|ei|e)/)[1];
			 	func=funcAlias[func];
		    	}	
		   	 }
			};
			return func;
	},//eof
	customAddEventListner:function(element,eventName,functionName){
		if(element.addEventListener){
			//hurry your broweser support it
			element.addEventListener(eventName,functionName,false);
			return true;
		}else{
			//older ie broweser
			element.attachEvent("on"+eventName,functionName);
			return true;
		}
		
	},
	//Note:this doenot require in serverside ie nodes.js/php and other can compile
	toggleClass:function(element,stripclassName,apply,release){
		var attriClass=element.getAttribute("class");
		function applyfunc(){element.setAttribute("class",attriClass+" "+stripclassName);}
		function releasefunc(){element.setAttribute("class",attriClass);}
		this.customAddEventListner(element,apply,applyfunc);
		this.customAddEventListner(element,release,releasefunc);
	},
	
//-----------------Function Factory-----------------------------------------------------------------------------	
///////////////////-----------url-------------/
	urlProcessor:function(each){
		if(each.match(/[u][r][l][_][A-Za-z0-9|_]+/)){var each=each.match(/[u][r][l][_][A-Za-z0-9|_]+/)[0];}else{return false;}
			var dire="";
				//var each=each.replace()
			    if(each.match(/url[_][1-9][_]/)){
			    var updir=each.match(/url[_]([1-9])_/)[1];
			    each=each.replace(/[_][1-9]([_])/,"$1");
			    for(i=1;i<=updir;i++){
			        dire=dire.concat("../");
			       }
			    }
			var clearExe=each.replace(/(_)([A-Za-z0-9]+$)/,".$2)");
			var clearUrl=clearExe.replace(/_/,"("+dire);
			var finalValue=clearUrl.replace(/_/g,"/");
			return finalValue; 
			//note restriction not use folder with name that uses ../../also need to figure out for 
		},
///////////////////-----------color-------------/
	colorProcessor:function(each){
		if(!each.match(/[c][_][0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{0,2}|[c][_][h][A-Ga-g0-9]{3,6}|[c][_][n][A-Za-z]+/)){return false;}
			var each=each.replace(/^[\w|-]*c_/,"");
			if(each.match(/-|_/)){each=each.split(/-|_/)[0];};
			if(each.match(/^[n]/)){return each.replace(/[n]([A-Za-z]+)[0-9]*[\w]*/,"$1");}
			else if(each.match(/^[h]/)){return each.replace(/[h]([A-Ga-g0-9]{3,6})[\w]*/,"#$1");}
			else if(each.match(/[0-9][p]/g)&& each.match(/[0-9][p]/g).length==3){//this rgb in %
					if(each.match(/p$/)){
						 var value="rgb(" + each.replace(/p/g,"%, ") + ")";
						 value=value.replace(/[,][\s]*[)]/,")");
						return value;
					}else if(each.match(/p([0-9]{2})$/)){
						 alpha=each.match(/p([0-9]{2})$/)[1];
						 each=each.replace(/[0-9]{2}$/,"");
						if(alpha<11){ alpha=alpha/10;}else{alpha=alpha/100;}
						return "rgba(" + each.replace(/p/g,"%, ") + alpha + ")";
						
					}
		  }
			else if(each.match(/[0-9][p]/g) && each.match(/[0-9][p]/g).length==2){//this is hsl
				var h=each.match(/[0-9]{3}/)[0];
				each=each.replace(/[0-9]{3}/,"");
				if(each.match(/p$/)){
					
						var value= "hsl(" +h+ ", "+ each.replace(/p/g,"%, ") + ")";
						value=value.replace(/[,][\s]*[)]/,")");
						return value;
					}else if(each.match(/p([0-9]{2})$/)){
						var alpha=each.match(/p([0-9]{2})$/)[1];
						each=each.replace(/[0-9]{2}$/,"");
						if(alpha<11){ alpha=alpha/10;}else{alpha=alpha/100;}
						return "hsla(" +h +", "+  each.replace(/p/g,"%, " ) + alpha + ")";
						
					}
					
				}
			else if(each.match(/[0-9]{9,11}/)){//this is rgb in number
				
				if(each.length==9){//noalpha
					return "rgb(" + each.replace(/([0-9]{3})([0-9]{3})([0-9]{3})/," $1, $2, $3 ") + ")";
					}else if(each.length==11){//yes alpha
						var alpha=each.match(/[0-9]{2}$/)[0];
							each=each.replace(/[0-9]{2}$/,"");
						if(alpha<11){ alpha=alpha/10;}else{alpha=alpha/100;}
						return "rgba(" + each.replace(/([0-9]{3})([0-9]{3})([0-9]{3})/," $1, $2, $3, ") + alpha +")";
					}
				}
			 
		},
///////////////////-----------Lenght-------------/
		lengthProcessor:function(each){//the ‘cm’, ‘mm’, ‘in’, ‘pt’, ‘pc’ units
			 //filter other unit conflit
			 	if(each.match(/[c][_][0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{0,2}/)){
			 		var each=each.replace(/[c][_][0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{0,2}/,"");
			 	}
			 
				
			var matchlengthonly=/[-]?[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|vh|vmin|vmaxc|m|mm|in|pt|pc)/g;
			var lengthArray=each.match(matchlengthonly);
			if(!lengthArray){return false;}
			var lengthString=lengthArray.toString();
			var lengthescapepercentage=lengthString.replace(/p(,)|p$/g,"%$1");
			var lengthescapedecimal=lengthescapepercentage.replace(/d/g,".");
			return lengthescapedecimal.replace(/[,]/g," ");
			
		},
///////////////////-----------font-------------/
		fontProcessor:function(each){
			//‘serif’, ‘sans-serif’, ‘cursive’, ‘fantasy’, and ‘monospace’
			if(!each.match(/^ff_|f_/)){return false;}
			if(each.match(/-/)){each=each.split(/-/)[0];}
			var each=each.replace(/ff_|f_/,"");
			var genericFontAlias={s:"serif", ss:"sans-serif", c:"cursive", f:"fantasy", m: "monospace"};
			if(each.match(/[_]?(s|ss|c|f|m)$/)){
				var matchGF=each.match(/[_]?(ss|s|c|f|m)$/)[1];
				var each=each.replace(/([_])(ss|s|c|f|m)$/,"$1" + genericFontAlias[matchGF]);
			
			}
			//ff var fontInArray=""
			return each.replace(/[_]/g,", ");
			
		},
///////////////////-----------[angletime frequen]-------------/		
		angleTimeFrequencyResolutionProcessor:function(each){
			///deg| grad| rad| turn dpi| dpcm| dppxHz| kHz|s|ms/;
			var matchitonly=/[-]?[0-9]+[d]?[0-9]*(deg|grad|rad|turn|dpi|dpcm|dppx|Hz|hz|kHz|khz|s|ms)/g;
			var lengthArray=each.match(matchitonly);
			if(!lengthArray){return false;}
			var lengthString=lengthArray.toString();
			
			var valueescapedecimal=lengthString.replace(/([0-9])[d]([0-9])/g,"$1.$2");
			return valueescapedecimal.replace(/[,]/g," ");
		},
///////////////////-----------[gradient]-------------/
		gradientProcessor:function(each){
			var angleAlias={l:"left",r:"right",t:"top",b:"bottom",c:"center"};
			var m=/[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|vh|vmin|vmax)|[c][_][0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{0,2}|[c][_][h][a-g0-9]{3,6}|[c][_][n][A-Za-z]+/g;
			var marray=each.match(m);
			var filterValue=[];
			marray.forEach(function(each){
				if(AliasCSS.colorProcessor(each)){filterValue.push(","+AliasCSS.colorProcessor(each));}else if(AliasCSS.lengthProcessor(each)){filterValue.push(AliasCSS.lengthProcessor(each));}
			});
			var stringValue=filterValue.join(" "); 
			var colorNposition=stringValue.replace(/([\s][\w]+[%|#]*[\s])/g,"$1,").replace(/[,][\s]*[,]/,",");
			var angle="top";
			var gradient=null;
			if(each.match(/lg/)){gradient="linear-gradient";}else{gradient="radial-gradient" ;}
			if(each.match(/[l|r][g]([t|r|l|b|c])/)){
				var alias=each.match(/[l|r][g]([t|r|l|b|c])/)[1];
				angle=angleAlias[alias];
			}else{if(this.angleTimeFrequencyResolutionProcessor(each)){angle=this.angleTimeFrequencyResolutionProcessor(each);}}
			
			var gradientValue=gradient+"("+angle  + colorNposition+")";
			return gradientValue;
		},
///////////////////-----------[angle]-------------/		
		angleProcessor:function(){},
///////////////////-----------[Animation]-------------/		
		animationProcessor:function(each){
			if(each.match(/^atf/)){
			 return this.animation_transition_tf(each.replace(/atf/,''));	
			}
			var name="",du="",dl="",direction="",playstate="",aic="",fillmode="",atf="";
			var matchName=/^an_([A-Za-z0-9]+)[-|_]?/;
			name=each.match(matchName)[1];
			each=each.replace("an_"+name,"");
			var evaluateObj={fillmode:{bw:"backwards",bo:"both",fw:"forwards"},
							  direction:{ar:"alternative-reverse",nl:"normal",re:"reverse",al:"alternative"}
								};
			if(each.match(/[-|_](bw|bo|fw)/)){fillmode=evaluateObj.fillmode[each.match(/[-|_](bw|bo|fw)/)[1]];}
			if(each.match(/[-|_](ar|nl|re|al)/)){ direction=evaluateObj.direction[each.match(/[-|_](ar|nl|re|al)/)[1]];}
			//if(each.match(/[-|_](cb[0-9]+[d]?[0-9][-]?+))					
			//var atf=this.animation_transition_tf(each);
			
			var time=(this.angleTimeFrequencyResolutionProcessor(each))?this.angleTimeFrequencyResolutionProcessor(each).replace(/-/g,"").trim().split(" "):"";
			if(time[0]){du=time[0];}
			if(time[1]){dl=time[1];}
			if(each.match(/[-|_][r|p]$/)){playstate=(each.match(/r$/))?"running":"paused";
			}
			if(each.match(/c[0-9|i]+/)){aic=(each.match(/c([0-9]+)/))?each.match(/c([0-9]+)/)[1]:"infinite";}
			
			return name+" "+du+" "+atf+" "+dl+" "+aic+" "+direction+" "+fillmode+" "+playstate; 
		},
///////////////////-----------[Transform]-------------/		
		transformProcessor:function(each){
			var each=each.replace("tf","");
			var tfAlias={
				 m: "matrix",t: "translate" ,tx: "translateX",ty: "translateY",s: "scale" ,sx: "scaleX",
				 sy: "scaleY",r: "rotate",skx: "skewX",sky: "skewY",m3d: "matrix3d",t3d: "translate3d",
				 tz: "translateZ",s3d: "scale3d",sz: "scaleZ",r3d: "rotate3d",rx: "rotateX",ry: "rotateY",
				 rz: "rotateZ",p: "perspective",};
			var tfFunc="";	
			var value=""; 
			(function(){
			var mLen=each.match(/^(tx|ty|tz|t3d|t|p)[0-9]/);
			if(mLen){tfFunc=tfAlias[mLen[1]];value=AliasCSS.lengthProcessor(each).replace(/[ ]/g,","); return true;}
			
			var mNum=each.match(/^(m3d|m|sx|sy|sz|s3d|s|r3d)[0-9]/);	
			if(mNum){
				tfFunc=tfAlias[mNum[1]];
				eeach=each.replace(/m3d|s3d|r3d/,"");
				if(eeach.match(/_/)){eeach=each.replace(/[_]/g,"px"); }
				eeach=eeach.concat("px");
				if(AliasCSS.lengthProcessor(eeach)){value=AliasCSS.lengthProcessor(eeach).replace(/px/g,",");}
				var a ="";
				if(each.match(/r3d/) && AliasCSS.angleTimeFrequencyResolutionProcessor(eeach)){a=","+AliasCSS.angleTimeFrequencyResolutionProcessor(eeach);};
				value=value.replace(/[,]$/,"")+a;  
			 return true;
	        }
	        var mAng=each.match(/^(rx|ry|rz|r|sky|skx)[0-9]/);
			if(mAng){tfFunc=tfAlias[mAng[1]];value=AliasCSS.angleTimeFrequencyResolutionProcessor(each); return true;}
			})();	 
			var tfValue=tfFunc+"("+value+")";
			return tfValue;
		},
///////////////////-----------[Transition]-------------/
		transitionProcessor:function(each){
			if(each.match(/^ttf/)){
			 return this.animation_transition_tf(each.replace(/ttf/,''));	
			}
			
			var func=""//this.animation_transition_tf(each);
			//var staticPropertyAlias={};
			if(each.match(/t_all/)){var property="all";}else{
				var getPropertyAlias=each.match(/t_([a-z]+)[0-9]+/)[1];
				var property=this.alias[getPropertyAlias];
			}

			var time=this.angleTimeFrequencyResolutionProcessor(each.match(/[t][_][A-Za-z0-9]+[-|_]?/)[0]);
			var forfunc=each.replace(/[t][_][A-Za-z0-9]+[-|_]?/,"");
			if(forfunc){
				func=this.animation_transition_tf(forfunc);
			}
			
			var value=property+ " " + time + " " + func; 
			return value;
			
		},
//--------------------------------------Controller------------------------------------------		
/*
*Contollers match the class and envoke corresponding function which call 
*the corresponding function and property alias and each set returns the array of property and value
*/
	matchAndCall:{
	length:{
		match:/^(bgp|bgs|bw|blw|brw|btw|btw|bbw|br|bblrs|btrrs|bblrs|btlrs|btm|bs|cw|cg|crw|fb|fs|h|l|lh|les|m|ma|mt|mr|mb|ml|xw|xh|mw|mh|mo|op|olw|olo|p|pa|pt|pr|pb|pl|pers|perso|r|t|tfo|ts|ti|va|w|ws)[-]?[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|vh|vmin|vmaxc|m|mm|in|pt|pc)/,
		  callFunction:function(each){//console.log("i am a length");
		  	var propertyAlias=each.match(this.match)[1],
				getProperty=AliasCSS.alias[propertyAlias],
				getValue=AliasCSS.lengthProcessor(each);
				//fix margin auto; 
				if(each.match(/m(a)?[-]?[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|vh|vmin|vmaxc|m|mm|in|pt|pc)(a)?/)){
					if(each.match(/m(a)?[-]?[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|vh|vmin|vmaxc|m|mm|in|pt|pc)(a)?/)[1]){
						getValue="auto "+getValue;
					}else if(each.match(/m(a)?[-]?[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|vh|vmin|vmaxc|m|mm|in|pt|pc)(a)?/)[3]){
						getValue=getValue + " auto";
					}
				}
			
			return [getProperty,getValue];
		}
	},
	color:{
		match:/^(c|crc|tec|brc|blc|btc|bbc|bc|olc)[_]([0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{1,3}[p]?[0-9]{0,2}|[h][A-Ga-g0-9]{3,6}|[n][A-Za-z]+)/,
		  callFunction:function(each){//console.log("i am a color");
			var propertyAlias=each.match(this.match)[1],
				getProperty=AliasCSS.alias[propertyAlias],
				getValue=AliasCSS.colorProcessor(each);

			return [getProperty,getValue];

			}
		},
	url:{match:/^(bgi|i|lsi|c)[u][r][l][_][A-Za-z0-9|_]+/, 
		  callFunction:function(each){//console.log("i am a length");
		  if(each.match(/curl/)){
					var getProperty="cursor";
				}else{
				var propertyAlias=each.match(this.match)[1];
				 var getProperty=AliasCSS.alias[propertyAlias];
				}
				var getValue=AliasCSS.urlProcessor(each);
		  	return [getProperty,getValue];
		  }
		},
	angleTimeFrequencyResolution:{match:/^(adu|adl|tdl|tdu)[-]?[\w]+(deg| grad| rad| turn dpi| dpcm| dppxHz| kHz|s|ms)/,
		  callFunction:function(each){//console.log("i am a angletime frequency");
		  	var propertyAlias=each.match(this.match)[1],
				getProperty=AliasCSS.alias[propertyAlias],
				getValue=AliasCSS.angleTimeFrequencyResolutionProcessor(each);
			return [getProperty,getValue];
		  }
		},
	borderLike:{match:/^(b|brt|bl|bt|bb|ol|cr)[-]?[0-9][\w]+[-]?(s|n|r|o|i|h|g|db|dt|ds)/,
		  callFunction:function(each){//console.log("i am a border");
		  	var styleAlias={n:"none", s:"solid", r:"ridge", o :"outset", i :"inset", h :"hidden", g : "groove", db:"double", dt:"dotted", ds : "dashed",};
			var propertyAlias=each.match(this.match)[1];
		    var getProperty=AliasCSS.alias[propertyAlias];
		    var style="", length="", color="";
		    if(each.match(/ct|c_t/)){color="transparent";}
		    else if(AliasCSS.colorProcessor(each)){color=AliasCSS.colorProcessor(each);}
		    if(AliasCSS.lengthProcessor(each)){length=AliasCSS.lengthProcessor(each);};
		    if(each.match(/[_|-](s|n|r|o|i|h|g|db|dt|ds)/)){
		    	var s=each.match(/[_|-](s|n|r|o|i|h|g|db|dt|ds)/)[1];
		    	style=styleAlias[s];
		    }
		    //getMulipleValue=[];
		    getValue=style+" "+length+" "+color;
			return [getProperty,getValue];
		  }
		},
	numberonly:{match:/^(aic|cc|fg|fs|o|ord|lh|orp|op|zi)([-]?[0-9]+[d]?[0-9]*)$/,
		  callFunction:function(each){//console.log("i am a number only");
		  var propertyAlias=each.match(this.match)[1],
				getProperty=AliasCSS.alias[propertyAlias],
				getValue=each.match(this.match)[2];
				getValue=getValue.replace(/d/,".");
				//fix opacity
				if(each.match(/^o[0-9]/) && !getValue.match(/[\.]/)){
					if(getValue<11){ getValue=getValue/10;}else{getValue=getValue/100;}
				}
			return [getProperty,getValue];
		  }
		},
	font:{match:/^(ff|f)[_]/,
		  callFunction:function(each){//console.log("i am a font");
		  var propertyAlias=each.match(this.match)[1];
				getProperty=AliasCSS.alias[propertyAlias],
				getValue=AliasCSS.fontProcessor(each);
			return [getProperty,getValue];
		  }
		},
	stringonly:{match:/^s_/,
		  callFunction:function(each){//console.log("i am a string");
			return ["string","Value"];
		  }
		},
	flex:{match:/^[f][0-9]/,//value type:flex: 2 2 10%;flex: 10em;flex: 2 2;flex: 2;
		  callFunction:function(each){//console.log("i am a flex");
		  	getProperty="flex";
			if(!each.match(/-|_/) && !AliasCSS.lengthProcessor(each)){getValue=each.replace("f","");
			}else if(!each.match(/-|_/) && AliasCSS.lengthProcessor(each)){getValue=AliasCSS.lengthProcessor(each);
					}else{
						getValue=(each.replace("f","")).replace(/[_|-]/g," ");
						if(getValue.match(/[0-9]+[d][0-9]+/)){getValue=getValue.replace("d",".");}
					}
			return [getProperty,getValue];
		  }
		},
	gradient:{match:/^bg[i]?(lg|rg)?/,
		  callFunction:function(each){//console.log("i am a Gradient");
		  //var propertyAlias=each.match(/bg|bgi/)[0];
				if(each.match(/(bg|bgi)[l|r][g]/)){
					//its a  gradient;
					var getValue=AliasCSS.gradientProcessor(each);
					
				}else{
					//its just basic bg
					var color="";if(each.match(/ct|c_t/)){color="transparent";}else if(AliasCSS.colorProcessor(each)){color=AliasCSS.colorProcessor(each);}
					var url="";if(AliasCSS.urlProcessor(each)){url=AliasCSS.urlProcessor(each);};
					var position="";if(AliasCSS.lengthProcessor(each)){position=AliasCSS.lengthProcessor(each);}
					var repo={r:"repeat",rx:"repeat-x", ry:"repeat-y",nr:"no-repeat",cc:"center center",rb:"right bottom",lt:"left top"};
					var repeat="";if(each.match(/[-|_](rx|ry|r|nr)/)){repeatkey=each.match(/[-|_](rx|ry|r|nr)/)[1];repeat=repo[repeatkey];};
					getValue=color+" "+url+" "+position+" "+repeat;
				}
				getProperty="background";
			return [getProperty,getValue];
		  }
		},
	boxShadow:{match:/(bxs|txs)/,
		  callFunction:function(each){//console.log("i am a box");
		  	var propertyAlias=each.match(this.match)[1];
				getProperty=AliasCSS.alias[propertyAlias];
				if(each.match(/(bxs|txs)[i]/)){ var i="inset";}else{var i="";}
				var split=each.split(/c_/);
				var length=AliasCSS.lengthProcessor(split[0]);
				var color="c_"+split[1];
				color=AliasCSS.colorProcessor(color);
				getValue=i+" "+length+" "+color;
			return [getProperty,getValue];
		  }
		},
	transform:{match:/^tf/,
		  callFunction:function(each){//console.log("i am a Transform");
		  	var propertyAlias=each.match(/^(tf[o]?)/)[1];
				getProperty=AliasCSS.alias[propertyAlias];
				getValue=AliasCSS.transformProcessor(each);
			return [getProperty,getValue];
		  }
		},
	transition:{match:/t_[a-z]|ttf+/,
		  callFunction:function(each){//console.log("i am Transition");
		  if(each.match(/ttf/)){
		  	var getProperty="transition-timing-function";
		  }else{
		  	var getProperty="transition";
		  }
			var getValue=AliasCSS.transitionProcessor(each);
			return [getProperty,getValue];
		  }
		},
	animation:{match:/atf[\w|-]{3}|an[-|_]/,
		callFunction:function(each){//console.log("i am a Animation");
			if(each.match(/atf/)){
				var getProperty="animation-timimg-function"
			}else{
				var getProperty="animation";
			}
			
				var getValue=AliasCSS.animationProcessor(each);

					return [getProperty,getValue];
			}
		}
	},
	main:function(element){
		//checking of class existance
		if(element.hasAttribute("class")){
			//get class and trim out whitespaces
			var tmpClassList=element.getAttribute("class").trim();
			//make array of classname out of string
			if(tmpClassList.length){
				tmpClassList=tmpClassList.split(/\s+/);
			}else{
				//console.log("Empty ClassNNN");
				return false;
			}
			//loop each class for evaluation
			tmpClassList.forEach(function(eachClass){
				//escape reppeated classname
				if(AliasCSS.classListAll.indexOf(eachClass)==-1 && eachClass.match(AliasCSS.filterClass)){
					//add to classlist for refrerence
					AliasCSS.classListAll.push(eachClass);
					//console.log(eachClass);
					var stateModifier=["",""];
					if(eachClass.match(/^(h|a|l|fo)[-_]/)){
						var stripedClass=eachClass.replace(/^(h|a|l|fo)[-_]/,"");
						if(stripedClass.match(AliasCSS.filterClass)){
							 stateModifier=AliasCSS.stateChecker(eachClass);
							 eachClass=stripedClass;
						}else{
							//depriciated from 1.1 version
							//eachClass=AliasCSS.handleState(eachClass,element);
						}

					}
//-----------------------------------------------------------------------------------------------------------------					
					for (key in AliasCSS.matchAndCall){
						if(eachClass.match(AliasCSS.matchAndCall[key].match)){
							var result=AliasCSS.matchAndCall[key].callFunction(eachClass);	
							if(eachClass.match(/^tf|t_/)){//check if its need prefix for property
								var statementConcat="."+stateModifier[0]+eachClass+stateModifier[1]+"{";
								AliasCSS.prefix.forEach(function(prefix){
									statementConcat+=prefix+result[0]+":"+result[1]+";";

								});
								statementConcat+=result[0]+":"+result[1]+";}";
								AliasCSS.appendToStyleTag(statementConcat);
								//value based prfirex
							}else if(eachClass.match(/^bg[i]?[l|r]g/)){
								var statementConcat="."+stateModifier[0]+eachClass+stateModifier[1]+"{";
								AliasCSS.prefix.forEach(function(prefix){
									statementConcat+=result[0]+":"+prefix+result[1]+";";

								});
								statementConcat+=result[0]+":"+result[1]+";}";
								AliasCSS.appendToStyleTag(statementConcat);

							}else{
		
								AliasCSS.appendToStyleTag("."+stateModifier[0]+eachClass+stateModifier[1]+"{"+result[0]+":"+result[1]+";}");
							}
							break;
						}
					}

//------------------------------------------------------------------------------------------------------------------
				}else{
					//not necessary reporting reption of class helpful for development
					++this.repCount;

				}

			});
		
		}
	},

}; 
//--------------------------------clone----------------------------------------
//if you just cloning and doning nothing better to attach this function is after load event handeling

AliasCSS.cssClone=function(element){
	if(element.getAttribute("cloneElement")){
		var id=element.getAttribute("cloneElement").replace("#","");
		getClassElement=document.getElementById(id);
		element.className=getClassElement.className+" "+element.className;

	}
	if(element.getAttribute("cloneChild") ||element.getAttribute("cloneChildOdd")||element.getAttribute("cloneChildEven")){
		var odd="",even="", all="";
		function getClassName(attri){
			var  getClassElement=document.getElementById(attri.replace("#",""));
			if(getClassElement){
			 return getClassElement.className;
			}else{
				return "";
			}
		}
		if(element.getAttribute("cloneChild")){
			all=getClassName(element.getAttribute("cloneChild"));
		}
		if(element.getAttribute("cloneChildOdd")){
			odd=getClassName(element.getAttribute("cloneChildOdd"));
		}	
		if(element.getAttribute("cloneChildEven")){
			even=getClassName(element.getAttribute("cloneChildEven"));
		}	

		Array.prototype.forEach.call(element.children,function(each,i){	
			//if(each.className.match(getClassElement.className)){return true;}
			if((i+1)%2){

				oddeven=odd.replace(each.className,"");
			}else{
				oddeven=even.replace(each.className,"");
			}	
			escape_all=all.replace(each.className,"");
			each.className=oddeven+" "+escape_all+" "+each.className;
			});
		}
};
//class this on event atteacher to workget done;
AliasCSS.render=function(element){
		AliasCSS.cssClone(element);
			AliasCSS.main(element);
};
this.AliasCSS=this.$AC=AliasCSS;                                          
//----------------------End Of Function Factory-------------------------------------------------------------------
//window.onload=function(){
	//foreach Element
	Array.prototype.forEach.call(AliasCSS.allElements,function(element){
			//AliasCSS.cssClone(element);
			//AliasCSS.main(element);
			AliasCSS.render(element);
		});
//};//window.onload.end

}())
