var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

var data = {
  "fname": "Bhagwat",
  "lname": "Rai",
  "title": "Sikriwal Soldier",
  "photo": "images/icon-person.png",
  "children": [{
        "fname": "Istiak",
        "lname": "Khan",
        "title": "Sikriwal Soldier",
        "photo": "images/icon-person.png",
        "children": [{
              "fname": "Rushtam",
              "lname": "Khan",
              "title": "Jamindar",
              "photo": "images/icon-person1.png",
              "children": [{
                "fname": "Md.Hussain",
                "lname": "Khan",
                "title": "Jamindar, Police Inspector",
                "photo": "images/icon-person1.png"
              }, {
                "fname": "Fateh-Hussain",
                "lname": "Khan",
                "title": "Jamindar, Army Soldier",
                "photo": "images/icon-person1.png"
              }]
            }, {
              "fname": "Gani",
              "lname": "Khan",
              "title": "Jamindar, Farmer",
              "photo": "images/icon-person1.png"
            }]
  }]
}

root = data;
root.x0 = height / 2;
root.y0 = 0;

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

root.children.forEach(collapse);
update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  // add picture
  nodeEnter
    .append('defs')
    .append('pattern')
    .attr('id', function(d,i){
      return 'pic_' + d.fname + d.lname;
    })
    .attr('height',60)
    .attr('width',60)
    .attr('x',0)
    .attr('y',0)
    .append('image')
    .attr('xlink:href',function(d,i){
      return d.photo;
    })
    .attr('height',60)
    .attr('width',60)
    .attr('x',0)
    .attr('y',0);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  var g = nodeEnter.append("g");
  
  g.append("text")
      .attr("x", function(d) { return d.children || d._children ? -35 : 35; })
      .attr("dy", "1.35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.fname + " " + d.lname; })
      .style("fill-opacity", 1e-6);
      
    g.append("text")
      .attr("x", function(d) { return d.children || d._children ? -35 : 35; })
      .attr("dy", "2.5em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.title; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 30)
      .style("fill", function(d,i){
        return 'url(#pic_' + d.fname + d.lname+')';
      });

  nodeUpdate.selectAll("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}