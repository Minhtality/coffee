"use client";

import * as Styled from './index.styled';
import Link from 'next/link';
import React from 'react';
import Cart from '../Cart';
import User from '../User';
import { FiShoppingBag } from 'react-icons/fi';
import { useProductContext } from '@/context';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Nav() {
	const { cartItems, setShowCart, showCart } = useProductContext();
	const pathname = usePathname();

	const totalQuantity = cartItems.reduce((acc, curr) => {
		return acc + curr.quantity;
	}, 0);

	const returnHref = () => {
		if (pathname === '/coffee') {
			return '/coffee';
		} else {
			return '/';
		}
	};

	return (
		<Styled.NavWrapper>
			<Link href={returnHref()}>Good Soup.</Link>
			{pathname === '/' && (
				<Styled.NavItems>
					<Link href="/coffee"><h3>Coffee</h3></Link>
				</Styled.NavItems>
			)}
			{pathname === '/coffee' && (
				<Styled.NavItems>
					<Link href="/"><h3>Gallery</h3></Link>
					<Styled.Item onClick={() => setShowCart(true)}>
						<FiShoppingBag />
						<h3>Cart</h3>
						{cartItems.length > 0 && (
							<motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
								{totalQuantity}
							</motion.span>
						)}
					</Styled.Item>
					<User />
				</Styled.NavItems>
			)}
			<AnimatePresence>
				{showCart && <Cart cartItems={cartItems} />}
			</AnimatePresence>
		</Styled.NavWrapper>
	);
}
