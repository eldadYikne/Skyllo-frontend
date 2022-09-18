

export function BoardHeader({board}) {

    return (
        <section className="board-header ">
        <nav className="board-header main-container">
        <div className="nav-left">
        <h1>{board.title}</h1>
        </div>

        <div className="nav-right">

        </div>

        </nav>            
        </section>
    )
}