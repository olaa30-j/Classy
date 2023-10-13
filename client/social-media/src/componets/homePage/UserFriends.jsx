import React, { useEffect, useState } from 'react';
import { useTheme, IconButton, Typography, Box } from '@mui/material';
import { PersonRemoveOutlined } from '@mui/icons-material';
import UserImage from 'componets/UserImage';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from 'state';
import FlexBetween from 'componets/FlexBetween';



const UserFriends = ({ userId , onRemoveFriend}) => {
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const [userFriends, setUserFriends] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const getUserFriends = async () => {
        try {
            const res = await fetch(`http://localhost:4000/user/getfriends/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setUserFriends(data)
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleRemoveFriend = async (postUserId) => {
        try {
            const res = await fetch(`http://localhost:4000/user/${userId}/${postUserId}`, {
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
        
    useEffect(() => {
        getUserFriends()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserFriends]);

    if (!userFriends) {
        return null;
    };

    return (
        <Box
            sx={{
                backgroundColor: palette.background.alt,
                padding: "1.5rem",
                borderRadius: "20px",
                position:"sticky",
                top:"20px",
                left:0
            }}>
            <Typography
                sx={{
                    marginBottom: "0.875rem",
                    fontSize: "1.5rem",
                    color: palette.primary.main
                }}
            >
                Your Friends
            </Typography>
            {
                userFriends?.map(({ _id, firstName, lastName, location, picture, occupation }) => (
                    <FlexBetween
                        key={_id}
                        sx={{
                            margin: "1rem auto",
                            borderRadius: "20px",
                            backgroundColor: palette.background.alt,
                        }}
                    >
                        <FlexBetween gap="1rem">
                            <UserImage image={picture} size='55px' />
                            <Box
                                onClick={() => {
                                    navigate(`/profile/${_id}`)
                                    navigate(0);
                                }}
                            >
                                <Typography
                                    color={main}
                                    variant='h6'
                                    sx={{
                                        "&:hover": {
                                            color: primaryLight,
                                            cursor: "pointer"
                                        }
                                    }}
                                >
                                    {`${firstName} ${lastName}`}
                                </Typography>

                                <Typography
                                    color={medium}
                                    fontSize="0.75rem"
                                    sx={{
                                        "&:hover": {
                                            color: main,
                                            cursor: "pointer"
                                        }
                                    }}
                                >
                                    {`${location}`}
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <IconButton
                            onClick={() => handleRemoveFriend(_id)}
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
                    </FlexBetween>
                ))
            }
        </Box>
    )
}

export default UserFriends