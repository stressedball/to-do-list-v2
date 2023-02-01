import { Link } from "react-router-dom"

export default function SideBar() {
    const handleStyle = (e) => {
        document.querySelectorAll('.underline').forEach(el => {
            el.classList.remove('underline')
        })
        e.target.classList.add('underline')
    }
    return (
        <div id="sidebar">
            <div>
                <Link className="links" to="/all-tasks">
                    <p 
                    onClick={handleStyle}
                    >All tasks</p>
                </Link>
                <Link className="links" to="/week-tasks">
                    <p 
                    onClick={handleStyle}
                    >Week's tasks</p>
                </Link >
                <Link className="links" to="/important-tasks">
                    <p 
                    onClick={handleStyle}
                    >Important tasks</p>
                </Link >
            </div>
            <div>
                <p>Projects</p>
            </div>
        </div>
    )
}