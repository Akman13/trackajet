import { Button, Drawer } from "@mantine/core"
import { useEffect, useState } from "react"

import { useDisclosure } from "@mantine/hooks"

import { LeftHandleBar } from "../../../components/leftHandleBar/leftHandleBar"
import { ProgressBar } from "./progressBar/progressBar"

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

        setYScaleFactor(0.5 * window.innerHeight / 785)


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    const innerStyles = {
        'position': 'relative',
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
        'position': 'absolute',
        'top': '0px',
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '100%',
        'height': '100%'
    }

    const bodyStyle = {
        'height': '100%',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'padding': '1.3em',
        'font-size': '0.9em',
        'font-family': '"JetBrains Mono", monospace',
    }

    const progressBarContainerStyle = {
        'margin':'1.2em 0'
    }

    const flightDetailsStyle = {
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'space-around',
        'line-height': '1.5em'
    }

    const depArrStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
    }



    // TODO:
    // Connect all the values to the real values
    // Add a refresh button to update the values on the pane ONLY (refresh top right?)
    // While being refreshed, display a loading icon/deactivate the pane

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
                    <Drawer.Body style={bodyStyle}>

                        <section style={{'width':'90%'}}>
                            <h2>Flight EY101</h2>
                            <h3>Etihad Airways</h3>

                            <div className="flight-details" style={flightDetailsStyle}>
                                <article className="dep-arr" style={depArrStyle}>
                                    <div className="departure">
                                        <h3>Departure</h3>
                                        <p>JFK Airport</p>
                                        <p>7hr 36min ago</p>
                                    </div>
                                    <div className="arrival" style={{'margin-right':'-20px'}}>
                                        <h3>Arrival</h3>
                                        <p>MEL Airport</p>
                                        <p>2hr 14min left</p>
                                    </div>
                                </article>

                                <div className="progress-bar" style={progressBarContainerStyle}>
                                    <ProgressBar value={50}/>
                                </div>

                                <div className="misc-info">
                                    <p>30min estimated delay</p>
                                    <p>Last signal: 2:04PM AEST</p>
                                </div>
                            </div>
                        </section>
                    </Drawer.Body>

                    {opened &&
                        <div style={handleOpenParentStyle}>

                            <div style={handleOpenStyle}>
                                <LeftHandleBar yScaleFactor={yScaleFactor} close={close} opened={opened} />
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