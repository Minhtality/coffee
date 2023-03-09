import { useUser } from '@auth0/nextjs-auth0/client';
import * as Styled from './index.styled';
import Link from 'next/link';

const Profile = () => {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	if (!user) {
		return (
			<div>
				You are not logged in, please{' '}
				<Link style={{ textDecoration: 'underline' }} href={'/api/auth/login'}>
					Login
				</Link>{' '}
				to view this page.{' '}
			</div>
		);
	}

	return (
		<div>
			<h1>Hello,</h1>
			<p>{user.given_name}</p>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
};

export default Profile;
