
export const reverseBuffers = (buffers) => {

    const buffersCopy = [...buffers];

    buffersCopy.forEach( buffer => {
        // console.log(buffer);
        Array.prototype.reverse.call( buffer.getChannelData(0) );
        Array.prototype.reverse.call( buffer.getChannelData(1) );
    })

    return buffersCopy
}
