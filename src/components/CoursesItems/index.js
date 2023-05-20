import {Link} from 'react-router-dom'

import './index.css'

const CourseItems = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link className="link" to={`/courses/${id}`}>
      <li className="items-li">
        <img className="item-img" src={logoUrl} alt={name} />
        <p className="item-name"> {name}</p>
      </li>
    </Link>
  )
}

export default CourseItems
