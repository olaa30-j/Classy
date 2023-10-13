import { Box } from '@mui/material';
import { styled } from "@mui/system";

const WidgetLayout = styled(Box)(({ theme }) => ({
    padding: "1.5rem",
    backgroundColor: theme.palette.background,
    borderRadius: "0.75rem",
    flexDirection: "column"
}));

export default WidgetLayout;