import { useState } from 'react';
import {ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
// not in 1.x 
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { tokens } from '../../theme';

// Icons
// HomeOutlinedIcon
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// PeopleOutlinedIcon
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// ContactsOutlinedIcon
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
// ReceiptOutlinedIcon
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
// PersonOutlinedIcon
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// CalendarTodayOutlinedIcon
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
// HelpOutlinedIcon
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// BarChartOutlinedIcon
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
// PieChartOutlinedIcon
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
// TimelineOutlinedIcon
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
// MenuOutlinedIcon
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// MapOutlinedIcon
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
// LocalOfferOutlinedIcon
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
// CampaignOutlinedIcon
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
// ScienceOutlinedIcon
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
// EmojiEventsOutlinedIcon
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link href={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // is the sidebar collapsed?
    const [isCollapsed, setIsCollapsed] = useState(false);
    // the currently selected menu item
    const [selected, setSelected] = useState('dashboard');
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                }
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ATOM Commerce
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Image
                                    alt="profile-user"
                                    width="100"
                                    height="100"
                                    src={`/assets/user.jpg`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Adam
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Chief Powerpoint Officer
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Campaigns Hub"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Campaigns
                        </Typography>
                        <Item
                            title="Manage Campaigns"
                            to="/campaigns"
                            icon={<CampaignOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Offers"
                            to="/offers"
                            icon={<LocalOfferOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Campaign Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Stacking Rules"
                            to="/stack"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Testing"
                            to="/stack"
                            icon={<ScienceOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />


                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Loyalty
                        </Typography>
                        <Item
                            title="Manage Loyalty"
                            to="/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> 
                        <Item
                            title="Shared Rewards"
                            to="/form"
                            icon={<EmojiEventsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                        
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Products
                        </Typography>
                        <Item
                            title="Catalog"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Audiences
                        </Typography>
                        <Item
                            title="Summary"
                            to="/contacts"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Analytics
                        </Typography>
                        <Item
                            title="Goals"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Optimization"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Billing
                        </Typography>
                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Geography Chart"
                            to="/geography"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;