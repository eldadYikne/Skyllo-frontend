import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { boardService } from '../services/board.new.service';
import { useState } from 'react';
import { useEffect } from 'react';
import { Diagram } from './chart-diagram';

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
    
  


    return <div className='charts-container'>
        <div className='doughnut-container'>
        <Doughnut data={dataDoughnut} /> 
        </div>
        <div className='diagram-container'>
        <Diagram />
        </div>
    </div>


}




