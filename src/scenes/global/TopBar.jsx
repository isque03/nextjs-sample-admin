import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';


const Topbar = () => {
    // grab the color mode from the context
    const theme = useTheme();
    // grab the color mode from the context for the current theme (light or dark)
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return <Box display="flex" justifyContent={"space-between"} alignItems={"center"} p={2}>
        {/* Search bar */}
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px"></Box>
        <IconButton></IconButton>
    </Box>;
    
}

export default Topbar;