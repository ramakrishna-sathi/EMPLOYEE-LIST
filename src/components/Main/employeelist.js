import React, { useState, useEffect } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";


const Main = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    const history = useNavigate("");
	const handleLogout = () => {
        
		localStorage.removeItem("token");
		history("/login")
	};
	const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    const [searchVal, setSearchVal] = useState('');
    const handleInput = (e) => {
      setSearchVal(e.target.value);
    }
    const search_parameters = Object.keys(Object.assign({}, ...getuserdata));
    console.log(search_parameters)
    function search(getuserdata) {
        return getuserdata.filter((getuserdata) =>
          search_parameters.some((parameter) =>
            getuserdata[parameter].toString().includes(searchVal)
          )
        );
      }
    const getdata = async () => {

        const res = await fetch("http://localhost:5000/getdata", {
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
    },[])

	return (

		<div className={styles.main_container}>
			<nav className={styles.navbar}>
            <h1><NavLink to="/" style={{ textDecoration: 'none'}}>Home</NavLink></h1>
                <h3 style={{marginLeft: "auto"}}>Welcome {user.UserName}</h3>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				</nav>

            <div>
                <div className="container">
                    <div style={{width:"100%", display:"inline"}}>
                    <span style={{paddingRight:"20px", marginLeft:"50px"}}>Total count : {getuserdata.length}</span>
                    <span className={styles.button}>
                        <NavLink style={{ textDecoration: 'none'}} to="/register">Add Employee</NavLink>
                    </span>
                    
                    <input style={{width:"40%", height:"30px",paddingLeft:"50px", marginLeft:"250PX"}}
          onChange={handleInput}
          value={searchVal}
          type="search" 
          name="product-search" 
          id="product-search" 
          placeholder="Search Employees"
        />
        </div>
                    <table className="table" style={{width:"100%",marginTop:"40px",textAlign: "center"}}>
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Unique id</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">email</th>
                                <th scope="col">Mobile no</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Course</th>
                                <th scope="col"> Create Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                search(getuserdata).map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td><img src={`http://localhost:5000/`+ element.image} style={{height:50, width:50}}/></td>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.mobileNo}</td>
                                                <td>{element.designation}</td>
                                                <td>{element.gender}</td>
                                                <td>{element.course}</td>
                                                <td>{element.createdate}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>		
		
		</div>
	);
};

export default Main;
