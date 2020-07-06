import React, {useRef} from 'react';
import JoditEditor from "jodit-react";

export default function Editor({ onChange, ...props }) {
    const editor = useRef(null);

    const config = {
        readonly: false
    };

    return (
        <JoditEditor
            ref={editor}
            config={config}
            onBlur={onChange}
            {...props}
        />
    );
}