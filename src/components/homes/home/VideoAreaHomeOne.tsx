import { useState } from "react";
import "react-modal-video/css/modal-video.css";
import VideoPopup from "../../../modals/video-popup";

const VideoAreaHomeOne = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div
        className="position-relative z-1"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2F764c63db9dbb47d1ac9fe25913e14ec5%2F731755f9f9674402b261eaf88af586d5)",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <div className="rounded-circle position-absolute top-50 start-50 translate-middle z-1 animate-pulse">
          <button
            className="btn btn-lg btn-icon btn-primary text-light rounded-circle"
            onClick={() => setIsVideoOpen(true)}
          >
            <i className="bi bi-play-fill"></i>
          </button>
        </div>
      </div>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"tMKX6PYHSLQ"}
      />
      {/* video modal end */}
    </>
  );
};

export default VideoAreaHomeOne;
