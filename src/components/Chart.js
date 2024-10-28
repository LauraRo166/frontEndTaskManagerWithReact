import React, { useEffect, useState, useRef } from 'react';
import { fetchTasks } from '../api/taskService';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import '../styles/insightsPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const Chart = () => {
    const [chartData, setChartData] = useState({
        difficultyData: [0, 0, 0],
        timeData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        priorityData: [0, 0, 0, 0, 0],
        totalTime: 0,
    });

    const chartRef = useRef();

    useEffect(() => {
        async function loadChartData() {
            const tasks = await fetchTasks();
            setChartData(processChartData(tasks));
        }
        loadChartData();
    }, []);

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
                            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Colores para las barras
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
                            borderColor: 'rgba(54, 162, 235, 1)', // Color de la línea
                            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo debajo de la línea
                            fill: true, // Llenar el área debajo de la línea
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
                            backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'], // Colores para las barras
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
                            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color para la barra
                        }]
                    }}
                />
            </div>
        </>
    );
};

export default Chart;
