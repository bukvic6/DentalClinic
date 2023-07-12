import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/schedules"> Schedules </Link>
        </li>
      </ul>
    </nav>
  )
}
