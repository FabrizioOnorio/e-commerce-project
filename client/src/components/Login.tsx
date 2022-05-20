import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export interface ILoginPageProps {
	setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = ({
	setUserId,
}: ILoginPageProps) => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [authing, setAuthing] = useState(false);

	const signInWithGoogle = async () => {
		setAuthing(true);

		signInWithPopup(auth, new GoogleAuthProvider())
			.then((response) => {
				setUserId(response.user.uid);
				console.log(response.user.uid);
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				setAuthing(false);
			});
	};

	return (
		<div>
			<p>Login Page</p>
			<button
				className="submitButton"
				onClick={() => signInWithGoogle()}
				disabled={authing}
			>
				Sign in with Google
			</button>
		</div>
	);
};

export default LoginPage;
