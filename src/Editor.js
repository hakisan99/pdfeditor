import React, { useState } from "react";
import Textbox from "./textbox/Textbox";

const Editor = () => {
    const size = { width: "600px", height: "800px" };
    const [count, setCount] = useState(0);
    const [textboxes, setTextboxes] = useState([]);
    const getMousePos = (evt) => {
        const rect = evt.target.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        return [x + "px", y + "px"];
    };
    const createTextBox = (evt) => {
        setCount(count + 1);
        const textboxPos = [...getMousePos(evt)];
        const newTextboxes = textboxes.concat(
            <Textbox key={count} position={textboxPos} />
        );
        setTextboxes(newTextboxes);
    };
    return (
        <div id="editor-bg" style={size} onClick={createTextBox}>
            {textboxes.map((ele) => ele)}
        </div>
    );
};

export default Editor;
