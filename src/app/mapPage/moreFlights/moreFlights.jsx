import { Popover, Text, Button } from '@mantine/core';
import { useState } from 'react';
import './moreFlights.css'

import { SearchBar } from '../../sharedComponents/searchBar/searchBar';


function MoreFlights( {setTrackedFlight} ) {

    const [opened, setOpened] = useState(false);


    return (
        <div className="more-flights">
            <Popover opened={opened} classNames={{ dropdown: 'drop-down' }} shadow='md'>
                <Popover.Target>
                    <Button onClick={() => setOpened((o) => !o)}>Track A Jet!</Button>
                </Popover.Target>

                <Popover.Dropdown>
                    <SearchBar setTrackedFlight={setTrackedFlight} />
                </Popover.Dropdown>
            </Popover>
        </div>
    )
}

export { MoreFlights }