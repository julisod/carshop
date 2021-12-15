import React, {useState} from 'react';
import "../App.css"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({brand:"", model:"", color:"", fuel:"", year:"", price:"" })

    const handleClickOpen = () => {
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            year: props.params.data.year,
            price: props.params.data.price
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
        };

    const handleSave = () => {
        props.updateCar(props.params.value, car);
        setCar({brand:"", model:"", color:"", fuel:"", year:"", price:"" });
        handleClose();
        };


    return (
      <div className="App">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              name="brand"
              value={car.brand}
              onChange={inputChanged}
              margin="dense"
              label="Brand"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              name="model"
              value={car.model}
              onChange={inputChanged}
              margin="dense"
              label="Model"
              fullWidth
              variant="standard"
            />
            <TextField
              name="color"
              value={car.color}
              onChange={inputChanged}
              margin="dense"
              label="Color"
              fullWidth
              variant="standard"
            />
            <TextField
              name="fuel"
              value={car.fuel}
              onChange={inputChanged}
              margin="dense"
              label="Fuel"
              fullWidth
              variant="standard"
            />
            <TextField
              name="year"
              value={car.year}
              onChange={inputChanged}
              margin="dense"
              label="Year"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              name="price"
              value={car.price}
              onChange={inputChanged}
              margin="dense"
              label="Price"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default EditCar;