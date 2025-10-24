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
          backgroundImage: 'url("/assets/img/video-section-bg.png")',
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "500px",
        }}
      >
        <div
          className="position-absolute top-50 start-50 z-1"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <button
            className="d-inline-flex align-items-center justify-content-center text-light rounded-circle"
            style={{
              backgroundColor: "rgb(5, 150, 241)",
              width: 48,
              height: 48,
              border: "0.8px solid rgb(5, 150, 241)",
            }}
            onClick={() => setIsVideoOpen(true)}
            aria-label="Play video"
          >
            <i className="bi bi-play-fill"></i>
          </button>
        </div>
      </div>

      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"tMKX6PYHSLQ"}
      />
    </>
  );
};

export default VideoAreaHomeOne;
