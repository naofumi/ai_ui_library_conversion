import React from "react"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import ListSubheader from "@mui/material/ListSubheader"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export default function MUIDropdownMenuDemo() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button id="mui-menu-button" aria-controls={open ? "mui-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} variant="outlined" onClick={handleOpen}>
        Open menu
      </Button>
      <Menu id="mui-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ "aria-labelledby": "mui-menu-button" }}>
        <ListSubheader disableSticky>My Account</ListSubheader>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Billing</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Log out</MenuItem>
      </Menu>
    </>
  )
}
