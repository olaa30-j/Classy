import {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WidgetLayout from 'componets/widgetLayout';
import FlexBetween from 'componets/FlexBetween';
import { setFriends } from 'state';

import { 
  useTheme,
  Typography, 
  IconButton,
  Divider,
  Box
} from '@mui/material';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import { setPost } from 'state';
import FriendsWidget from './FriendsWidget';

const PostCard = ({
  postId,
  name,
  postUserId,
  location,
  description,
  postPicture,
  picture,
  likes,
  comments,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [allComments, setAllComments] = useState(false);
  const isLiked = Boolean(likes[getUserId]);
  const likeCount = Object.keys(likes).length;

  const {_id} = useSelector((state)=> state.user);

  const patchLikes = async () => {
    const res = await fetch(`http://localhost:4000/posts/${postId}/likeposts`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: getUserId }),
    })
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  }

  const handleAddFriend = async () => {
    try {
        const res = await fetch(`http://localhost:4000/user/${_id}/${postUserId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (res.status === 200) {
            const data = await res.json();
            dispatch(setFriends({ friends: data }));
        } else {
            console.error(`Error: ${res.status}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const handleRemoveFriend = async () => {
    try {
        const res = await fetch(`http://localhost:4000/user/${_id}/${postUserId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        dispatch(setFriends({ friends: data.friends }));

} catch (error) {
        console.error("Error during friend deletion:", error);
    }
};

  return (
    <WidgetLayout 
      m="1.5rem"
      sx={{
        backgroundColor: palette.background.alt
      }}
      >
      <FriendsWidget
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicture={picture}
        onAddFriend={handleAddFriend}
        onRemoveFriend={handleRemoveFriend}    
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {postPicture && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:4000/assets/${postPicture}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLikes}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setAllComments(!allComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {allComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetLayout>
  )
}
export default PostCard