



function AL_renameWithLink(){

	/* VARIABLES */
	
	var nodes_to_treat = Array();
	
	var selected_nodes = selection.selectedNodes(0);
	
	var nodes_to_treat = Array();
	
	/* EXECUTION */
	
	 scene.beginUndoRedoAccum("AL_renameWithLink");
	
	treat_nodes(selected_nodes);
	
	 scene.endUndoRedoAccum();
	
	/* FUNCTIONS */
	
	function treat_nodes(nlist){
		
		for(var n = 0; n < nlist.length; n++){ 

			var currentNode = nlist[n];
			
			var namewithlink = generate_new_name(currentNode);
			
			rename_node(currentNode,namewithlink);
	
		}  
	
	}
	
	function rename_node(n,name){
		
		var increment = 0; 
		
		var test = name;
		
		while(node.rename(n, name)!==true){
			
			increment++;
			
			name=test+increment;
			
		};
	
	}
	
	function shorten_name(str,max,split){
		
		var short_name = "";
		
		if(max <= str.length){
			
			
			var cutin= Math.round(max/2);
			
			var cutout= Math.round(max/2);
			
			if(split == false){
				
				cutin = max;
				cutout = 0;
			}
			
			
			for(var i = 0 ; i < cutin; i++){
				
						short_name+=str[i];
						
					}
			
			for(var j = cutout ; j > 0; j--){
				
				short_name+=str[str.length-j];
				
			}
		}else{
			
			short_name = str;
		}
		
		return short_name; 
		
	}
	
	function generate_new_name(n){
		
		var new_name = "";
		
		var node_type = shorten_name(node.type(n),3,false);
		
		var input_nodes = get_input_nodes(n);
		
		var output_nodes = get_output_nodes(n);
		
		
		new_name = node_type;
		
		for(var i = 0 ; i < input_nodes.length ; i ++){
			
			var inp = node.getName(input_nodes[i]);
			new_name+="_"+shorten_name(inp,6,true)
			
		}
		
		MessageLog.trace("INPUT");
		MessageLog.trace(input_nodes);
		MessageLog.trace("OUTPUT");
		MessageLog.trace(output_nodes);
		
		//new_name = new_name.toUpperCase();
		MessageLog.trace(new_name);
		
		return new_name;
	}
	
	function get_input_nodes(n){
		
		var node_name_list = Array()
		
		var numInput = node.numberOfInputPorts(n);
		
		for(var i = 0; i<numInput; i++){
			
			node_name_list.push(node.srcNode(n, i));
			
			
		}
				
		return node_name_list; 
		
	}
	
	function name_without_path(n){
		
		
		
		var simplename = "";
		

		
		simplename = n.split("/")[n.length-1];
		
		MessageLog.trace(simplename);
		
		simplename = node.getName(n);
		
		return simplename;
		
	}
	
		
	function get_output_nodes(n){
		
		var node_name_list = Array()
		
		var numOutput = node.numberOfOutputPorts(n);
		
		for(var i = 0; i<numOutput; i++){
			
			
			var nblinks = node.numberOfOutputLinks(n,i);
			
			for(var l = 0; l<nblinks; l++){
			
				node_name_list.push(node.dstNode(n, i, l));
			
			}
			
		}
		
		return node_name_list;
		
	}
	
}

