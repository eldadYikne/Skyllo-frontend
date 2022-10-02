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
    const [groupTitle, setGroupTitle] = useState()
    const [groupCountTasks, setGroupCountTasks] = useState()

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {

        try {
            const groupTitle = []
            const groupCountTasks = []
            const board = await boardService.getById(params.boardId)
            console.log(board);
            board.groups.forEach(group => {
                groupTitle.push(group.title)
                groupCountTasks.push(group.tasks.length)
            })
            console.log('groupsTasks', groupTitle)
            setGroupTitle(groupTitle)
            setGroupCountTasks(groupCountTasks)


        } catch (err) {
            console.log(err);
        }
    }
    console.log('tasksInGroups', groupTitle)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 0,

                    }
                },
            },
            title: {
                display: true,
                text: 'Tasks in group',
                color: "white"

            },
        },
        scales: {
            y: {
                ticks: {
                    color: "white", 
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white",  
                    beginAtZero: true
                }
            }
        }



    };

    const labels = groupTitle

    const data = {
        labels,

        datasets: [
            {
                data: groupCountTasks,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },


        ],
    };

    return <Line options={options} data={data} />;
}
