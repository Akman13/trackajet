function LeftHandleBar({ open, close, opened, yScaleFactor }) {

    const svgStyle = {
        'transform': `scale(1,${yScaleFactor})`,
    }

    const polylineStyle = {
        'filter': 'url(#dropshadow)',
        'cursor': 'pointer'
    }

    return (
        <svg
            viewBox="0 0 19 746"
            style={svgStyle}
            onClick={open || close}>
            {/* Viewbox: last two viewBox dimensions control the x/y-zoom of the svg. The x-zoom is intentionally larger than the max-x value of the polyline to display the shadow on the right edge. */}
            {/* Scale: scaling the svg to stretch/shrink the height whilst the width is constant */}
            <filter id="dropshadow" height="130%" width="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" /> {/* <!-- stdDeviation is how much to blur --> */}
                <feOffset dx="0.9" dy="2" result="offsetblur" /> {/* <!-- how much to offset --> */}
                <feComponentTransfer>
                    <feFuncA type="linear" slope="1.3" />  {/* <!-- slope is the opacity of the shadow --> */}
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />  {/* <!-- this contains the offset blurred image --> */}
                    <feMergeNode in="SourceGraphic" />  {/* <!-- this contains the element that the filter is applied to --> */}
                </feMerge>
            </filter>
            <polyline fill='#f2f2f2'
                points="0,0 8,16 8,344 14,352 14,364 14,376 8,384 8,728 0,746 0,0"
                style={polylineStyle}
            />
            {!opened &&
                <polyline stroke='#000000' fill="none"
                    points="6,356 10,364 6,372"
                />
            }
            {opened &&
                <polyline stroke='#000000' fill="none"
                    points="10,356 6,364 10,372"
                />
            }
        </svg>
    )
}


export { LeftHandleBar }