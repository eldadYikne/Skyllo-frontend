import React, { useEffect } from 'react'
import { connect } from 'react-redux'


<<<<<<< HEAD
import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/car.actions.js'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { carService } from '../services/car.service.js'

function _CarApp({ loadCars, addCar, updateCar, removeCar, addToCart, cars }) {

    useEffect(() => {
        loadCars()
    }, [])

    const onRemoveCar = (carId) => {
        removeCar(carId)
    }
    const onAddCar = () => {
        const car = carService.getEmptyCar()
        car.vendor = prompt('Vendor?')        
        addCar(car)
    }
    const onUpdateCar = (car) => {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }
        updateCar(carToSave)
    }
    
    const onAddToCart = (car) => {
        console.log(`Adding ${car.vendor} to Cart`)
        addToCart(car)
        showSuccessMsg('Added to Cart')
=======
import { loadBoards, addBoard, updateBoard, removeBoard, addToBoardt } from '../store/board.actions.js'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.js'

function _BoardApp({ loadBoards, addBoard, updateBoard, removeBoard, addToBoardt, boards }) {

    useEffect(() => {
        loadBoards()
    }, [])

    const onRemoveBoard = (boardId) => {
        removeBoard(boardId)
    }
    const onAddBoard = () => {
        const board = boardService.getEmptyBoard()
        board.vendor = prompt('Vendor?')        
        addBoard(board)
    }
    const onUpdateBoard = (board) => {
        const price = +prompt('New price?')
        const boardToSave = { ...board, price }
        updateBoard(boardToSave)
    }
    
    const onAddToBoardt = (board) => {
        console.log(`Adding ${board.vendor} to Boardt`)
        addToBoardt(board)
        showSuccessMsg('Added to Boardt')
>>>>>>> a7e0c34c161c0f427f3d425f057e6d8946afd1ff
    }

    return (
        <div>
<<<<<<< HEAD
            <h3>Cars App</h3>
            <main>

                <button onClick={onAddCar}>Add Car ⛐</button>

                <ul className="car-list">

                    {cars.map(car =>
                        <li className="car-preview" key={car._id}>
                            <h4>{car.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${car.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                                <button onClick={() => { onUpdateCar(car) }}>Edit</button>
                            </div>

                            <button className="buy" onClick={() => { onAddToCart(car) }}>Add to Cart</button>
=======
            <h3>Boards App</h3>
            <main>

                <button onClick={onAddBoard}>Add board ⛐</button>

                <ul className="board-list">

                    {boards.map(board =>
                        <li className="board-preview" key={board._id}>
                            <h4>{board.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${board.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{board.owner && board.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div>

                            <button className="buy" onClick={() => { onAddToBoardt(board) }}>Add to Boardt</button>
>>>>>>> a7e0c34c161c0f427f3d425f057e6d8946afd1ff
                        </li>)
                    }

                </ul>
            </main>
        </div>
    )
}


function mapStateToProps(state) {
    return {
<<<<<<< HEAD
        cars: state.carModule.cars
    }
}
const mapDispatchToProps = {
    loadCars,
    removeCar,
    addCar,
    updateCar,
    addToCart
}


export const CarApp = connect(mapStateToProps, mapDispatchToProps)(_CarApp)
=======
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard,
    addToBoardt
}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
>>>>>>> a7e0c34c161c0f427f3d425f057e6d8946afd1ff
