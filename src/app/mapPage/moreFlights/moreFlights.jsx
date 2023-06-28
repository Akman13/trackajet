import { Popover, Button } from '@mantine/core';

import { useState } from 'react';

import { SearchBar } from '../../sharedComponents/searchBar/searchBar';

function MoreFlights({ setTrackedFlight }) {

    const [opened, setOpened] = useState(false);

    const buttonStyle = {
        'position': 'absolute',
        'top': '5px',
        'transition': 'top ease 0.6s',
        '@media (min-width: 768px)': {
            '&:hover': {
                'top': '15px',
            }
        },
    }



    return (
        <Popover opened={opened} shadow='md'>
            <Popover.Target>
                <Button sx={buttonStyle} onClick={() => setOpened((o) => !o)}>Track A Jet!</Button>
            </Popover.Target>

            <Popover.Dropdown>
                <SearchBar setTrackedFlight={setTrackedFlight} />
            </Popover.Dropdown>
        </Popover>
    )
}

export { MoreFlights }