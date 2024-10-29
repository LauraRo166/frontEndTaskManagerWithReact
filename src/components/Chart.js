import React, { useEffect, useState, useRef } from 'react';
import { fetchTasks } from '../api/taskService';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import '../styles/insightsPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

/**
 * Chart component renders four different types of charts to display task analytics.
 * @component
 * @returns {JSX.Element} The rendered chart component.
 */
const Chart = () => {

    /**
     * State to store processed chart data including difficulty, time, priority, and total time.
     * @typedef {Object} ChartData
     * @property {number[]} difficultyData - Task counts for each difficulty level.
     * @property {number[]} timeData - Number of tasks completed within each hour range.
     * @property {number[]} priorityData - Average number of tasks for each priority level.
     * @property {number} totalTime - Sum of total hours spent on completed tasks.
     */
    const [chartData, setChartData] = useState({
        difficultyData: [0, 0, 0],
        timeData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        priorityData: [0, 0, 0, 0, 0],
        totalTime: 0,
    });

    const chartRef = useRef();

    useEffect(() => {

        /**
         * Fetches tasks and processes the data for chart rendering.
         * @async
         * @function loadChartData
         * @returns {Promise<void>}
         */
        async function loadChartData() {
            const tasks = await fetchTasks();
            setChartData(processChartData(tasks));
        }
        loadChartData();
    }, []);

    /**
     * Processes task data to generate chart datasets for different task metrics.
     * @function
     * @param {Array<Object>} tasks - Array of task objects.
     * @returns {ChartData} Processed data for chart rendering.
     */
    const processChartData = (tasks) => {
        const counts = { LOW: 0, MEDIUM: 0, HIGH: 0 };
        const timeData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const priorityData = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
        let totalTime = 0;

        tasks.forEach(task => {
            counts[task.difficultyLevel] = (counts[task.difficultyLevel] || 0) + 1;
            timeData[parseInt(task.averageDevelopmentTime) - 1]++;
            priorityData[task.priority]++;

            if (task.completed) {
                totalTime += parseFloat(task.averageDevelopmentTime);
            }
        });

        return {
            difficultyData: [counts.LOW, counts.MEDIUM, counts.HIGH],
            timeData,
            priorityData: Object.values(priorityData),
            totalTime,
        };
    };

    return (
        <>
            <div className="graphic-content">
                <h2>Histograma de Dificultad</h2>
                <Bar
                    data={{
                        labels: ['Bajo', 'Medio', 'Alto'],
                        datasets: [{
                            label: 'Nivel de Dificultad',
                            data: chartData.difficultyData,
                            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                        }]
                    }}
                />
            </div>
            <div className="graphic-content">
                <h2>Número de Tareas Finalizadas por Tiempo</h2>
                <Line
                    data={{
                        labels: ['1 hora', '2 horas', '3 horas', '4 horas', '5 horas', '6 horas', '7 horas', '8 horas', '9 horas', '10 horas'],
                        datasets: [{
                            label: 'Tareas Finalizadas',
                            data: chartData.timeData,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            fill: true,
                        }]
                    }}
                />
            </div>
            <div className="graphic-content">
                <h2>Promedios de Tareas por Prioridad</h2>
                <Bar
                    data={{
                        labels: ['Prioridad 1', 'Prioridad 2', 'Prioridad 3', 'Prioridad 4', 'Prioridad 5'],
                        datasets: [{
                            label: 'Promedio de Tareas',
                            data: chartData.priorityData,
                            backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                        }]
                    }}
                />
            </div>
            <div className="graphic-content">
                <h2>Tiempo Total Invertido por Tareas Realizadas</h2>
                <Bar
                    data={{
                        labels: ['Tiempo Total Invertido'],
                        datasets: [{
                            label: 'Horas Totales',
                            data: [chartData.totalTime],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        }]
                    }}
                />
            </div>
        </>
    );
};

export default Chart;
