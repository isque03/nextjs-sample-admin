import Header from "../../components/Header";
import Image from "next/image";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));



const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);

function OutlinedCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Elevation = () => {
    return (
        <Grid container spacing={2}>
            {[lightTheme, darkTheme].map((theme, index) => (
                <Grid item xs={6} key={index}>
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '1fr 1fr' },
                                gap: 2,
                            }}
                        >
                            {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                                <Item key={elevation} elevation={elevation}>
                                    {`elevation=${elevation}`}
                                </Item>
                            ))}
                        </Box>
                    </ThemeProvider>
                </Grid>
            ))}
        </Grid>
    );
}

function DashboardMock() {
    return <Box p={2} display="flex" justifyContent="left" alignItems="center">
        <Image
            width="1300"
            height="650"
            alt="profile-user"
            src={`/assets/dashboard.png`}
        />
    </Box>;
}

function Dashboard() {
    return <div>
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Header title="Campaigns Hub" subtitle="Welcome to your dashboard"></Header>
            </Box>
            <Box display="grid">
                <OutlinedCard />
                <OutlinedCard />
                <OutlinedCard />
            </Box>

        </Box>
    </div>;
}
export default Dashboard;