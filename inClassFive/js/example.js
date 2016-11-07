//In class Assignment 5 - Naman Jiandani


// Getting all "ul" elements (using tag name to find them in DOM)
var ul = document.getElementsByTagName("ul")[0];

// Add a new item to the end of list
var li = document.createElement("li");
var textnode = document.createTextNode("cream");
li.appendChild(textnode);
ul.appendChild(li);

// Add a new item to the start of list
li = document.createElement("li");
textnode = document.createTextNode("kale");
li.appendChild(textnode);
ul.insertBefore(li,ul.childNodes[0]);

// add "cool" style to all list items
for(var i=0; i < ul.children.length; i++)
{
    ul.children[i].className="cool";
}

// inject number of items in the list to header
var h2Object=document.getElementsByTagName("h2")[0];
temporaryElem = document.createElement('span');
temporaryText = document.createTextNode(ul.children.length);
temporaryElem.appendChild(temporaryText);
h2Object.append(temporaryElem);
