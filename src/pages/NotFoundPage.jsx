import {Link} from 'react-router';

export default function NotFoundPage(){
   return ( <div> 
                    <h1>404 - Page Not Found</h1> 
                    <p> Sorry, the page you're looking for doesn't exist. </p> 

                    <ul>
                        <li>
                                <Link to= "/">Go Home</Link></li>
                        <li>
                                <Link to= "/login">Back to login</Link>

                        </li>
                        <li>
                                <Link to= "/about">About</Link>
                        </li>                        
                     </ul>
            </div> 
                    );
}