import React, { useState } from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";


const VideoCard = ({ video: { id: { videoId }, snippet, likes = 0 }, videos = [], index = 0 }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [currentIndex, setCurrentIndex] = useState(index);

  const handleLikeAndPlay = () => {
    setLikeCount(likeCount + 1);
    setShowPlayer(true);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
    setShowPlayer(true);
  };

  // Get current video info for modal
  const currentVideo = videos.length > 0 ? videos[currentIndex] : null;
  const modalVideoId = currentVideo?.id?.videoId || currentVideo?.id || videoId;
  const modalSnippet = currentVideo?.snippet || snippet;

  return (
    <>
      <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px" }, boxShadow: "none", borderRadius: 0, position: 'relative' }}>
        <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
          <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}
            sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
          />
        </Link>
        <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
          </Link>
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
            <Typography variant="subtitle2" color="gray">
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
            </Typography>
          </Link>
          {/* Like button to play video in modal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <button
              style={{
                background: '#FC1503',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '6px 16px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={handleLikeAndPlay}
            >
              Like & Play
            </button>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{likeCount} 👍</span>
          </div>
        </CardContent>
      </Card>
      {/* Simple modal for video playback */}
      {showPlayer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{ position: 'relative', width: '80vw', maxWidth: 800 }}>
            <button
              onClick={() => setShowPlayer(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#FC1503',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '4px 12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                zIndex: 10000,
              }}
            >
              Close
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                background: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '4px 12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                zIndex: 10000,
              }}
            >
              Next ▶
            </button>
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${modalVideoId}`}
              title={modalSnippet?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: 8 }}
            />
            <div style={{ color: 'white', marginTop: 12, textAlign: 'center', fontWeight: 'bold' }}>
              {modalSnippet?.title}
            </div>
          </div>
        </div>
      )}
    </>
  );

};

export default VideoCard