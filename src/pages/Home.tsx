import React, { useEffect, useState, useRef } from "react";
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Breadcrumbs, Link, List, ListItemButton, ListItemText, Avatar } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface MenuItemType {
  id: number;
  label: string;
  path: string;
}

const Home: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [dragging, setDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  // 面包屑
  const breadcrumbs = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get<MenuItemType[]>("/menu.json");
        setMenuItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenu();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    e.preventDefault();
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const newWidth = e.clientX;
      if (newWidth > 120 && newWidth < 600) {
        setSidebarWidth(newWidth);
      }
    }
  };
  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserClose = () => setAnchorEl(null);
  const handleRoleSwitch = (role: string) => {
    console.log("切换角色：", role);
    handleUserClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 左侧侧边栏 */}
      <Box
        ref={sidebarRef}
        sx={{
          width: sidebarWidth,
          bgcolor: "grey.100",
          height: "100vh",
          overflow: "auto",
          borderRight: "1px solid #ddd",
          position: "relative",
        }}
      >
        <List>
          {menuItems.map(item => (
            <ListItemButton key={item.id} onClick={() => navigate(item.path)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Box
          onMouseDown={handleMouseDown}
          sx={{
            width: 5,
            cursor: "col-resize",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            bgcolor: "grey.300",
          }}
        />
      </Box>

      {/* 主体内容 */}
      <Box sx={{ flex: 1 }}>
        {/* 顶栏 */}
        <AppBar position="static" color="transparent" elevation={1}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">管理后台</Typography>
            <Box>
              <IconButton onClick={handleUserClick}>
                <Avatar>U</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleUserClose}
              >
                <MenuItem onClick={() => handleRoleSwitch("管理员")}>管理员</MenuItem>
                <MenuItem onClick={() => handleRoleSwitch("用户")}>用户</MenuItem>
                <MenuItem onClick={handleUserClose}>退出</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* 面包屑 */}
        <Box sx={{ p: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => navigate("/home")}>首页</Link>
            {breadcrumbs.map((bc, idx) => (
              <Typography key={idx} color="text.primary">{bc}</Typography>
            ))}
          </Breadcrumbs>

          {/* 子页面内容 */}
          <Box sx={{ mt: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
