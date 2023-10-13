import { Box } from "@mui/material";

const UserImage = ({image}) => {
  return (
    <Box>
        <img 
        src={`http://localhost:4000/assets/${image}`}
        alt="userimage" 
            style={{ 
                objectFit:"cover",
                borderRadius:"50%", 
                height:"60px",
                width:"60px"
              }}
        />
    </Box>
  )
}

export default UserImage