import React from 'react'
import {Box, useMediaQuery } from '@mui/material'
import UserWidget from 'componets/homePage/UserWidget'
import { useSelector } from 'react-redux'
import PostWidget from 'componets/homePage/PostWidget'
import Navbar from 'screens/navbar'
import PostsWidget from 'componets/homePage/PostsWidget'
import UserFriends from 'componets/homePage/UserFriends'
import AdsWidget from 'componets/homePage/AdsWidget'
const HomePage = () => {
  const smallScreen = useMediaQuery("(min-width:700px)");
  const  {_id, picture}= useSelector((state)=> state.user);

  return (
    <>
    <Navbar/>
    <Box
      width="100%"
      p="3rem 1.5rem"
      display={smallScreen ? "flex" : "block"}
      gab="0.5rem"
      justifyContent="space-between"
    >
        <Box flexBasis={smallScreen? "26%" : undefined}>
          <UserWidget userId={_id} picture={picture}/>
        </Box>
        <Box flexBasis={smallScreen? "60%" : undefined}>
          <PostWidget picture={picture}/>
          <PostsWidget userId={_id} picture={picture}/>
        </Box>
        <Box flexBasis={smallScreen? "26%" : undefined}>
          <AdsWidget/>
          <UserFriends userId={_id}/>
        </Box>
    </Box>
    </>
  )
}

export default HomePage