import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import styles from "./styles.module.css";
const Register = () => {

    const history = useNavigate();
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
    const setimage = (e) => {
        setINP({...inpval, image: e.target.files[0]});
    }


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
        axios.post('http://localhost:5000/register', formData)
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
        <div>
            <nav className={styles.navbar}>
            <h1><NavLink to="/" style={{ textDecoration: 'none'}}>Home</NavLink></h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				</nav>
            <form onSubmit={handleSubmit}>
                <div className="row">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                    <div>
                
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className={styles.input} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <label for="exampleInputPassword1" class="form-label">Email</label>
                    <div>
                        
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className={styles.input} id="exampleInputPassword1" />
                    </div>
                    <label for="exampleInputEmail1" class="form-label">MobileNo</label>
                    <div >
                        
                        <input type="number" value={inpval.mobileNo} onChange={setdata} name="mobileNo" className={styles.input} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <label for="exampleInputPassword1" class="form-label">Designation</label>
                    <div>

                        <select value={inpval.designation} onChange={setdata} name="designation" className={styles.input} id="exampleInputPassword1">
                           <option value="HR">HR</option>
                           <option value="Manager">Manager</option>
                           <option value="Sales">Sales</option>
                        </select>
                        </div>
                        <label for="exampleInputEmail1" class="form-label">Gender</label>
                        <div className={styles.input}>
                        
                        <input type="radio" value="M" checked={inpval.gender === "M"} onChange={setdata} name="gender"  id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <label class="form-label" htmlFor="regular">M</label>
                        <input type="radio" value="F" checked={inpval.gender === "F"} onChange={setdata} name="gender"  id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <label class="form-label" htmlFor="regular">F</label>
                    </div>
                    <label for="exampleInputEmail1" class="form-label">Course</label>
                    <div className={styles.input}>
        
                        <input type="checkbox" value="MCA"  onChange={setdata} name="course"  id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <label class="form-label" htmlFor="regular">MCA</label>
                        <input type="checkbox" value="BCA"  onChange={setdata} name="course"  id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <label class="form-label" htmlFor="regular">BCA</label>
                    </div>
                    <label for="exampleInputPassword1" class="form-label">Create-Date</label>
                    <div >
                        
                     <input value={inpval.createdate}  onChange={setdata} name="createdate" className={styles.input}  />
                    </div>
                    <label for="exampleInputEmail1" class="form-label">Image</label>
                    <div >
                        
                        <input type="file" accept=".png, .jpg, .jpeg" onChange={setimage} name="image" className="styles.input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    
                    
                    
                

                    <button type="submit" className={styles.btn}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;