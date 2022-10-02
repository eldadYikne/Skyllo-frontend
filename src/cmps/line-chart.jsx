import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { boardService } from '../services/board.new.service';
import { useEffect } from 'react';
import { useState } from 'react';



export function LineChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const params = useParams()
    const [tasksInGroups, setTaskInGroups] = useState()
    
    useEffect(() => {
       getTasks()
    }, [])
    
    const getTasks = async () => {

        try {
            const groupCountTasks = {}
            const board = await boardService.getById(params.boardId)
            console.log(board);
            board.groups.forEach(group => {
                
                return groupCountTasks[group.title] = group.tasks.length

            })
            console.log('groupsTasks', groupCountTasks)
            setTaskInGroups(groupCountTasks)
            

        } catch (err) {
            console.log(err);
        }
    }
    console.log('tasksInGroups',tasksInGroups)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    // const labels =[Object.keys(tasksInGroups)]

    const data = {
        // labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: '',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },

        ],
    };

    return <Line options={options} data={data} />;
}
