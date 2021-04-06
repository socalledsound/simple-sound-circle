import MouseActionTypes from './mouse.actions.types';

export const updateMousePos = (x, y) => {
    return {
        type : MouseActionTypes.UPDATE_MOUSE_POS,
        payload : {
            x, y
        }
    }
}

export const storeMouseRef = (mousePos) => {
    return {
        type : MouseActionTypes.STORE_MOUSE_REF,
        payload : {
            mousePos
        }
    }
}