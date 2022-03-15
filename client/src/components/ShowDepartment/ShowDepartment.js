import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import UpdateDepartment from "../UpdateDepartment/UpdateDepartment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "50ch",
    },
  },
}));

function ShowDepartment() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const getDepartment = async () => {
    try {
      const res = await fetch("http://localhost:5000/departments");
      const data = await res.json();
      setItems(data.department);
    } catch (error) {}
  };
  useEffect(() => {
    getDepartment();
  }, []);

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:5000/departments/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item.department_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='mt-3 mx-3'>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Update Department
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogActions>
          <form className={classes.root} noValidate autoComplete='off'>
            <div className='table-responsive mx-6 my-3'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Department Name</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope='row' className='w-[5%]'>
                          {index + 1}
                        </th>
                        <td className='w-[10%]'>{item.department_name}</td>
                        <td className='w-[5%]'>
                          <UpdateDepartment item={item} getDepartment={getDepartment} />
                        </td>
                        <td className='w-[5%]'>
                          <Button
                            variant='outlined'
                            color='secondary'
                            size='small'
                            onClick={() => handleDelete(item.department_id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <br />
            <div className='flex justify-center items-center mt-4'>
              <Button style={{ width: "20ch" }} onClick={handleClose} color='primary'>
                CANCEL
              </Button>
            </div>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowDepartment;
