import React, { useEffect, useState } from 'react';
import Chart from './Chart';

const InsightsPage = () => {
    return (
        <div className="main-content">
            <div className="graphics-content">
                <Chart />
            </div>
        </div>
    );
};

export default InsightsPage;
