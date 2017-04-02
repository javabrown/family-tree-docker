			/*var config = {
					container: "#custom-colored",

					nodeAlign: "BOTTOM",
					
					connectors: {
						type: 'step'
					},
					node: {
						HTMLclass: 'nodeExample1'
					}
				},
				ceo = {
					text: {
						name: "Mark Hill",
						title: "Chief executive officer",
						contact: "Tel: 01 213 123 134",
					},
					image: "images/icon-person1.png"
				},

				cto = {
					parent: ceo,
					HTMLclass: 'light-gray',
					text:{
						name: "Joe Linux",
						title: "Chief Technology Officer",
					},
					image: "images/icon-person1.png"
				},
				cbo = {
					parent: ceo,
					childrenDropLevel: 2,
					HTMLclass: 'blue',
					text:{
						name: "Linda May",
						title: "Chief Business Officer",
					},
					image: "../headshots/5.jpg"
				},
				cdo = {
					parent: ceo,
					HTMLclass: 'gray',
					text:{
						name: "John Green",
						title: "Chief accounting officer",
						contact: "Tel: 01 213 123 134",
					},
					image: "../headshots/6.jpg"
				},
				cio = {
					parent: cto,
					HTMLclass: 'light-gray',
					text:{
						name: "Ron Blomquist",
						title: "Chief Information Security Officer"
					},
					image: "../headshots/8.jpg"
				},
				ciso = {
					parent: cto,
					HTMLclass: 'light-gray',
					text:{
						name: "Michael Rubin",
						title: "Chief Innovation Officer",
						contact: "we@aregreat.com"
					},
					image: "../headshots/9.jpg"
				},
				cio2 = {
					parent: cdo,
					HTMLclass: 'gray',
					text:{
						name: "Erica Reel",
						title: "Chief Customer Officer"
					},
					link: {
						href: "http://www.google.com"
					},
					image: "../headshots/10.jpg"
				},
				ciso2 = {
					parent: cbo,
					HTMLclass: 'blue',
					text:{
						name: "Alice Lopez",
						title: "Chief Communications Officer"
					},
					image: "../headshots/7.jpg"
				},
				ciso3 = {
					parent: cbo,
					HTMLclass: 'blue',
					text:{
						name: "Mary Johnson",
						title: "Chief Brand Officer"
					},
					image: "../headshots/4.jpg"
				},
				ciso4 = {
					parent: cbo,
					HTMLclass: 'blue',
					text:{
						name: "Kirk Douglas",
						title: "Chief Business Development Officer"
					},
					image: "../headshots/11.jpg"
				},

				chart_config = [
					config,
					ceo,cto,cbo,
					cdo,cio,ciso,
					cio2,ciso2,ciso3,ciso4
				];
			*/
				// Antoher approach, same result
				// JSON approach

var chart_config = readDataFromLocalStore();

if(chart_config){
	alert('data initiatlized from local store' + chart_config);
}
else{
	//chart_config = initWithDummyJson();
	loadJSON('js/tree-data.json', function(data){ alert(JSON.stringify(chart_config));
		chart_config = data;
		alert('chart_config set' + chart_config);
	});
}



function loadJSON(jsonFile, callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

function storeDataToLocalStore(jsonData){
	localStorage.setItem("JSON_DATA", JSON.stringify(jsonData));
}

function readDataFromLocalStore(){
	var jsonString = localStorage.getItem("JSON_DATA");
	return JSON.parse(jsonString);
}
				
function initWithDummyJson()
{
        var chart_config0 = 
		        {
					chart: {
						container: "#custom-colored",

						nodeAlign: "BOTTOM",

						connectors: {
							type: 'step'
						},
						node: {
							HTMLclass: 'nodeExample1'
						}
					},
					nodeStructure: {
						id: 1,
						text: {
							name: "Mark Hill",
							title: "Bangalore, India",
							contact: "Tel: 01 213 123 134",
						},
						image: "images/icon-person.png",
						children: [
							{   
							    id:2,
								text:{
									name: "Joe Linux",
									title: "Bangalore, India",
								},
								image: "images/icon-person1.png",
								HTMLclass: 'light-gray',
								children: [
									{
										id:3,
										text:{
											name: "Ron Blomquist",
											title: "White Plains, New York"
										},
										HTMLclass: 'light-gray',
										image: "images/icon-person1.png",
										children: []
									},
									{
										id:4,
										text:{
											name: "Michael Rubin",
											title: "CEO, NY Times, USA",
											contact: "we@aregreat.com"
										},
										HTMLclass: 'light-gray',
										image: "images/icon-person1.png",
										children: []
									}
								]
							},
							{
								childrenDropLevel: 2,
								id:5,
								text:{
									name: "Linda May",
									title: "North Brunswick, NJ",
								},
								HTMLclass: 'blue',
								image: "images/icon-person1.png",
								children: [
									{
									    id:6,
										text:{
											name: "Alice Lopez",
											title: "Los Angeles, CA"
										},
										HTMLclass: 'blue',
										image: "images/icon-person1.png",
										children: [
											{
											    id:7,
												text:{
													name: "Mr Alberto",
													title: "London, UK"
												},
												image: "images/icon-person1.png",
												children: [
													{
													    id:8,
														text:{
															name: "Mr Calberto",
															title: "Sideny, Austrelia"
														},
														image: "images/icon-person1.png",
														children: []
													}
												]									
											}
										]							
									},
									{
										id:9,
										text:{
											name: "Mary Johnson",
											title: "Nice, France"
										},
										HTMLclass: 'blue',
										image: "images/icon-person1.png",
										children: []
									},
									{
										id:10,
										text:{
											name: "Kirk Douglas",
											title: "Paris, France"
										},
										HTMLclass: 'blue',
										image: "images/icon-person1.png",
										children: []
									}
									
								]
							},
							{
								id:11,
								text:{
									name: "John Green",
									title: "Chief accounting officer",
									contact: "Tel: 01 213 123 134",
								},
								HTMLclass: 'gray',
								image: "images/icon-person1.png",
								children: [
									{
										id:12,
										text:{
											name: "Erica Reel",
											title: "New York, USA"
										},
										link: {
											href: "http://www.google.com"
										},
										HTMLclass: 'gray',
										image: "images/icon-person1.png",
										children: []
									}
								]
							}
						]
					}
				};
				
				return chart_config0;
}