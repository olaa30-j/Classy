import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    useMediaQuery,
} from '@mui/material';
import {
    EditOutlined,
    ImageOutlined,
    GifBoxOutlined,
    AttachFileOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import FlexColumn from 'componets/FlexColumn';
import FlexBetween from 'componets/FlexBetween';
import { useState } from 'react';
import WidgetLayout from 'componets/widgetLayout';
import UserImage from 'componets/UserImage';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

const PostWidget = ({ picture }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const [postImage, setPostImage] = useState(null);
    const [post, setPost] = useState("");
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    const smallScreen = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);

        if (postImage) {
            formData.append("picture", postImage);
            formData.append("postPicture", postImage.name);
        }

        const res = await fetch("http://localhost:4000/posts/create", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        const posts = await res.json();
        dispatch(setPosts({ posts }));
        setPostImage(null);
        setPost("");
    };

    return (
        <FlexColumn>
            <WidgetLayout
                backgroundColor={palette.background.alt}
                margin=" auto 1.5rem"
            >
                <FlexBetween gap="1.5rem">
                    <UserImage image={picture} />
                    <InputBase
                        placeholder="What's on your mind..."
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        sx={{
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem",
                        }}
                    />
                </FlexBetween>
                {postImage && (
                    <Box
                        border={`1px solid ${medium}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                                setPostImage(acceptedFiles[0])
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!postImage ? (
                                        <p>Add post Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                {postImage.name}
                                            </Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                    </Box>
                )}

                <Divider sx={{ margin: "1.25rem 0" }} />

                <FlexBetween>
                    <FlexBetween
                        gap="0.25rem"
                        onClick={() => setPostImage(!postImage)}
                    >
                        <ImageOutlined sx={{ color: mediumMain }} />
                        <Typography
                            color={mediumMain}
                            sx={{
                                "&:hover": { cursor: "pointer", color: medium },
                            }}
                        >
                            Image
                        </Typography>
                    </FlexBetween>

                    {smallScreen ? (
                        <>
                            <FlexBetween gap="0.25rem">
                                <GifBoxOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>Clip</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <AttachFileOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>
                                    Attachment
                                </Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <MicOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>Audio</Typography>
                            </FlexBetween>
                        </>
                    ) : (
                        <FlexBetween gap="0.25rem">
                            <MoreHorizOutlined sx={{ color: mediumMain }} />
                        </FlexBetween>
                    )}

                    <Button
                        disabled={!post}
                        onClick={handlePost}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "3rem",
                        }}
                    >
                        POST
                    </Button>
                </FlexBetween>
            </WidgetLayout>
        </FlexColumn>
    );
};

export default PostWidget;
