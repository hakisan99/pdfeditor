import React from "react";
import interact from "interactjs";


const  dragMoveListener  = (event) => {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

const textbox = interact(".default-textbox");

textbox.resizable({
    edges:{left: false, right: true, bottom: true, top: false},
    listeners: {
        move(event){
            let target = event.target;
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px'
        }
    }
})

textbox.draggable({
    inertia: true,
    modifiers: [
        interact.modifiers.restrict({
            restriction:'parent'
        })
    ],
    listeners: {
        start(evt) {
            evt.stopPropagation();
            console.log("start")
        },
        move:dragMoveListener,
        end(evt) {
            evt.stopPropagation();
            console.log("end")
        }
    }
});



const getMousePos = (evt) => {
    let rect = evt.target.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    return [x + "px", y + "px"];
};

const handleChildClick = (evt) => {
    evt.stopPropagation();
};

const deleteTextBox = (evt) => {
    evt.target.parentNode.remove()
}

const createTextBox = (evt) => {
    let container = document.createElement("div");
    let editorDiv = document.getElementById("editor-bg");
    let textboxInput = document.createElement("textarea");
    let deleteDiv = document.createElement("div");
    textboxInput.className = 'textbox-input';
    deleteDiv.className = "delete-textbox";
    deleteDiv.addEventListener("click",deleteTextBox);
    container.appendChild(deleteDiv);
    container.addEventListener("click", handleChildClick);
    container.className = "default-textbox";
    let [x, y] = [...getMousePos(evt)];
    container.style.top = y;
    container.style.left = x;
    container.appendChild(textboxInput);
    editorDiv.appendChild(container);
};

const Editor = () => {
    const size = { width: "600px", height: "800px" };

    return <div id="editor-bg" style={size} onClick={createTextBox}></div>;
};

export default Editor;
