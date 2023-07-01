import { useEffect, useState } from "react"

function LeftHandleBar() {

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

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


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])


    // TODO: 
    // Insert an arrow tip in the triangle
    // Rotate this module as it is clicked

    return (
        <svg transform={`scale(1,${0.62*screenSize['height']/785})`} viewBox="0 0 19 746"> 
        {/* Viewbox: last two viewBox dimensions control the x/y-zoom of the svg. The x-zoom is intentionally larger than the max-x value of the polyline to display the shadow on the right edge. */}
        {/* Scale: scaling the svg to stretch/shrink the height whilst the width is constant */}
            <filter id="dropshadow" height="130%" width="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" /> {/* <!-- stdDeviation is how much to blur --> */}
                <feOffset dx="1.5" dy="2" result="offsetblur" /> {/* <!-- how much to offset --> */}
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.9" />  {/* <!-- slope is the opacity of the shadow --> */}
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />  {/* <!-- this contains the offset blurred image --> */}
                    <feMergeNode in="SourceGraphic" />  {/* <!-- this contains the element that the filter is applied to --> */}
                </feMerge>
            </filter>
            <polyline fill="#f2f2f2"
                points="0,0 8,16 8,344 14,352 14,364 14,376 8,384 8,728 0,746 0,0"
                style={{ 'filter': 'url(#dropshadow)' }}
            />
        </svg>
    )
}


export { LeftHandleBar }