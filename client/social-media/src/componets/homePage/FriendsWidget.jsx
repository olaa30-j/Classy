import { useTheme, IconButton, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'componets/FlexBetween';
import UserImage from 'componets/UserImage';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';

const FriendsWidget = ({friendId, name, subtitle, userPicture, onAddFriend, onRemoveFriend}) => {
    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    // to take _id and the friends 
    const friends = useSelector((state)=> state.user.friends);
    const {_id} = useSelector ((state)=> state.user)
    const navigate = useNavigate();
    //ensure i have a friend 
    const isFriend = friends.includes(friendId);


    return (
        <FlexBetween
            sx={{
                borderRadius: "20px",
                backgroundColor: palette.background.alt,
            }}
        >
                        <FlexBetween gap="1rem">
                <UserImage image={userPicture} size='55px'/>
                <Box
                    onClick={()=>{
                        navigate(`/profile/${friendId}`)
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant='h5'
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color: primaryLight,
                                cursor:"pointer"
                            }
                        }}
                    >
                        {`${name}`}
                    </Typography>

                    <Typography
                        color={medium}
                        fontSize="0.75rem"
                        sx={{
                            "&:hover":{
                                color: main,
                                cursor:"pointer"
                            }
                        }}
                    >
                        {`${subtitle}`}
                    </Typography>
                </Box>
            </FlexBetween>
            {!(_id === friendId) ? (
                isFriend ? (
                    <IconButton
                    onClick={onRemoveFriend}
                    sx={{
                        backgroundColor: primaryLight,
                        p: "0.6rem",
                    }}
                >
                    <PersonRemoveOutlined
                        sx={{
                            color: primaryDark,
                        }}
                    />
                </IconButton>
            ) : (
                <IconButton
                    onClick={onAddFriend}
                    sx={{
                        backgroundColor: primaryLight,
                        p: "0.6rem",
                    }}
                >
                    <PersonAddOutlined
                        sx={{
                            color: primaryDark,
                        }}
                    />
                </IconButton>

                )    
            ) : (
                null
            )}
    </FlexBetween>
    );
};

export default FriendsWidget