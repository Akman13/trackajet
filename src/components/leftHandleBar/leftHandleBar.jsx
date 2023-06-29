function LeftHandleBar() {


    return (
        <svg viewBox="0 0 19 746">
            <filter id="dropshadow" height="130%" width="200%" style={{ 'overflow': 'visible'}}>
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" /> {/* <!-- stdDeviation is how much to blur --> */}
                <feOffset dx="1.5" dy="2" result="offsetblur" style={{'overflow': 'visible'}} /> {/* <!-- how much to offset --> */}
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.9" />  {/* <!-- slope is the opacity of the shadow --> */}
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />  {/* <!-- this contains the offset blurred image --> */}
                    <feMergeNode in="SourceGraphic" />  {/* <!-- this contains the element that the filter is applied to --> */}
                </feMerge>
            </filter>
            <polyline fill="#f2f2f2"
                points="0,0 8,16 8,352 14,364 8,376 8,728 0,746 0,0"
                style={{ 'filter': 'url(#dropshadow)' }}
            />
        </svg>
    )
}


export { LeftHandleBar }