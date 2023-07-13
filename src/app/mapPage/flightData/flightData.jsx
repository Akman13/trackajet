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
        'height': `${746 * yScaleFactor / 0.79}px`,
        'margin': 'auto 0',
        'overflow': 'visible',
        'max-width': '80%',
        'background-color': 'rgb(242, 242, 242)'
    }

    const handleClosedStyle = {
        'width': '24px',
        'height': `${746 * yScaleFactor / 0.79}px`,
        'position': 'absolute',
        'left': '0px',
        'top': '50%',
        'transform': 'translate(-0%, -50%)',
        'display': 'flex',
        'align-items': 'center'
    }

    const handleOpenStyle = {
        'width': '24px',
        'height': '100%',
        'float': 'right',
        'margin-right': '-24px',
        'display': 'flex',
        'align-items': 'center',
        'box-sizing': 'content-box'
    }

    const handleOpenParentStyle = {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '100%',
        'height': '100%'
    }

    // TODO:

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
                    {opened &&
                        <div style={handleOpenParentStyle}>
                            <div style={handleOpenStyle}>
                                <LeftHandleBar yScaleFactor={yScaleFactor} close={close} />
                            </div>
                        </div>}
                    <Drawer.Body style={{ 'padding': '0px' }}>
                    </Drawer.Body>
                </Drawer.Content>

            </Drawer.Root>

            {!opened && <div style={handleClosedStyle}>
                <LeftHandleBar yScaleFactor={yScaleFactor} open={open} />
            </div>}

        </>
    )
}

export { FlightData }