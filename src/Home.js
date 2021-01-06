import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Home = () => {

	return (
		<>
			<img src="https://64.media.tumblr.com/tumblr_m98dwt8IsU1rum0hvo1_500.gif" alt="animated gif of John Green as Nyan Cat with a pizza for a body"/>
			<Link to="/pizza">
				<Button color="danger">Let's get some pizza</Button>
			</Link>
		</>
	)
};

export default Home;