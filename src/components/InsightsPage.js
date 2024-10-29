import React, { useEffect, useState } from 'react';
import Chart from './Chart';

/**
 * InsightsPage component that displays the main content for the insights page, including task analytics charts.
 * @component
 * @returns {JSX.Element} The rendered insights page component.
 */
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
