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
        <h1>The project management tool teams actually want to use</h1>
        <p>
        Let Skyllo keep your tasks, projects, and due dates together, so your team can focus on the substance of doing.
        </p>

        <Link className='get-started-btn' to='workspace'>
          Try our demo 
        </Link>
      </div>

    </section>
  )
}
