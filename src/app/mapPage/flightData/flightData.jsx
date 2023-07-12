import { Button, Drawer } from "@mantine/core"
import { useEffect, useState } from "react"

import { LeftHandleBar } from "../../../components/leftHandleBar/leftHandleBar"
import { useDisclosure } from "@mantine/hooks"

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





function FlightData() {
    const [opened, { open, close }] = useDisclosure(false)
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
        'margin': 'auto 0',

    }

    const handleClosedContainerStyle = {
        // 'border': '1px solid green',
        'width': '24px',
        'height': `${746 * yScaleFactor / 0.79}px`,
        'position': 'absolute',
        'left': '0px',
        'top': '50%',
        'transform': 'translate(-0%, -50%)',
        'cursor': 'pointer',
    }

    const handleOpenContainerStyle = {
        // 'border': '1px solid green',
        'width': '24px',
        'height': `${746 * yScaleFactor / 0.79}px`,
        'position': 'fixed',
        'float': 'right',
        'right': '-24px',
        'top': '50%',
        'transform': 'translate(-0%, -50%)',
        'cursor': 'pointer',
    }

    // const drawerContentParentStyle = {
    //     // 'height': '100%',
    //     // 'width': 'fit-content',
    //     'height': `${746 * yScaleFactor / 0.79}px`,
    //     'position': 'fixed',
    //     'left': '0px',
    //     // 'right': '0px',
    //     'margin': 'auto 0',
    //     'top': '0px',
    //     'bottom': '0px',
    //     'display': 'flex',
    // }


    // TODO:
    // Resolve the misalignment between the svg and the parent div
    // Set the height of the Drawer to be equal to that of the handle

    return (
        <>
            <Drawer.Root
                position="left"
                opened={opened}
                onClose={close}
                withOverlay={false}
                closeOnClickOutside={false}
                withCloseButton={true}
            >

                <Drawer.Content style={innerStyles}>
                        {opened && <div style={handleOpenContainerStyle} onClick={close}>
                            <LeftHandleBar yScaleFactor={yScaleFactor} />
                        </div>}
                    <Drawer.Body style={{'padding':'0px', 'width': 'min-content'}}>
                    </Drawer.Body>
                </Drawer.Content>

            </Drawer.Root>

            {!opened && <div style={handleClosedContainerStyle} onClick={open}>
                <LeftHandleBar yScaleFactor={yScaleFactor} />
            </div>}

        </>
    )
}

export { FlightData }