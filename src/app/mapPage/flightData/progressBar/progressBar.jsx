import { Progress } from '@mantine/core';

function ProgressBar( { value } ) {
    return <Progress size="xl" value={value} animate/>;
}

export { ProgressBar }