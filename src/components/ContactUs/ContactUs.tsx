import React, { useState } from "react";
import styles from "./contact.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserForm {
	name: string;
	email: string;
	phone: string;
	query: string;
}

const init = {
	name: "",
	email: "",
	phone: "",
	query: "",
};

const validateString = (str: string, len: number) => {
	return str.length >= len;
};

const validatePhone = (phone: string) => {
	const pattern = /^(\+?\d{1,3})?[- .]?\d{3}[- .]?\d{3}[- .]?\d{4}$/;

	if (!phone) return false;

	return pattern.test(phone);
};

const validateEmail = (email: string) => {
	const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

	if (!email) return false;

	return pattern.test(email);
};

const ContactUs = () => {
	const [userInput, setUserInput] = useState<UserForm>(init);
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const key = e.target.name;
		const value = e.target.value;

		setUserInput((prev) => ({ ...prev, [key]: value }));
	};

	const validateInput = () => {
		if (!validateString(userInput.name, 3)) {
			toast.error("Invalid name. Min length 3.");
			return false;
		}

		if (!validateEmail(userInput.email)) {
			toast.error("Invalid email provided.");
			return false;
		}

		if (!validatePhone(userInput.phone)) {
			toast.error("Invalid phone number provided.");
			return false;
		}

		if (
			userInput.query.length > 0 &&
			!validateString(userInput.query, 10)
		) {
			toast.error("Invalid query. Min length 10.");
			return false;
		}

		return true;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateInput()) {
			return;
		}
	};

	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className={`container ${styles.contact}`}>
				<div className={styles.title}>
					<h2>
						Get in touch with an{" "}
						<span className="accent">expert.</span>
					</h2>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.input}>
						<input
							type="text"
							name="name"
							value={userInput.name}
							required
							placeholder="Name..."
							onChange={handleChange}
							disabled={submitting}
						/>
					</div>

					<div className={styles.input}>
						<input
							type="email"
							name="email"
							value={userInput.email}
							required
							placeholder="Email..."
							onChange={handleChange}
							disabled={submitting}
						/>
					</div>

					<div className={styles.input}>
						<input
							type="text"
							name="phone"
							value={userInput.phone}
							required
							placeholder="Phone Number..."
							onChange={handleChange}
							disabled={submitting}
							inputMode="tel"
						/>
					</div>

					<div className={styles.input}>
						<textarea
							name="query"
							value={userInput.query}
							placeholder="Tell us about your query..."
							onChange={handleChange}
							disabled={submitting}
						/>
					</div>

					<div className={styles.action}>
						<button disabled={submitting}>Submit</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ContactUs;
