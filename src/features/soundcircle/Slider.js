import React from 'react';

const Slider = ({ name, x, y, r, fill, stroke, strokeWidth, 
                updateParentWithMouseDown, updateParentWithMouseUp,
                updateparentWithHover }) => {
    
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
            onMouseEnter={updateparentWithHover}
            onMouseLeave={updateparentWithHover}
        />
     );
}
 
export default Slider;