import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as TagIcon } from '../assets/img/tag.svg'
import { ReactComponent as SolutionsIcon } from '../assets/img/solutions.svg'
import { ReactComponent as CompassIcon } from '../assets/img/compass.svg'


export const HomePage = () => {
  return (
    <section className="home-page-main-container">

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
            Start demo
          </Link>

        </div>



      </section>
      <section className='home-page-middle-container'>
        <div className='middle-box'>
          <div className='home-page-box-icon'>
            <TagIcon />
          </div>
          <div>
            <span>See Skyllo pricing</span>
            <p>Whether you’re a team of 2 or 2,000, Skyllo can be customized for your organization. Explore which option is best for you.</p>
          </div>
        </div>


        <div className='middle-box'>
          <div className='home-page-box-icon'>
            <CompassIcon />
          </div>
          <div>

            <span>See Skyllo pricing</span>
            <p>Skyllo is the visual tool that empowers your team to manage any type of project, workflow, or task tracking.</p>
          </div>
        </div>

        <div className='middle-box'>
          <div className='home-page-box-icon'>
            <SolutionsIcon />
          </div>
          <div>
            <span>Discover Skyllo Enterprise</span>
            <p>The productivity tool teams love, paired with the features and security needed for scale.</p>
          </div>
        </div>

      </section>
    </section>
  )
}
