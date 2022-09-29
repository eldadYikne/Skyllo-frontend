import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { boardService } from '../services/board.new.service';
import { useState } from 'react';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
// import * as faker from '@faker-js/faker';

export function Chart() {
    const params = useParams()
    const [labelsBoardTitle, setlabelsBoardTitle] = useState()
    const [labelsBoardColors, setlabelsBoardColors] = useState()
    const [labelsBoardTimeRemember, setLabelsBoardTimeRemember] = useState()
    useEffect(() => {
        getLabels()
    }, [])
    const getLabels = async () => {
        try {
            const board = await boardService.getById(params.boardId)
            const validLabelIds = board.groups.map(group => {
                return group.tasks.map(task => task.labelIds)
            })

            let labelsIdsList = []
            validLabelIds.forEach(labels => {
                labels.forEach(label => {
                    label.forEach(labelId => labelsIdsList.push(labelId))
                })
            })

            console.log(labelsIdsList);
            let TimeLabelsCall = {}
            for (var i = 0; i < labelsIdsList.length; i++) {
                var currWord = labelsIdsList[i]
                var count = TimeLabelsCall[currWord]
                TimeLabelsCall[currWord] = count ? count + 1 : 1
            }
            const validIdsLabels = [...new Set(labelsIdsList)]
            console.log('validIdsLabels', validIdsLabels)
            console.log(TimeLabelsCall);
            let labelObjInBoard = []
            validIdsLabels.forEach(labelId => {
                let labelObj = boardService.getLabelsById(board, labelId)
                labelObjInBoard.push(labelObj)
            })
            console.log('labelObjInBoard', labelObjInBoard)
            const labelsTitels = labelObjInBoard.map(label => label.title)
            const labelsColors = labelObjInBoard.map(label => label.color)
            console.log(labelsTitels);
            setlabelsBoardTitle(labelsTitels)
            setlabelsBoardColors(labelsColors)
            setLabelsBoardTimeRemember(Object.values(TimeLabelsCall))

        } catch (err) {
            console.log(err);
        }
    }
    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );


    const dataDoughnut = {
        labels: labelsBoardTitle,
        datasets: [
            {
                label: '# of Votes',
                data: labelsBoardTimeRemember,
                backgroundColor: labelsBoardColors,
                borderColor: labelsBoardColors,
                borderWidth: 1,
            },
        ],
    }
    
    // const optionsBar = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'top' ,
    //         },
    //         title: {
    //             display: true,
    //             text: 'Chart.js Bar Chart',
    //         },
    //     },
    // };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    // const dataBar = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };


    return <div>
        <Doughnut data={dataDoughnut} />
        {/* <Bar options={optionsBar} data={dataBar} />; */}
    </div>


}




