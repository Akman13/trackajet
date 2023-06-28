import { Button, Drawer } from "@mantine/core"
import { useState } from "react"

const flightDataSx = {
    'position': 'absolute',
    'left': '0px',
    'top': '50%',
    'transform': 'translate(-0%, 0%)',
    '&:active': {
        'transform': 'none'
    }
}

const expandArrowSx = {
    'background-color':'transparent',
    'width': '0',
    'height': '0',
    'border-top': '10px solid transparent',
    'border-bottom': '10px solid transparent',
    'border-left': '10px solid black',
    'border-right': '0px solid transparent',
    'position': 'absolute',
    'left': '5px',
    'top': '50%',
    'transform': 'translate(-0%, 0%)',
    'padding': '0',
    '&:active, &:hover': {
        'transform': 'none',
        'background-color': 'transparent'
    }
}

function FlightData() {

    const [open, setOpen] = useState(false)

    // Make the button be the triangle icon

    // Change the triangle icon to be a wider shape, like a triangle imposed on a rectangle

    return (
        <>
            <Drawer opened={open} onClose={() => setOpen(false)} withOverlay={false} closeOnClickOutside={false}>

            </Drawer>

            <Button variant="default" sx={expandArrowSx} onClick={() => setOpen(true)}>
            </Button>

        </>
    )
}

export { FlightData }