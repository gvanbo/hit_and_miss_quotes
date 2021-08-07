const videoElement = document.querySelector('video');
const button = document.querySelector('button');

// Prompt user to select a media stream
//pass stream to video element and play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        alert(error)
    }
}

button.addEventListener('click', async () => {
    // Disable button
    button.disabled = true
    // start picture in picture
    await videoElement.requestPictureInPicture();
    // Reset button
    button.disabled = false
})

//on load
selectMediaStream();