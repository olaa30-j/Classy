import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "screens/navbar";
import UserWidget from "componets/homePage/UserWidget";
import PostWidget from "componets/homePage/PostWidget";
import PostsWidget from "componets/homePage/PostsWidget";
import UserFriends from "componets/homePage/UserFriends";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const smallScreen = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const res = await fetch(`http://localhost:4000/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
    <Navbar />
    <Box
      width="100%"
      padding="2rem 6%"
      display={smallScreen ? "flex" : "block"}
      gap="2rem"
      justifyContent="center"
    >
      <Box 
        flexBasis={smallScreen ? "26%" : undefined}
      >
        <UserWidget userId={userId} image={user.picture} />
        <Box m="2rem 0" />
        <UserFriends userId={userId} />
      </Box>
      <Box
        flexBasis={smallScreen ? "42%" : undefined}
        mt={smallScreen ? undefined : "2rem"}
      >
        <PostWidget picture={user.picture} />
        <Box m="2rem 0" />
        <PostsWidget userId={userId} isProfile />
      </Box>
    </Box>
  </Box>

  )
}

export default ProfilePage