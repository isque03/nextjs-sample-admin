import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
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
        <Box display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px">
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Box>
        {/* Icons */}
        <Box display="flex" >
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
                <PersonOutlinedIcon />
            </IconButton>
        </Box>
    </Box>;
}

export default Topbar;