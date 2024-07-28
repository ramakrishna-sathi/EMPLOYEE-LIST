import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from "./styles.module.css";
const Edit = () => {

    const user = JSON.parse(localStorage.getItem("token"));
    const history = useNavigate("");
    const handleLogout = () => {
		localStorage.removeItem("token");
		history("/login")
	};
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        mobileNo: "", 
        designation: "",
        gender: "M",
        course: "",
        createdate: "",
        image: ""
    })

    const setimage = (e) => {
        setINP({...inpval, image: e.target.files[0]});
    }

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



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
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', inpval.image);
        formData.append('name', inpval.name);
        formData.append('email', inpval.email);
        formData.append('mobileNo', inpval.mobileNo);
        formData.append('designation', inpval.designation);
        formData.append('gender', inpval.gender);
        formData.append('course', inpval.course);
        formData.append('createdate', inpval.createdate);
        axios.patch(`http://localhost:5000/updateuser/${id}`, formData)
        .then(res => {
           console.log(res);
           history("/")
            console.log("data added");
        })
        .catch(err => {
           console.log(err);
        });
    }

    return (
        <div className="container">
            <nav className={styles.navbar}>
				<h1><NavLink to="/" style={{ textDecoration: 'none'}}>Home</NavLink></h1>
                <h3 style={{marginLeft: "auto"}}>Welcome {user.UserName}</h3>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				</nav>
            
            <form onSubmit={handleSubmit} className="mt-4">
            <div className="row">
            <label for="exampleInputEmail1">Name</label>
                    <div >
                        
                        <input className={styles.input} type="text" value={inpval.name} onChange={setdata} name="name" />
                    </div>
                    <label for="exampleInputPassword1" >Email</label>
                    <div> 
                        
                        <input className={styles.input} type="email" value={inpval.email} onChange={setdata} name="email"  />
                    </div>
                    <label for="exampleInputEmail1" class="form-label">MobileNo</label>
                    <div >
                        
                        <input className={styles.input} type="number" value={inpval.mobileNo} onChange={setdata} name="mobileNo"  />
                    </div>
                    <label for="exampleInputPassword1" class="form-label">designation</label>
                    <div >
                        
                        <select className={styles.input} value={inpval.designation} onChange={setdata} name="designation" >
                           <option value="HR">HR</option>
                           <option value="Manager">Manager</option>
                           <option value="Sales">Sales</option>
                        </select>
                        </div>
                        <label for="exampleInputEmail1" >Gender</label>
                        <div className={styles.input}>
                        
                        <input type="radio" value="M" checked={inpval.gender === "M"} onChange={setdata} name="gender" />
                        <label  htmlFor="regular">M</label>
                        <input type="radio" value="F" checked={inpval.gender === "F"} onChange={setdata} name="gender"  />
                        <label  htmlFor="regular">F</label>
                    </div>
                    <label for="exampleInputEmail1" >course</label>
                    <div className={styles.input}>
                        
                        <input type="checkbox" value="MCA"  onChange={setdata} name="course"  />
                        <label  htmlFor="regular">MCA</label>
                        <input type="checkbox" value="BCA"  onChange={setdata} name="course"  />
                        <label  htmlFor="regular">BCA</label>
                    </div>
                    <label for="exampleInputPassword1" >Create-Date</label>
                    <div>
                        
                     <input className={styles.input} value={inpval.createdate}  onChange={setdata} name="createdate"  />
                    </div>
                    <label for="exampleInputEmail1" >image</label>
                    <div className={styles.input}>
                        
                        <input type="file" onChange={setimage} name="image" />
                    </div>

                    <button type="submit" className={styles.btn}>Update</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;