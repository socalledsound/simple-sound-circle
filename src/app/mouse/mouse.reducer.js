import MouseActionTypes from './mouse.actions.types';

const INITIAL_MOUSE_STATE = {
    mousePos : {x : 0, y: 0},
    mouseRef : null,
    dragging : false,
}

export const mouseReducer = ( state = INITIAL_MOUSE_STATE, action) => {
    switch(action.type){
        case MouseActionTypes.UPDATE_MOUSE_POS :
            // console.log(action.payload.x);
            return {
                ...state,
                mousePos : {
                    x: action.payload.x,
                    y : action.payload.y
                },
            }
        case MouseActionTypes.STORE_MOUSE_REF : 
            return {
                ...state,
                mouseRef : action.payload.mousePos,
            }
            
        default : 
            return {
                ...state
            }    
    }
}