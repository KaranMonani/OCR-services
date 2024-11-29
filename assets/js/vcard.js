let currentStream;
let currentCameraIndex = 0;
let cropper;

async function startCamera(cameraId) {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => track.stop());
  }

  const constraints = {
    video: {
      deviceId: cameraId,
      width: { ideal: 640, max: 1280 },
      height: { ideal: 480, max: 720 },
      frameRate: { ideal: 30, max: 30 },
    },
  };

  try {
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    document.getElementById("video").srcObject = currentStream;
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

async function switchCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter((device) => device.kind === "videoinput");

  if (cameras.length > 1) {
    currentCameraIndex = (currentCameraIndex + 1) % cameras.length;
    startCamera(cameras[currentCameraIndex].deviceId);
  }
}

document.getElementById("upload-button").onclick = function () {
  document.getElementById("image-input").click();
};

document.getElementById("image-input").onchange = function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageData = event.target.result;
      document.getElementById("cropper-image").src = imageData;
      document.getElementById("crop-modal").style.display = "block";
      document.body.style.overflow = "hidden";
      cropper = new Cropper(document.getElementById("cropper-image"), {
        aspectRatio: NaN,
        viewMode: 1,
        dragMode: "move",
        cropBoxResizable: true,
        cropBoxMovable: true,
        movable: false,
        toggleDragModeOnDblclick: false,
        guides: false,
        crop: function (event) {
          console.log(
            event.detail.x,
            event.detail.y,
            event.detail.width,
            event.detail.height
          );
        },
      });
      document.getElementById("crop-button").onclick = function () {
        const canvas = cropper.getCroppedCanvas();
        const imageDataURL = canvas.toDataURL("image/jpeg");
        document.getElementById("uploaded-image").src = imageDataURL;
        document.getElementById("uploaded-image").style.display = "block";
        document.getElementById("generated-image-container").style.display =
          "block";
        document.getElementById("crop-modal").style.display = "none";
        document.body.style.overflow = "auto";
        document.getElementById("final-upload-button").style.display = "block";
      };
      document.getElementById("cancel-button").onclick = function () {
        document.getElementById("image-input").value = "";
        document.getElementById("crop-modal").style.display = "none";
        document.body.style.overflow = "auto";
      };
    };
    reader.readAsDataURL(file);
  }
};

document.getElementById("scan-button").onclick = function () {
  document.getElementById("camera-modal").style.display = "block";
  document.body.style.overflow = "hidden";
  startCamera();
};

document
  .getElementById("switch-camera-button")
  .addEventListener("click", switchCamera);

document.getElementById("capture-button").onclick = function () {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataURL = canvas.toDataURL("image/jpeg");

  currentStream.getTracks().forEach((track) => track.stop());

  document.getElementById("uploaded-image").src = ""; 
  document.getElementById("uploaded-image").style.display = "none"; 
  if (cropper) {
    cropper.destroy(); 
  }

  document.getElementById("cropper-image").src = imageDataURL;
  document.getElementById("camera-modal").style.display = "none";
  document.getElementById("crop-modal").style.display = "block";
  document.body.style.overflow = "hidden";
  cropper = new Cropper(document.getElementById("cropper-image"), {
    aspectRatio: NaN,
    viewMode: 1,
    dragMode: "move",
    cropBoxResizable: true,
    cropBoxMovable: true,
    movable: false,
    toggleDragModeOnDblclick: false,
    guides: false,
    crop: function (event) {
      console.log(
        event.detail.x,
        event.detail.y,
        event.detail.width,
        event.detail.height
      );
    },
  });

  
  document.getElementById("crop-button").onclick = function () {
    const canvas = cropper.getCroppedCanvas();
    const imageDataURL = canvas.toDataURL("image/jpeg");
    document.getElementById("uploaded-image").src = imageDataURL;
    document.getElementById("uploaded-image").style.display = "block";
    document.getElementById("generated-image-container").style.display =
      "block";
    document.getElementById("crop-modal").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("final-upload-button").style.display = "block";
  };
  document.getElementById("cancel-button").onclick = function () {
    document.getElementById("image-input").value = "";
    document.getElementById("crop-modal").style.display = "none ";
    document.body.style.overflow = "auto";
  };
};

document.getElementById("final-upload-button").addEventListener("click", () => {
  document.getElementById("right-column").classList.remove("hidden");
  document.getElementById("extracted-data").classList.remove("hidden");
  document.getElementById("skeleton-structure").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("skeleton-structure").classList.add("hidden");
    document.getElementById("actual-card").classList.remove("hidden");
  }, 1000); 
});