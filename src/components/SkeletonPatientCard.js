import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function SkeletonPatientCard() {

    return (
        <div>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <br />
            <br />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="rect" width={400} height={118} />
        </div>
    );
}

export default SkeletonPatientCard;