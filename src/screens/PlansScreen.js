import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
// import '../styles/PlansScreen.css';
import '../styles/PlansScreen.scss';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { subscriptionChecker } from '../features/subscriptionSlice';

function PlansScreen() {
	const [isProducts, setProducts] = useState([]);
	const user = useSelector(selectUser);
	const [subscription, setSubscription] = useState(null);

	const [mount, setMount] = useState(true);

	const dispatch = useDispatch();

	const loadCheckout = async (priceId) => {
		const docRef = await db
			.collection('customers')
			.doc(user.uid)
			.collection('checkout_sessions')
			.add({
				price: priceId,
				success_url: `${window.location.origin}/profiles`,
				cancel_url: window.location.origin,
			});

		docRef.onSnapshot(async (snap) => {
			const { error, sessionId } = snap.data();

			if (error) {
				// Show an error to your customer and
				// inspect your Cloud Function logs in the Firebase console
				alert(`An error occured: ${error.messager}`);
			}

			if (sessionId) {
				// We have a session, let's redirect to Checkout
				// Init Stripe

				const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_TEST_KEY}`);
				stripe.redirectToCheckout({ sessionId });
			}
		});
	};

	useEffect(() => {
		let unsubscribe = db
			.collection('customers')
			.doc(user.uid)
			.collection('subscriptions')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach(async (subscription) => {
					setSubscription({
						role: subscription.data().role,
						current_period_end: subscription.data().current_period_end.seconds,
						current_period_start: subscription.data().current_period_start.seconds,
					});
					dispatch(
						subscriptionChecker({
							role: subscription.data().role,
						})
					);
				});
			});

		return () => unsubscribe;
	}, [user.uid, dispatch]);

	useEffect(() => {
		db.collection('products')
			.where('active', '==', true)
			.get()
			.then((querySnapshot) => {
				const products = {};
				querySnapshot.forEach(async (productDoc) => {
					products[productDoc.id] = productDoc.data();
					const priceSnap = await productDoc.ref.collection('prices').get();
					priceSnap.docs.forEach((price) => {
						products[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data(),
						};
					});
				});

				setProducts(products);
				if (mount) {
					setMount(false);
				}
			});

		console.log('hi');
		return () => mount;
	}, []);

	return (
		<div className='plansScreen'>
			<br />
			{subscription && (
				<p>
					Renewal date:{' '}
					{new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
				</p>
			)}

			{Object.entries(isProducts).map(([productId, productData]) => {
				// Add some logic to check if the user's subscription is active...
				const isCurrentPackage = productData.name
					?.toLowerCase()
					.includes(subscription?.role);

				return (
					<div
						key={productId}
						className={`${
							isCurrentPackage && 'plansScreen_plan-disabled'
						} plansScreen_plan`}
					>
						<div className='plansScreen_info'>
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>

						<button
							onClick={() =>
								!isCurrentPackage && loadCheckout(productData.prices.priceId)
							}
						>
							{isCurrentPackage ? 'Current Package' : 'Subscribe'}
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default PlansScreen;
