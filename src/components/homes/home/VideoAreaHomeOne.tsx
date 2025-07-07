 
import  { useState } from "react";
import "react-modal-video/css/modal-video.css";  
import VideoPopup from "../../../modals/video-popup";


const VideoAreaHomeOne = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

	return (
		<>
			<div className="video-section position-relative z-1">
				<div className="rounded-circle position-absolute top-50 start-50 translate-middle z-1 animate-pulse">
					<button className="btn btn-lg btn-icon btn-primary text-light rounded-circle" onClick={() => setIsVideoOpen(true)}>
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
