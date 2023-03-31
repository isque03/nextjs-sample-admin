import { Box } from "@mui/material";
import Header from "../../components/Header";
function Dashboard() {
    return <div>
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Header title="Dashboard" subtitle="Welcome to your dashboard"></Header>
            </Box>
        </Box>
    </div>;
}
export default Dashboard;