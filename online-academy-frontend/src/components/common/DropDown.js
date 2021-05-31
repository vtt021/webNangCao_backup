import React, { useState } from 'react'
import { Dropdown, FormControl, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DropDown(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <Dropdown
      onMouseLeave={() => setShowDropdown(false)}
      onMouseOver={() => setShowDropdown(true)}
      style={{ width: '166px' }}
    >
      <Dropdown.Toggle
        className="main-style"
        id="dropdown-basic"
      >
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu show={showDropdown}>
        <Dropdown.Item href="#/action-1">
          Action
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          Another action
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          Something else
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    )
}