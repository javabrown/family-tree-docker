

$( document ).ready(function() {
	
    $(".node-menu").bind('click', function (e) {
         
		 var id = $(this).parent().find('.node-menu').attr('id');
		 var name = $(this).parent().find('.node-name').html();
		 var desc = $(this).parent().find('.node-title').html();
		 
		 $("#cid").val(id);
		 $("#cname").val(name);
		 $("#cdescription").val(desc);
		 $("#myModal").modal();
		 
    });
	
	$("#add-new-child").bind('click', addNewChild);
		
});


function traverse(jsonObj, id, callback) {
    if( typeof jsonObj == "object" ) {
        $.each(jsonObj, function(k,v) {
            // k is either an array index or object key
			//alert(jsonObj.id);
			//if( k == "text" && jsonObj[k].id == id){
			if(jsonObj.id == id){	
			   return callback(jsonObj);
			}
			else{
               traverse(v, id, callback);
			}
        });
    }
    else {
       //console.log(jsonObj);
    }
}


function addNewChild(){

	var id =  $("#cid").val();
	var cname = $("#cname").val();
	var cdescription = $("#cdescription").val();
	
    traverse(chart_config.nodeStructure, id, function(node){
		    
			if(node){
	             var timestamp = new Date().getUTCMilliseconds();
                 //alert(timestamp + "  " + node)
                
                 node.children.push(
                                      {
                                          text:{
                  							id: timestamp,
                                             name: cname,
                                             title: cdescription
                                          },
                                          HTMLclass: 'light-gray',
                                          image: "images/icon-person1.png",
										  children: []
                                      }
                 );
                  
                 storeDataToLocalStore(chart_config);
				 //alert(id +",  " + cname + ",   "+cdescription + "   ==>"+ JSON.stringify(bla));
            }
	
	});
    	
	
}

function findObjectById(root, id) {
    if (root.children) {
        for (var k in root.children) {
            if (root.children[k].id == id) {
                return root.children[k];
            }
            else if (root.children.length) {
                return findObjectById(root.children[k], id);
            }
        }
    }
}


