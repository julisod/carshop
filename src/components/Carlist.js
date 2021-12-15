import AddCar from './AddCar';
import EditCar from './EditCar';
import React, {useEffect, useState} from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import Snackbar from '@mui/material/Snackbar';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const columns = [
        {field: "brand", sortable: true, filter: true},
        {field: "model", sortable: true, filter: true},
        {field: "color", sortable: true, filter: true, width: 120},
        {field: "year", sortable: true, filter: true, width: 120},
        {field: "fuel", sortable: true, filter: true, width: 120},
        {field: "price", sortable: true, filter: true, width: 120},
        {
            headerName: "",
            field: "_links.self.href",
            width: 65,
            cellRendererFramework: params => <EditCar updateCar={updateCar} params={params} />
        },
        {
            headerName: "",
            field: "_links.self.href",
            width: 65,
            cellRendererFramework: params => 
                <IconButton
                    color="error"
                    onClick={() => deleteCar(params.value)}><DeleteIcon />
                </IconButton>
        }
    ]

    const fetchCars = () => {
            fetch("https://carstockrest.herokuapp.com/cars")
            .then(response => response.json())
            .then(responseData => setCars(responseData._embedded.cars))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchCars();
    }, [])
    
    const deleteCar = (url) => {
        if(window.confirm("Are you sure you want to delete?")) {
            fetch(url, { method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    fetchCars();
                    setMsg("Poisto onnistui");
                    setOpen(true);
                } else {
                    //tämän sijaan olisi voinut laittaa error snackbarin
                    alert("Jokin meni vikaan poistamisessa");
                }
            })
            .catch(err => console.error(err))
        }
    }

    const addCar = (car) => {
        fetch("https://carstockrest.herokuapp.com/cars", {
            method: "POST",
            headers: { "Content-type" : "application/json"},
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
                setMsg("Lisäys onnistui");
                setOpen(true);
            } else {
                alert("Jokin meni vikaan lisäyksessä");
            }
        })
        .catch(err => console.error(err))
    }

    const updateCar = (url, updatedCar) => {
        fetch(url, {
            method: "PUT",
            headers: { "Content-type" : "application/json"},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
                setMsg("Muokkaus onnistui");
                setOpen(true);
            } else {
                //pitäiskö tämän sijaan laittaa error snackbar? viestinä voisi olla muuttuja errorMessage
                alert("Jokin meni vikaan muokkauksessa");
            }
        })
        .catch(err => console.error(err))
    }

    return (
        <React.Fragment>
            <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{height: 600, width: "90%", "max-width" : "1025px", margin: "auto"}}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </React.Fragment>
    );
}
export default Carlist;