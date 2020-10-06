import React from 'react'

const Header = ({ name }) => {
	return (
		<h2>{name}</h2>
	)
}
  
const Total = ( {parts} ) => {
	const total = parts.reduce((sum, part) => {
		return sum + part.exercises
	}, 0)
	return(
	  <h4>total of {total} exercises</h4>
	) 
}
  
const Part = ({ name, exercises }) => {
	return (
	  <p>
		{name} {exercises}
	  </p>    
	)
}
  
const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => 
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			)}
		</div>
	)
}

const Course = ({course}) => {
	  return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	  )
}

  export default Course
