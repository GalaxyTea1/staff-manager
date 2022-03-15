import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { toast } from "react-toastify";

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

function AddDepartment() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const [department_name, setDepartment_Name] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { department_name };
      const res = await fetch("http://localhost:5000/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        showToast("🦄 Add Success");
      } else {
        showToast("🦄 Something Error");
      }
      setDepartment_Name("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='mt-3 mx-3'>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add Department
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogActions>
          <form onSubmit={onSubmitForm} className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='standard-basic'
              label='Department Name'
              fullWidth
              value={department_name}
              onChange={(e) => setDepartment_Name(e.target.value)}
            />{" "}
            <br />
            <br />
            <div className='flex justify-center items-center mt-0'>
              <Button style={{ width: "20ch" }} onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button style={{ width: "20ch" }} onClick={handleClose} color='primary' type='submit'>
                Add
              </Button>
            </div>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDepartment;
