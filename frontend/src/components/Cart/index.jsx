import * as Styled from './index.styled'
import { useRef, useEffect } from 'react'
import { useProductContext } from "@/context";

const Cart = ({cartItems}) => {
    const { removeFromCart, showCart, setShowCart } = useProductContext();
    const cartWrapperRef = useRef(null)
    // click on cart wrapper to close cart or press esc key

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setShowCart(false)
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [])


    const handleClick = (e) => {
        if (e.target === cartWrapperRef.current) {
            setShowCart(false)
        }
    }

  return (
    <Styled.CartWrapper isOpen={showCart} ref={cartWrapperRef} onClick={handleClick}>
        <Styled.CartContainer>
            <Styled.CartSummary> {/* center this */}
                {cartItems.length > 0 ? 'Soup Summary' : 'Your bowl is empty 🛒'}
            </Styled.CartSummary>

            {cartItems.map((item) => {
                const itemImage = item.image.data.attributes.formats.small.url

                return (
                    <div key={item.title}>
                        <img src={itemImage} alt={item.title} />
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.price}</p>
                            <p>{item.quantity}</p>

                            <button onClick={() => removeFromCart(item.slug)}>Remove</button>
                            <button>+</button>
                            <button>-</button>
                        </div>

                    </div>
                )
            })}
        </Styled.CartContainer>
    </Styled.CartWrapper>
  )
}

export default Cart