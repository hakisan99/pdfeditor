/* eslint react/prop-types: 0 */
import React from "react";
import interact from "interactjs";
const  dragMoveListener  = (event) => {
    let target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
  
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

const textbox = interact(".container-textbox");

textbox.resizable({
    edges:{left: false, right: true, bottom: true, top: false},
    modifiers: {
        restriction: 'parent',
    },
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
    allowFrom: ".drag-handle",
    modifiers: [
        interact.modifiers.restrict({
            restriction:'parent'
        })
    ],
    listeners: {
        start(evt) {
            evt.stopPropagation();
        },
        move(evt) {
            dragMoveListener(evt)
        },
        end(evt) {
            evt.stopPropagation();
        }
    }
});


const Textbox = ({position}) => {
    const handleChildClick = (evt) => {
        evt.stopPropagation();
    };

    const deleteTextBox = (evt) => {
        evt.target.parentNode.remove();
    };
    const style ={top:position[1],left:position[0]}
    return (
        <div className="container-textbox" onClick={handleChildClick} style={style}>
            <div className="drag-handle"></div>
            <textarea className="input-textbox"></textarea>
            <div className="delete-handle" onClick={deleteTextBox}></div>
        </div>
    );
};

export default Textbox;
