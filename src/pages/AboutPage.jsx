export default function AboutPage(){
    return(<>
        <h1>
            About Todo List
        </h1>
        <p>This is a React-based todo application that helps you organize and manage your tasks efficiently.</p>
        <section>
            <h2>Features</h2>
                <ul>
                    <li>Add new todos</li>
                    <li>Mark todos as complete</li>
                    <li>Edit existing todos</li>
                    <li>Sort todos by date or title</li>
                    <li>User authentication with protected routes</li>
                </ul>
        </section>
        <section>
        <h2>Built With</h2>
                    <ul>
                        <li>React 19.2.7</li>
                        <li>React Router 8</li>
                        <li>Vite 8</li>
                    </ul>      
        </section>
        
        </>)
}