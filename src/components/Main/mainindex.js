import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./styles.module.css";

const Main = () => {
    const user = JSON.parse(localStorage.getItem("token"));
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	
return (

		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Home</h1>
                <div className={styles.white_btn}><p style={{marginTop:"12px"}}><NavLink style={{ textDecoration: 'none'}} to="/employeelist">Employee list</NavLink></p></div>
                <h3 style={{marginLeft: "auto"}}>Welcome {user.UserName}</h3>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				</nav>

            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <h2 style={{textAlign:"center", marginTop:"250px"}}>Welcome to Admin Panel</h2>
                    </div>



                </div>
            </div>		
		
		</div>
	);
};

export default Main;
