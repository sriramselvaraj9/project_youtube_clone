import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { videoData } from "../utils/videoData";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    // Simple search: match title, channel, or category
    const term = searchTerm?.toLowerCase() || '';
    const filtered = videoData.filter(v =>
      v.title.toLowerCase().includes(term) ||
      v.channel.toLowerCase().includes(term) ||
      v.category.toLowerCase().includes(term)
    );
    setVideos(filtered);
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
