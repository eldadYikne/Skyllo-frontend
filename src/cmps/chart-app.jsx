import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ReactComponent as CloseChart } from '../assets/img/close-chart.svg'
import { Link, useParams } from 'react-router-dom';
import { boardService } from '../services/board.new.service';
import { useState } from 'react';
import { useEffect } from 'react';
import { Diagram } from './chart-diagram';
import { useSelector } from 'react-redux';
import { LineChart } from './line-chart';
import { utilService } from '../services/util.service';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export function Chart() {
    const params = useParams()
    const board = useSelector(state => state.boardModule.board)
    const [labelsBoardTitle, setlabelsBoardTitle] = useState()
    const [labelsBoardColors, setlabelsBoardColors] = useState()
    const [labelsBoardTimeRemember, setLabelsBoardTimeRemember] = useState()
    useEffect(() => {

        getLabels()
    }, [])


    const getLabels = async () => {
        try {
            if (!board) return
            // const board = await boardService.getById(params.boardId)
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
            const labelsColors = labelObjInBoard.map(label => utilService.lightenDarkenColor(label.color, -10))
            console.log('labelsColors:', labelsColors)

            console.log(labelsTitels);
            setlabelsBoardTitle(labelsTitels)
            setlabelsBoardColors(labelsColors)
            setLabelsBoardTimeRemember(Object.values(TimeLabelsCall))

        } catch (err) {
            console.log(err);
        }
    }

    const getMemberBackground = (member) => {
        if (member.img) return `url(${member.img}) center center / cover`
        else return `https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover;`
    }

    const countTasks = () => {

        const sum = board.groups.reduce((acc, group) => {
            acc += group.tasks.length
            return acc
        }, 0)
        return sum

    }

    const countDoneTasks = () => {
        const sum = board.groups.reduce((acc, group) => {
            acc += group.tasks.reduce((accumolator, task) => {
                if (task.dueDate?.isDone) accumolator++
                return accumolator
            }, 0)
            return acc
        }, 0)
        return sum
    }

    const countLateTasks = () => {
        const today = Date.now()
        const sum = board.groups.reduce((acc, group) => {
            acc += group.tasks.reduce((accumolator, task) => {
                if (!task.dueDate?.isDone && task.dueDate?.date < today) accumolator++
                return accumolator
            }, 0)
            return acc
        }, 0)
        return sum
    }

    const countTodos = () => {
        const sum = board.groups.reduce((acc, group) => {
            acc += group.tasks.reduce((accumolator, task) => {
                if (task.checklists) {
                    accumolator += task.checklists.reduce((a, checklist) => {
                        if (checklist.todos) a += checklist.todos.length
                        return a
                    }, 0)
                }
                return accumolator
            }, 0)
            return acc
        }, 0)
        return sum
    }

    const countDoneTodos = () => {
        const sum = board.groups.reduce((acc, group) => {
            acc += group.tasks.reduce((accumolator, task) => {
                if (task.checklists) {
                    accumolator += task.checklists.reduce((a, checklist) => {
                        if (checklist.todos) {
                            a += checklist.todos.reduce((accu, todo) => {
                                if (todo.isDone) accu++
                                return accu
                            }, 0)
                        }
                        return a
                    }, 0)
                }
                return accumolator
            }, 0)
            return acc
        }, 0)
        return sum
    }

    const getDoneTodosRatio = () => {
        const todosCount = countTodos()
        const doneTodos = countDoneTodos()
        const res =  (doneTodos / todosCount)*100
        return res.toFixed(0)
    }

    const getDoneTasksRatio = () => {
        const tasksCount = countTasks()
        const tasksDone = countDoneTasks()
        const res = (tasksDone / tasksCount)*100
        return res.toFixed(0)
    }
    const countChecklists = () => {
        const sum = board.groups.reduce((acc, group) => {
            acc += group.tasks.reduce((accumolator, task) => {
                if (task.checklists) {
                    accumolator += task.checklists.length
                }
                return accumolator
            }, 0)
            return acc
        }, 0)
        return sum

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
    const optionsDoughnut = {
        plugins: {
            legend: {
                position: 'bottom',

                labels: {
                    color: 'white',
                    font: {
                        size: 14,

                    }
                }
            }
        }
    }


    const dataDoughnut = {

        labels: labelsBoardTitle,
        datasets: [{
            label: '# of Votes',
            data: labelsBoardTimeRemember,
            backgroundColor: labelsBoardColors,
            borderColor: '#ffffff',
            borderWidth: 3,
            fontColor: "red"

        },
        ],


    }

    return (
        <section className='chart-view'>
            <div className='charts-title'>

                <h1 className='chart-view-header'>{board.title}</h1>
                <p>Created by Yaara Yehuda</p>
            </div>
            {/* {board.createdBy.fullname ? <p>Created by {board.createdBy?.fullname}</p>: <p>Created by Guest</p>} */}
            <Link key={board._id} to={`/workspace/board/${board._id}`}>
                <div className='close-chart-modal'>
                    <CloseChart
                        className='close-chart-modal-icon'
                    />
                </div>
            </Link>

            <div className='charts-all-container'>
                <div className='charts-container'>

                    <div className='diagram-container'>
                        <Diagram labelsBoardColors={labelsBoardColors} />
                    </div>
                    <div className='data-precent-box'>

                        <div style={{ width: 150, height: 100,position:'relative'}}>
                            <span>Tasks are done</span>
                            <CircularProgressbar text={66 + '%'} styles={buildStyles({ textColor: '#f0f038', pathColor: ' #f0f038' })} value={66} />
                        </div>
                        <div style={{ width: 150, height: 100 ,position:'relative'}}>
                        <span>Todos are done</span>
                            <CircularProgressbar text={86 + '%'} styles={buildStyles({ textColor: '#24eb24', pathColor: '#24eb24' })} value={86} />
                        </div>
                    </div>
                </div>

                <section className='data-main-container'>
                    <div className='data-upper-container'>
                        <div className='data-box number-of-todos'>
                            <div className='data-box-content'>
                                <h1>{countTodos()}</h1>
                                <p>Todos</p>
                            </div>
                            <div className='extra-content-box'>
                                <p><span>{countDoneTodos()}</span> done</p>
                                <p><span className='checklists-count'>{countChecklists()}</span> checklists</p>
                            </div>
                        </div>
                        <div className='data-box number-of-tasks'>
                            <div className='data-box-content'>
                                <h1>{countTasks()}</h1>
                                <p>Tasks</p>
                            </div>
                            <div className='extra-content-box'>
                                <p><span>{countDoneTasks()}</span> done</p>
                                <p><span className='after-due'>{countLateTasks()}</span> after due</p>
                            </div>
                        </div>
                    </div>
                    <div className='data-box number-of-members'>
                        <div className='data-box-content'>
                            <h1>{board.members.length}</h1>
                            <p>Members</p>
                        </div>
                        <div className='image-container'>
                            {board.members &&
                                board.members.map(member => {
                                    return member?.img ? <div className='task-details-member-box' key={member?._id} style={{ background: getMemberBackground(member) }}></div> :
                                        <div key={member?._id} className='avatar-img-guest-member-box'></div>

                                })}
                        </div>

                    </div>

                    <div className='line-container'>
                        <LineChart />
                    </div>

                </section>

                <div className='doughnut-container'>
                    <Doughnut options={optionsDoughnut} data={dataDoughnut} />
                </div>

            </div>

        </section>

    )

}




