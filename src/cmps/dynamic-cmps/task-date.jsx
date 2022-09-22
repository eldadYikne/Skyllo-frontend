import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
// import dateFormat from 'dateformat';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { saveTask } from '../../store/board.actions';
import { useDispatch } from 'react-redux';
import { utilService } from '../../services/util.service';

export function TaskDate({ board, group, task, setDynamicType }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const dispatch = useDispatch()

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const onSetDate = (ev) => {
    ev.preventDefault()
    const newDueDate = {
      date : Date.parse(selectedDate),
      dateToDisplay: utilService.getDateToDisplay( Date.parse(selectedDate) ),
      isDone: false
    }
    task.dueDate = newDueDate
    const newTask = {...task, dueDate: newDueDate}
    dispatch(saveTask( board.id, group.id, newTask ))
    setDynamicType('')
  }

  const onRemoveDate = (ev) => {
    ev.preventDefault()
    task.dueDate = null
    dispatch(saveTask( board.id, group.id, task ))
    setDynamicType('')
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={selectedDate} 
      onChange={(date) =>handleDateChange(date)}
       variant="static"
       disableToolbar
      //  disablePast={true}
      />
      <button className='set-date-btn' onClick={ (ev) => onSetDate(ev) }>Save</button>
      <button className='remove-date-btn' onClick={ (ev) => onRemoveDate(ev) }>Remove</button>

    </MuiPickersUtilsProvider>
  )
}