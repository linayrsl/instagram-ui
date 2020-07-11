import * as React from "react";
import loadImage from "blueimp-load-image";
import ImageManipulation from "./imageManipulation/ImageManipulation";

import "./AvatarImageInput.scss";

class AvatarImageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rawImage: null,
      image: props.defaultValue || null,
      isWideImage: false,
      isProcessingImage: false,
    };
  }

  getNaturalImageSize(image) {
    return new Promise(
      (resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => {
          const imageWidth = img.naturalWidth;
          const imageHeight = img.naturalHeight;
          resolve({ imageWidth, imageHeight });
        });
        img.addEventListener("error", () => {
          reject();
        });
        img.src = image;
      },
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.defaultValue && this.props.defaultValue) {
      this.setState({ image: this.props.defaultValue });
    }
    if (prevState.image !== this.state.image) {
      if (this.state.image) {
        this.getNaturalImageSize(this.state.image)
          .then(
            (naturalSize) => {
              const { imageWidth, imageHeight } = naturalSize;
              this.setState({ isWideImage: imageWidth > imageHeight });
            },
          )
          .catch(() => {
            console.error("Failed to get image natural dimensions");
          });
      }

      this.props.onChange(this.state.image);
    }
  }

  imageChangeHandler(event) {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const image = fileList[0];
      if (image) {
        const configImage = {
          maxWidth: 800,
          maxHeight: 600,
          canvas: true,
        };
        this.setState({ isProcessingImage: true });

        loadImage(
          image,
          (canvas) => {
            this.setState({ rawImage: canvas.toDataURL() });
          },
          configImage,
        );
      }
    }
  }

  render() {
    return (
      <div className="imageInputContainer">
        <label htmlFor={this.props.id}>
          {this.state.image ? "Change image" : "Add image"}
        </label>
        <input
          disabled={this.state.isProcessingImage}
          onChange={
            this.imageChangeHandler.bind(this)
          }
          id={this.props.id}
          className="imageInput"
          type="file"
          placeholder={this.state.image ? "Change image" : "Add image"}
          accept="image/jpeg,image/png"
        />
        <div className="imageLocation">
          {this.state.image && (
            <img
              className={this.state.isWideImage ? "wideImage" : "highImage"}
              src={this.state.image}
            />
          )}
        </div>
        {this.state.rawImage
        && (
        <ImageManipulation
          rawImage={this.state.rawImage}
          onFinished={(image) => this.setState(
            {
              image,
              rawImage: null,
              isProcessingImage: false,
            },
          )}
          onCanceled={() => this.setState({ rawImage: null, isProcessingImage: false })}
        />
        )}
      </div>
    );
  }
}

export { AvatarImageInput };
