import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  if(!videos?.length) return <Loader />;
  
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {/* Support both API and static videoData */}
          {item.videoUrl ? (
            <VideoCard
              video={{
                id: { videoId: item.id || item.id?.videoId || `static-${idx}` },
                snippet: {
                  title: item.title,
                  channelTitle: item.channel,
                  thumbnails: { high: { url: item.thumbnail } },
                  channelId: item.channelId || `static-channel-${idx}`,
                },
                likes: item.likes,
              }}
              videos={videos}
              index={idx}
            />
          ) : (
            <>
              {item.id?.videoId && <VideoCard video={item} videos={videos} index={idx} />}
              {item.id?.channelId && <ChannelCard channelDetail={item} />}
            </>
          )}
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;
