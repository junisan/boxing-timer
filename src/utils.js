const secondsToMS = (seconds) => {
    const minutes = Math.floor(seconds/60);
    const secs = seconds - minutes*60;
    return minutes + ':' + (secs).toString().padStart(2, '0')
}

export {secondsToMS};
