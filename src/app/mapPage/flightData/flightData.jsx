import { Button, Drawer } from "@mantine/core"
import { useEffect, useState } from "react"

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
    'width': '24px',
    'height': 'min-content',
    'position': 'absolute',
    'left': '0px',
    'top': '50%',
    'transform': 'translate(-0%, -50%)',
    'cursor': 'pointer',
    'overflow': 'visible'
}

// Want to scale the handlebar down, mainly by the height, and set the width to be auto

// 1: Make the child component render itself according to the screen size, and have the parent component resize itself down as needed 

function FlightData() {

    const [open, setOpen] = useState(false)

    // TODO:
    // Stick the handle bar to the overlay menu

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