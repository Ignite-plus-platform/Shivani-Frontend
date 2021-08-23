import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import StyledMenu from '@material-ui/core/Menu';
import StyledMenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Logout from './Pages/Logout';

const NavMenuStyles = styled.div`
  display: flex;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 1rem 0;
  background-color: rgb(204, 0, 0);
  color: white;

  .container {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    height: 55px;
    width: 7.2rem;
    background-color: white;
    color: rgb(204, 0, 0);
    text-decoration: overline;
    font-size: 1rem;
  }
  .Welcome {
    font-size: 1.2rem;
  }
  .Profile{
    margin-right:1rem;
  }
  .color1{
    color: black;
    background-color: lightgrey;
  }
  ul {
    list-style-type: none;
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
    text-align: left;
    li {
      display: inline-block;
      border-radius: 9px;
      transition: 0.3s ease backgroung-color;
      /*&:hover{
              background-color:;
          }*/
      a {
        display: inline-block;
        font-family: Georgia;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        outline: none;
        text-decoration: none;
        color: white;
      }
      /*.active{
          background-color:black;
      }*/
    }
  }
`;
function NavMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <NavMenuStyles>
      <div className="container">
        <h2>MENTOS</h2>
      </div>
      <ul>
        <li>
          <NavLink to="/" exact> Home </NavLink>
        </li>

        <li>
          <NavLink to="/schedule"> Schedule </NavLink>
        </li>

        <li>
          <NavLink to="/learningplan"> Learning Plan </NavLink>
        </li>

        <li>
          <NavLink to="/newsLetter"> NewsLetter </NavLink>
        </li>

        <li>
          <NavLink to="/about"> About </NavLink>
        </li>
      </ul>
      <div className="Welcome">
        Welcome {localStorage.getItem("displayname")}
      </div>
      <div className="Profile">
        <Button 
          aria-controls="customized-menu"
          aria-haspopup="true"
          color="primary"
          onClick={handleClick}>
            <Avatar className="color1"><b>S</b></Avatar>
        </Button>
        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <StyledMenuItem>
          
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Logout" onClick={<Logout/>} />
        </StyledMenuItem>
        
      </StyledMenu>
      </div>
    </NavMenuStyles>
  );
}
export default NavMenu;
