import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Theme } from "@mui/material/styles"; // Importe Theme aqui
import { AppBar, Avatar, Box, Menu, MenuItem, Tooltip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

interface NavbarProps {
  handleDrawerOpen: () => void;
  theme: Theme;
}

const settings = ['Meu Perfil', 'Minha empresa', 'Plano e pagamento', 'Central de ajuda', 'Sobre', 'Sair'];



const Navbar: React.FC<NavbarProps> = ({ handleDrawerOpen, theme }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
    position="fixed"
    sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Fit Next
      </Typography>

        <Box sx={{flexGrow: 1}} /> {/* Esta linha faz o espaço entre o título e o avatar */}
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px',}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;
