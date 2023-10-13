import {
    Box,
    Divider,
    useTheme,
    Typography,
} from '@mui/material';
import {
    ManageAccountsOutlined,
    LocationCityOutlined,
    WorkOutlineOutlined
}
    from '@mui/icons-material';
import UserImage from 'componets/UserImage';
import FlexColumn from 'componets/FlexColumn';
import FlexBetween from 'componets/FlexBetween';
import WidgetLayout from 'componets/widgetLayout';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const light = palette.neutral.light;
    const main = palette.neutral.main;

    const getUserData = async () => {
        const res = await fetch(`http://localhost:4000/user/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })

        const data = await res.json();
        setUser(data)
    }

    useEffect(() => {
        getUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user) {
        return null;
    }
    
    // destructing the user information.
    const {
        firstName,
        lastName,
        email,
        location,
        picture,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetLayout
        backgroundColor={palette.background.alt}
        height="350px"
        >
                {/* First Section */}
                <FlexBetween 
                    width="100%"
                >
                    <Box
                        display="flex"
                        gap="1rem"
                        pb="1rem"
                        alignItems="center"
                        onClick={(() => {
                            navigate(`/profile/${userId}`)
                        })}
                    >
                        <UserImage image={picture}/>
                        <FlexColumn>
                            <Typography
                                color={dark}
                                fontSize="1rem"
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        color: { light },
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                {`${firstName} ${lastName}`}
                            </Typography>
                            <Typography
                                color={medium}
                                fontSize="0.875rem"
                                sx={{
                                    "&:hover": {
                                        color: palette.background,
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                {friends.length} friends
                            </Typography>
                        </FlexColumn>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />

                {/* Second Section */}
                <FlexColumn>
                    <FlexBetween mb="0.5rem">
                        <LocationCityOutlined fontSize='3rem' color={main} />
                        <Typography color={medium}>{location}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <WorkOutlineOutlined fontSize='3rem' color={main} />
                        <Typography color={medium}>{occupation}</Typography>
                    </FlexBetween>
                </FlexColumn>

                <Divider />

                {/* Third Section */}
                <Box m="0.5rem auto">
                    <FlexBetween mb="0.25rem">
                        <Typography color={medium}>Who`s viewed your profile</Typography>
                        <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>Impressions in your posts</Typography>
                        <Typography color={main} fontWeight="500">{impressions}</Typography>
                    </FlexBetween>
                </Box>

                <Divider />

                {/* Fourth Section */}
                <Box m="0.5rem auto">
                    <Box>
                        <Typography>
                            Social Media Acoounts
                        </Typography>
                        <Typography
                                fontSize="0.875rem"
                                color={medium}
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.main,
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                {email}
                            </Typography>
                    </Box>
                </Box>
        </WidgetLayout>
    )
}

export default UserWidget;