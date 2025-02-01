'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";

const defaultFormData = {
	email: "",
	name: "",
	password: "",
};

const Auth = () => {
	// Background Image (Same as Facilities)
	const backgroundImageUrl = "/images/cover-image-2.png";

	const [formData, setFormData] = useState(defaultFormData);

	const inputStyles =
		"border border-gray-300 text-black rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) router.push("/");
	}, [router, session]);

	const loginHandler = async () => {
		try {
			await signIn();
			router.push("/");
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const user = await signUp(formData);
			if (user) {
				toast.success("Success. Please sign in");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		} finally {
			setFormData(defaultFormData);
		}
	};

	return (
		<section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-transparent via-transparent to-transparent relative overflow-hidden">
			{/* Blurred Background */}
			<div
				className="absolute inset-0 z-0 rounded-2xl"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					filter: "blur(6px)",
					transform: "scale(1.1)",
				}}
			></div>

			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-2xl"></div>

			{/* Form Content */}
			<div className="relative z-20 p-8 space-y-6 rounded-xl shadow-xl w-full max-w-lg mt-20 mb-10">
				<div className="flex flex-col items-center space-y-4">
					<h1 className="text-3xl font-bold text-white text-center animate-fade-in-up">
						Create an Account
					</h1>
					<p className="text-sm text-white">
						Already have an account?{" "}
						<button
							onClick={loginHandler}
							className="text-orange-500 hover:text-orange-300 font-bold px-1"
						>
							Login
						</button>
					</p>

					<div className="flex items-center space-x-3">
						<Tooltip title="Login with GitHub" placement="top">
							<p>
								<AiFillGithub
									onClick={loginHandler}
									className="text-4xl text-white hover:text-gray-400 cursor-pointer transition-colors"
								/>
							</p>
						</Tooltip>

						<span className="text-white">|</span>

						<Tooltip title="Login with Google" placement="top">
							<p>
								<FcGoogle
									onClick={loginHandler}
									className="text-4xl text-white hover:text-gray-400 cursor-pointer transition-colors"
								/>
							</p>
						</Tooltip>
					</div>
				</div>

				<form
					className="space-y-4 relative z-20"
					onSubmit={handleSubmit}
				>
					<input
						type="email"
						name="email"
						placeholder="name@company.com"
						required
						className={inputStyles}
						value={formData.email}
						onChange={handleInputChange}
					/>
					<input
						type="text"
						name="name"
						placeholder="John Doe"
						required
						className={inputStyles}
						value={formData.name}
						onChange={handleInputChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="********"
						required
						minLength={6}
						className={inputStyles}
						value={formData.password}
						onChange={handleInputChange}
					/>

					<button
						type="submit"
						className="w-full bg-orange-500 px-4 hover:bg-orange-600 transition-al text-white font-medium rounded-lg text-lg py-2.5 transition-all hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 focus:outline-none transform hover:scale-105"
					>
						Sign Up
					</button>
				</form>
			</div>
		</section>
	);
};

export default Auth;
