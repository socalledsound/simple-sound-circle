import React from 'react';

const Slider = ({ name, x, y, r, fill, stroke, strokeWidth, 
                updateParentWithMouseDown, updateParentWithMouseUp,
                updateParentWithHover }) => {
    
    return ( 
        <circle
            id={name}
            cx={x}
            cy={y}
            r={r}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            onMouseDown={updateParentWithMouseDown}
            onMouseUp={updateParentWithMouseUp}
            onMouseEnter={updateParentWithHover}
            onMouseLeave={updateParentWithHover}
        />
     );
}
 
export default Slider;