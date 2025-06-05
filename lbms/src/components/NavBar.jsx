import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImBook } from "react-icons/im";


const pages = [
    { name: 'Home', path: '/' },
    { name: 'Form', path: '/form' }
];

const NavBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" sx={{ m: 0, p: 0, backgroundColor: 'black' }}>
            <Toolbar disableGutters sx={{ m: 0, p: 0 }}>
                <Typography style={{
                    fontSize: "24px", paddingLeft: "10px", fontWeight:'500', display: 'flex', justifyContent: 'center', gap: 5, alignItems: 'center'
                }}><ImBook size={22} />LBMS</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', gap: '10px', paddingRight: '10px' }}>
                    {pages.map((page) => (
                        <div
                            key={page?.name}
                            style={{ borderBottom: location?.pathname === page?.path ? '3px solid red' : "", fontWeight: location?.pathname === page?.path ? 700 : 400 }}
                            onClick={() => { navigate(page?.path) }}
                        >
                            {page.name}
                        </div>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default NavBar;
