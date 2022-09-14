import React, { useEffect } from 'react'
import { connect } from 'react-redux'


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
    }

    return (
        <div>
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
                        </li>)
                    }

                </ul>
            </main>
        </div>
    )
}


function mapStateToProps(state) {
    return {
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