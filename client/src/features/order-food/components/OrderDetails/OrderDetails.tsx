import { ItemsTable } from '@features/order-food/components';
import { Dispatch, SetStateAction } from 'react';
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { Divider, PrimaryButton } from 'src/components';
import { IOrderedMenuItem } from 'src/pages/start-order';

interface OrderDetailsProps {
  orderItems: IOrderedMenuItem[];
  setOrderItems: Dispatch<SetStateAction<IOrderedMenuItem[]>>;
  onClick: () => void;
}

export default function OrderDetails({
  orderItems,
  setOrderItems,
  onClick,
}: OrderDetailsProps) {
  const isOrderEmpty = orderItems.length === 0;

  const handleDeleteItem = (orderItem: IOrderedMenuItem) => {
    const newItems = orderItems.filter(
      (item) => item.item.id !== orderItem.item.id
    );

    setOrderItems(newItems);
  };

  const handleIncreaseQuantity = (orderItem: IOrderedMenuItem) => {
    setOrderItems((prevItems) => {
      // find the item and update it
      const updatedItems = prevItems.map((item) => {
        if (item.item.id === orderItem.item.id) {
          return { item: item.item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return updatedItems;
    });
  };

  const handleDecreaseQuantity = (orderItem: IOrderedMenuItem) => {
    setOrderItems((prevItems) => {
      // find the item and update it
      const updatedItems = prevItems.map((item) => {
        if (item.item.id === orderItem.item.id) {
          if (item.quantity <= 1) return item;
          return { item: item.item, quantity: item.quantity - 1 };
        }
        return item;
      });

      return updatedItems;
    });
  };

  const getQuantityButton = (orderItem: IOrderedMenuItem) => {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          className="group relative h-[23px] w-[23px]"
          onClick={() => handleDecreaseQuantity(orderItem)}
        >
          <AiFillMinusCircle
            size={23}
            className="absolute inset-0 text-primaryred opacity-0 transition-opacity group-hover:opacity-100"
          />
          <AiOutlineMinusCircle
            size={23}
            className="absolute inset-0 transition-opacity group-hover:opacity-0"
          />
        </button>
        <p>{orderItem.quantity}</p>
        <button
          className="group relative h-[23px] w-[23px]"
          onClick={() => handleIncreaseQuantity(orderItem)}
        >
          <AiFillPlusCircle
            size={23}
            className="absolute
             inset-0 text-primaryred opacity-0 transition-opacity group-hover:opacity-100"
          />
          <AiOutlinePlusCircle
            size={23}
            className="absolute inset-0 transition-opacity group-hover:opacity-0"
          />
        </button>
      </div>
    );
  };

  return (
    <div className="mb-9">
      <h5 className="mb-2 text-xl font-medium">Order Details</h5>
      <p className="mb-9 text-gray-600">
        {isOrderEmpty
          ? 'Your order is empty. Please select some items'
          : 'Select your items and edit them as necessary'}
      </p>
      {!isOrderEmpty && (
        <ItemsTable
          orderItems={orderItems}
          handleDeleteItem={handleDeleteItem}
          getQuantityButton={getQuantityButton}
        />
      )}
      <PrimaryButton className="mb-6 px-4 py-2.5" onClick={onClick}>
        Browse Menu
      </PrimaryButton>
      <Divider />
    </div>
  );
}
