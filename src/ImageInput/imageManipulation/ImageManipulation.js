import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";

import "./imageManipulation.scss";
import "react-image-crop/lib/ReactCrop.scss";

function rotateImage(rawImage) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const { width } = canvas;
      const { height } = canvas;

      canvas.width = height;
      canvas.height = width;

      ctx.translate(canvas.width, canvas.height / canvas.width);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(image, 0, 0);

      resolve(canvas.toDataURL());
    };

    image.onerror = function (error) {
      reject(error);
    };

    image.src = rawImage;
  });
}

function getCroppedImg(image, crop) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  if (!crop || !ctx) {
    throw new Error("Crop or context is undefined");
  }
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );
  return canvas.toDataURL("image/jpeg");
}

function ImageManipulation(props) {
  const [imageRef, setImageRef] = useState(null);
  const [rawImage, setRawImage] = useState(props.rawImage);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 50,
    height: 50,
    aspect: 1,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="imageManipulation">
      <div className="imageContainer">
        <div className="imageEditingText">Image editing
        </div>
        <ReactCrop
          className="componentContainer"
          src={rawImage}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onImageLoaded={(image) => setImageRef(image)}
        />
        <div className="editImageButtons">
          {imageRef
          && (
          <button
            type="button"
            className="accept"
            onClick={() => {
              const resizedImage = getCroppedImg(imageRef, crop);
              props.onFinished(resizedImage);
            }}
          >
            Accept
          </button>
          )}
          <button type="button" onClick={() => props.onCanceled(rawImage)}>
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              rotateImage(rawImage)
                .then((imageDataUrl) => {
                  setRawImage(imageDataUrl);
                  setCrop({
                    unit: "%",
                    width: 100,
                    height: 100,
                  });
                });
            }}
          >
            Rotate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageManipulation;
