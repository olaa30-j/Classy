import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostCard from './PostCard';

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getAllPosts = async () => {
        try {
            const res = await fetch(`http://localhost:4000/posts/`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        dispatch(setPosts({ posts: data }));
        } catch (error) {
            console.error('Error fetching all posts:', error);
            dispatch(setPosts([])); // Set an empty array in case of an error
        }
    };

    const getUserPosts = async () => {
        try {
            const res = await fetch(`http://localhost:4000/posts/${userId}/userpost`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            console.log(data)
            dispatch(setPosts({posts: data}));
        } catch (error) {
            console.error('Error fetching user posts:', error);
            dispatch(setPosts([])); // Set an empty array in case of an error
        }
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getAllPosts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map(({ _id, userId, firstName, lastName, location, description, postPicture, picture, likes, comments }) => (
                    <PostCard
                        key={_id}
                        postId={_id}
                        name={`${firstName} ${lastName}`}
                        postUserId={userId}
                        location={location}
                        description={description}
                        postPicture={postPicture}
                        picture={picture}
                        likes={likes}
                        comments={comments}
                    />
                ))
            ) : (
                <p 
                    style={{
                        textAlign:"center"
                    }}
                >No posts available.</p>
            )}
        </>
    );
    
};

export default PostsWidget;
