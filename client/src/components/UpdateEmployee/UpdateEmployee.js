import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

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
}));

function UpdateEmployee({ item, getEmployees }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [departmentItem, setDepartmentItem] = useState([]);

  const [firstname, setFirstname] = useState(item.firstname);
  const [lastname, setLastname] = useState(item.lastname);
  const [email, setEmail] = useState(item.email);
  const [department_id, setDepartment_Id] = useState(item.department_id);

  const handleChange = (e) => {
    setDepartment_Id(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:5000/departments")
      .then((res) => res.json())
      .then((result) => {
        setDepartmentItem(result.department);
      });
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { firstname, lastname, email, department_id };
      const res = await fetch(`http://localhost:5000/employees/${item.employee_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        getEmployees();
      } else {
        alert("Error: " + res.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=''>
      <Button variant='outlined' size='small' color='primary' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogActions>
          <form onSubmit={onSubmitForm} className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='standard-basic'
              label='First Name'
              fullWidth
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />{" "}
            <br />
            <TextField
              id='standard-basic'
              label='Last Name'
              fullWidth
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />{" "}
            <br />
            <TextField
              id='standard-basic'
              label='Email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Department</InputLabel>

              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={department_id}
                onChange={handleChange}
              >
                {departmentItem.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.department_id}>
                      {item.department_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br />
            <div className='flex justify-center items-center mt-4'>
              <Button style={{ width: "20ch" }} onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button style={{ width: "20ch" }} onClick={handleClose} color='primary' type='submit'>
                Update
              </Button>
            </div>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateEmployee;
