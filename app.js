// Data (mutable)
// `node.element` will be filled during `createNode`
var treeData = [
	{
		name: 'Hecataeus_QMLTYPE_56_QML_87(0x12345678, "RootAppWindow")',
		element: null,
		children: [
			{
				name: 'MouseArea(0x12345678, "Clicker")',
				element: null,
				children: []
			},
			{
				name: 'MouseArea(0x12345678)',
				element: null,
				children: []
			}
		]
	}
];
/*
	name <String>
		Default type: 'MouseArea(0x12345678)'
		Default type + objectName: 'MouseArea(0x12345678, "Clicker")'
		Custom type: 'Hecataeus_QMLTYPE_56_QML_87(0x12345678)'
		Custom type + objectName: 'Hecataeus_QMLTYPE_56_QML_87(0x12345678, "RootAppWindow")'
*/
function getNodeData(name) {
	var parts = name.split('(');
	var type = parts[0].split('_')[0];
	var objectName = parts[1].split('"');
	objectName = objectName.length === 3
		? objectName[1]
		: "";
	return {
		type: type,
		objectName: objectName
	};
}


// Command Line
var input = document.getElementById('input');
input.addEventListener('keyup', handleInput);
input.addEventListener('change', handleInput);
function handleInput(event) {
	var query = event.target.value;
	var queryParts = query.split('.');
	if (queryParts.length === 1) {
		var elements = queryParts(queryParts[0]);
		console.log('elements', typeof elements, elements);
	}
}
function findElements(query) {
	
}


// DOM
var treeElement = document.getElementById('tree');
/*
	nodes [{
		name: <String>,
		children: [<Node>]
	}]
*/
function createNode(parent, nodes, deepness) {
	deepness = deepness || 0;
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];

		fragment.appendChild(
			createNodeElement(
				getNodeData(node.name),
				deepness));

		createNode(fragment, node.children, deepness + 4);

	}
	parent.appendChild(fragment);
}
/*
	nodeData {
		type: <String>,
		[objectName: <String>]
	}

*/
function createNodeElement(nodeData, deepness) {
	var node = document.createElement('div');
	addClass(node, 'node');

	var space = document.createElement('span');
	addClass(space, 'space');
	space.innerText = new Array(deepness * 4).join(' ');
	node.appendChild(space);

	var type = document.createElement('span');
	addClass(type, 'type');
	type.innerText = nodeData.type;
	node.appendChild(type);

	if (nodeData.objectName) {
		var objectName = document.createElement('span');
		addClass(objectName, 'objectName');
		objectName.innerText = nodeData.objectName;
		node.appendChild(objectName);
	}

	return node;
}
function addClass(element, className) {
	var classes = element.className.split(' ');
	if (!(className in classes)) {
		classes.push(className);
		element.className = classes.join(' ');
	}
}
function removeClass(element, className) {
	var classes = element.className.split(' ');
	var index = classes.indexOf(className);
	if (index !== -1) {
		classes.splice(index, 1);
		element.className = classes.join(' ');
	}
}


// Program
createNode(treeElement, treeData);
