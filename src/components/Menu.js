import { Link } from "react-router-dom"

export default function Menu({ changeTab }) {
    return (
        <div id="sidebar"
            className="sidebar"
        >
            <header>
                <h3>To Do Project</h3>
            </header>

            <div className="sidebar-nav">

                <Link 
                className="links" 
                to="/all-tasks"
                onClick={() => {
                    changeTab("/all-tasks", 'links')
                }}
                >
                    <p>All tasks</p>
                </Link>

                <Link 
                className="links" 
                to="/week-tasks"
                onClick={() => {
                    changeTab("/week-tasks", 'links')
                }}
                >
                    <p>Week's tasks</p>
                </Link >

                <Link 
                className="links" 
                to="/important-tasks"
                onClick={() => {
                    changeTab("/important-tasks", 'links')
                }}
                >
                    <p>Important tasks</p>
                </Link >

                <Link 
                className="links" 
                to="/done-tasks"
                onClick={() => {
                    changeTab("/done-tasks", 'links')
                }}
                >
                    <p>Done tasks</p>
                </Link >
            </div>

        </div>
    )
}