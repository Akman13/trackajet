import { Button, Drawer } from "@mantine/core"
import { useEffect, useState } from "react"

import { LeftHandleBar } from "../../../components/leftHandleBar/leftHandleBar"

// const expandArrowSx = {
//     'background-color': 'transparent',
//     'width': '0',
//     'height': '0',
//     'border-top': '20px solid transparent',
//     'border-bottom': '20px solid transparent',
//     'border-left': '10px solid #e8e8e8',
//     'border-right': '0px solid transparent',
//     'position': 'absolute',
//     'left': '5px',
//     'top': '50%',
//     'transform': 'translate(-0%, -50%)',
//     'padding': '0',
//     'box-shadow': '4px 0px 4px rgba(0, 0, 0, 0.15)',
//     '&:active, &:hover': {
//         'transform': 'none',
//         'background-color': 'transparent'
//     }
// }



const handleContainerStyle = {
    'width': '24px',
    'height': 'auto',
    // 'max-height': 'fit-content',
    'position': 'absolute',
    'left': '0px',
    'top': '50%',
    'transform': 'translate(-0%, -50%)',
    'cursor': 'pointer',
    // 'overflow': 'visible'
}

function FlightData() {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const [yScaleFactor, setYScaleFactor] = useState(null)

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        setYScaleFactor(0.62 * window.innerHeight / 785)


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    const innerStyles = {
        'height': `${746 * yScaleFactor / 0.78}px`,
    }


    const [open, setOpen] = useState(false)

    // TODO:
    // Set the height of the Drawer to be equal to that of the handle
    // handleHeight = 746*yScaleFactor / 0.79
    // Stick the handle bar to the overlay menu

    return (
        <>
            <Drawer
                styles={{content: innerStyles}}
                position="left"
                opened={open}
                onClose={() => setOpen(false)}
                withOverlay={false}
                closeOnClickOutside={false}
                >
            </Drawer>

            <div style={handleContainerStyle} onClick={() => setOpen(!open)}>
                <LeftHandleBar yScaleFactor={yScaleFactor} />
            </div>

        </>
    )
}

export { FlightData }