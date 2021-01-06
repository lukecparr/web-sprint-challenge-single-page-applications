import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios'
import * as yup from 'yup';
import './PizzaForm.css';

const PizzaForm = () => {
	// Set form values with state
	const [formValues, setFormValues] = useState({
		name: '',
		pizzaSize: '',
		bacon: false,
		tomato: false,
		feta: false,
		spinich: false,
		specialInst: ''
	});

	// State for button disabling
	const [buttonDisabled, setButtonDisabled] = useState(true);

	// State for api response
	const [post, setPost] = useState([]);

	// On Change handler
	const change = (e) => {
		e.persist();

		console.log(e)
		setFormValues({...formValues, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

		// Validate changes
		validateChange(e);
	};

	// Set form schema for validation
	const formSchema = yup.object().shape({
		name: yup.string().test('len', 'Name must be more than 2 characters', val => val.length > 2),
		pizzaSize: yup.string().required("Please choose a size"),
		bacon: yup.boolean().oneOf([true, false]),
		tomato: yup.boolean().oneOf([true, false]),
		feta: yup.boolean().oneOf([true, false]),
		spinich: yup.boolean().oneOf([true, false]),
		specialInst: yup.string()
	});

	// State for errors
	const [errors, setErrors] = useState({
		name: '',
		pizzaSize: ''
	})

	// Inline Validation
	const validateChange = (e) => {
		yup.reach(formSchema, e.target.name)
		.validate(e.target.value)
		.then((valid) => {setErrors({ ...errors, [e.target.name]: ""});})
		.catch((err) => {setErrors({ ...errors, [e.target.name]: err.errors[0] }) });
	}

	// Validation
	useEffect(() => {
		formSchema.isValid(formValues).then((valid) => {
			setButtonDisabled(!valid)
		})
	}, [formValues])

	// On Submit handler
	const formSubmit = (e) => {
		e.preventDefault();

		axios.post("https://reqres.in/api/users", formValues)
			.then((res) => {
				setPost(res.data);
				setFormValues({
					name: '',
					pizzaSize: '',
					bacon: false,
					tomato: false,
					feta: false,
					spinich: false,
					specialInst: ''
				})
			})
	}



	return (
		<>
			<Link to="/">
				<Button color="danger">Home</Button>
			</Link>

			<form onSubmit={formSubmit}>
				<label htmlFor="name">
					Name:
					<input type="text" id="name" name="name" placeholder="Joe Schmo" value={formValues.name} onChange={change} />
					{errors.name.length > 2 ? <p className='error'>{errors.name}</p> : null}
				</label>

				<label htmlFor="pizzaSize">
					Pizza Size:
					<select id="pizzaSize" name="pizzaSize" value={formValues.size} onChange={change} >
						<option value="">---Choose One---</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
						<option value="extra-large">Extra-large</option>
					</select>
					{errors.pizzaSize.length > 0 ? <p className='error'>{errors.pizzaSize}</p> : null}

				</label>

				<label htmlFor="toppings">
					Toppings:
					<div className="toppings">
						<input type="checkbox" name="bacon" checked={formValues.bacon} onChange={change} />Bacon
						<input type="checkbox" name="tomato" checked={formValues.tomato} onChange={change} />Tomato
						<input type="checkbox" name="feta" checked={formValues.feta} onChange={change} />Feta
						<input type="checkbox" name="spinich" checked={formValues.spinich} onChange={change} />Spinich
					</div>
				</label>

				<label htmlFor="">
					Special Instructions:
					<textarea id="specialInst" name="specialInst" placeholder="Anything we should know?" value={formValues.specialInst} onChange={change} />
				</label>

				<Button color='danger' disabled={buttonDisabled} id="submitBtn">Order Now</Button>
				<pre>{JSON.stringify(post, null, 2)}</pre>

			</form>

		</>
	)
};

export default PizzaForm;