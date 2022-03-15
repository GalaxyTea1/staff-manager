import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddDepartment from "../../components/AddDepartment/AddDepartment";
import AddEmployee from "../../components/AddEmployee/AddEmployee";
import ShowDepartment from "../../components/ShowDepartment/ShowDepartment";
import UpdateEmployee from "../../components/UpdateEmployee/UpdateEmployee";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50ch",
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Home({ setAuth }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [items, setItems] = useState([]);
  let navigate = useNavigate();

  const getEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/employees");
      const data = await res.json();
      setItems(data.employee);
      console.log(res);
    } catch (error) {}
  };
  useEffect(() => {
    getEmployees();
  }, []);

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      });
      // setItems(items.filter((item) => item.employee_id !== id));
      getEmployees();
    } catch (error) {
      console.log(error.message);
    }
  }

  function showToast(text) {
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      showToast(" 🦄Logout successfully");
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className={classes.grow}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='h6' noWrap>
              Logo
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>

      {/* Table */}

      <div>
        <div className='flex'>
          {/* Add Employee */}
          <AddEmployee getEmployees={getEmployees} />

          {/* Add Department */}
          <AddDepartment />

          {/* Show Department */}
          <ShowDepartment />
        </div>
        <div className='table-responsive mx-3 my-3'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Department</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={item.employee_id}>
                    <th scope='row' className='w-[5%]'>
                      {index + 1}
                    </th>
                    <td className='w-[10%]'>{item.firstname}</td>
                    <td className='w-[10%]'>{item.lastname}</td>
                    <td className='w-[20%]'>{item.email}</td>
                    <td className='w-[10%]'>{item.department_name}</td>
                    <td className='w-[7%]'>
                      <UpdateEmployee item={item} getEmployees={getEmployees} />
                    </td>
                    <td className='w-[7%]'>
                      <Button
                        variant='outlined'
                        color='secondary'
                        size='small'
                        onClick={() => handleDelete(item.employee_id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td className='w-[7%]'>
                      <Button variant='outlined' color='default' size='small'>
                        Coppy
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
