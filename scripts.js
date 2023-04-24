// scripts.js

let mediaRecorder;
let recordedBlobs;

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            recordedBlobs = [];

            mediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    recordedBlobs.push(event.data);
                }
            };

            mediaRecorder.start();
        })
        .catch(error => {
            console.error('Error accessing user media:', error);
        });
}

function stopRecording() {
    mediaRecorder.stop();

    const blob = new Blob(recordedBlobs, { type: 'audio/webm' });
    const recordingName = 'Recording-' + Math.floor(Math.random() * 10000);
    const url = URL.createObjectURL(blob);
    const recordingList = document.getElementById('recordingList');
    const option = document.createElement('option');

    option.value = url;
    option.textContent = recordingName;
    recordingList.appendChild(option);
}

function playRecording() {
    const recordingList = document.getElementById('recordingList');
    const selectedUrl = recordingList.value;

    if (selectedUrl) {
        const audio = new Audio(selectedUrl);
        audio.play();
    }
}

document.getElementById('recordingList').addEventListener('click', playRecording);
