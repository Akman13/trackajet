import { useEffect, useState } from "react"

import { Button, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { BsInfoCircle } from "react-icons/bs"

import { FlightDataContent } from "./flightDataContent/flightDataContent"
import { LeftHandleBar } from "../../../uiComponents/leftHandleBar/leftHandleBar"

import './flightData.css'

function FlightData({ trackedFlight, setTrackedFlight }) {

    const [overlayOpened, { open: openOverlay, close: closeOverlay }] = useDisclosure(false)
    const [moreInfoShown, { close: closeMoreInfoShown }] = useDisclosure(true)
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

        setYScaleFactor(0.5 * window.innerHeight / 785)


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    const handleInfoClick = () => {
        openOverlay()
    }

    const innerStyles = {
        'position': 'relative',
        'height': `${746 * yScaleFactor / 0.79}px`,
        'margin': 'auto 0',
        'overflow': 'visible',
        'max-width': '80%',
        'background-color': 'rgb(242, 242, 242)'
    }

    const bodyStyle = {
        'height': '100%',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-size': '0.9em',
        'font-family': '"JetBrains Mono", monospace',
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
        'z-index': '-100',
        'position': 'absolute',
        'top': '0px',
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '100%',
        'height': '100%'
    }

    return (
        <>
            <Drawer.Root
                position="left"
                opened={overlayOpened}
                onClose={closeOverlay}
                withOverlay={false}
                closeOnClickOutside={false}
                withCloseButton={true}
            >

                <Drawer.Content style={innerStyles}>
                    <Drawer.Body style={bodyStyle}>
                        <FlightDataContent trackedFlight={trackedFlight} setTrackedFlight={setTrackedFlight} />
                    </Drawer.Body>

                    {overlayOpened &&
                        <div style={handleOpenParentStyle}>

                            <div style={handleOpenStyle}>
                                <LeftHandleBar yScaleFactor={yScaleFactor} close={closeOverlay} opened={overlayOpened} />
                            </div>
                        </div>}
                    <Drawer.Body style={{ 'padding': '0px' }}>
                    </Drawer.Body>
                </Drawer.Content>

            </Drawer.Root>

            {(moreInfoShown && !overlayOpened) &&
                <div>
                    <Button variant="white" id="more-info" onClick={closeMoreInfoShown}>
                        <BsInfoCircle onClick={handleInfoClick} size={"30px"} />
                    </Button>
                </div>
            }

            {!overlayOpened && <div style={handleClosedStyle}>
                <LeftHandleBar yScaleFactor={yScaleFactor} open={openOverlay} />
            </div>}


        </>
    )
}

export { FlightData }