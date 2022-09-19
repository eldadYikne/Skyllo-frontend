import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <section className='home-page-container'>
      <div className='home-page-img'>
        <img
          className=''
          src={require(`../assets/img/Trello-home.jpg`)}
          alt=''
        />
      </div>

      <div className='home-page-content main-container'>
        <h1>Skyllo helps teams move work forward.</h1>
        <p>
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is
          unique accomplish it all with Skyllo.
        </p>

        <Link className='get-started-btn' to='workspace'>
          Try our demo 
        </Link>
      </div>

    </section>
  )
}
