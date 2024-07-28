import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";

const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    const user = JSON.parse(localStorage.getItem("token"));
    const { id } = useParams("");
    console.log(id);

    const history = useNavigate();
    const handleLogout = () => {
		localStorage.removeItem("token");
		history("/login")
	};

    const getdata = async () => {

        const res = await fetch(`http://localhost:5000/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            history("/");
        }

    }

    return (
        <div className="container mt-3">
            <nav className={styles.navbar}>
            <h1><NavLink to="/" style={{ textDecoration: 'none'}}>Home</NavLink></h1>
                <h3 style={{marginLeft: "auto"}}>Welcome {user.UserName}</h3>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				</nav>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            
                            <p className="mt-3">Name: <span >{getuserdata.name}</span></p>
                            
                            <p className="mt-3">Email: <span>{getuserdata.email}</span></p>
                            <p className='mt-3'>MobileNo: <span>{getuserdata.mobileNo}</span></p>
                            <p className="mt-3">Designation: <span>{getuserdata.designation}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                        <p className="mt-3">Course: <span>{getuserdata.course}</span></p>
                        <p className="mt-3">Gender: <span>{getuserdata.gender}</span></p>
                            <p className="mt-5">Create-Date: <span> {getuserdata.createdate}</span></p>
                            <p className="mt-5">Image: <img src={`http://localhost:5000/`+ getuserdata.image} style={{height:50, width:50}}/>
                            </p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details