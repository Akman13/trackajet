import { Button, Drawer } from "@mantine/core"
import { useState } from "react"

import { LeftHandleBar } from "../../../components/leftHandleBar/leftHandleBar"

const expandArrowSx = {
    'background-color': 'transparent',
    'width': '0',
    'height': '0',
    'border-top': '20px solid transparent',
    'border-bottom': '20px solid transparent',
    'border-left': '10px solid #e8e8e8',
    'border-right': '0px solid transparent',
    'position': 'absolute',
    'left': '5px',
    'top': '50%',
    'transform': 'translate(-0%, -50%)',
    'padding': '0',
    'box-shadow': '4px 0px 4px rgba(0, 0, 0, 0.15)',
    '&:active, &:hover': {
        'transform': 'none',
        'background-color': 'transparent'
    }
}

const handleContainerStyle = {
    'width': '20px',
    'height': 'auto',
    'position': 'absolute',
    'left': '0px',
    'top': '50%',
    'transform': 'translate(-0%, -50%)',
    'cursor':'pointer',
    'overflow': 'visible'
}


function FlightData() {

    const [open, setOpen] = useState(false)

    // Make an svg handle component in the components folder
    // Contains 

    // Make the button be the triangle icon

    // Change the triangle icon to be a wider shape, like a triangle imposed on a rectangle

    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} withOverlay={false} closeOnClickOutside={false}>
            </Drawer>

            <div style={handleContainerStyle} onClick={() => setOpen(!open)}>
                <LeftHandleBar />
            </div>

        </>
    )
}

export { FlightData }