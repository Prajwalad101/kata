import { ReactNode } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Divider } from 'src/components';
import { IOrderedMenuItem } from 'src/pages/start-order';

interface ItemsTableProps {
  getQuantityButton: (_item: IOrderedMenuItem) => ReactNode;
  orderItems: IOrderedMenuItem[];
  handleDeleteItem: (_item: IOrderedMenuItem) => void;
}

export default function ItemsTable({
  getQuantityButton,
  orderItems,
  handleDeleteItem,
}: ItemsTableProps) {
  return (
    <div className="mb-8 max-w-3xl rounded-md border-2 border-gray-300">
      <div className="hidden gap-5 py-3 px-5 xs:flex">
        <p className="flex-[4_1_0] font-medium">Item</p>
        <p className="flex-[2_1_0] text-center font-medium">Qty</p>
        <p className="flex-[2_1_0] text-center font-medium">Price</p>
        <p className="flex-1 font-medium"></p>
      </div>
      <Divider width={2} className="hidden xs:flex" />
      {orderItems.map((orderItem) => (
        <>
          <div key={orderItem.item.id} className="px-5 py-4">
            <div className="flex items-center gap-2 pb-2 xs:gap-5 xs:pb-0">
              <p className="flex-[4_1_0] font-medium capitalize xs:font-normal">
                {orderItem.item.name}
              </p>
              <div className="hidden flex-[2_1_0] xs:block">
                {getQuantityButton(orderItem)}
              </div>
              <p className="hidden flex-[2_1_0] text-center xs:block">
                Rs. {orderItem.item.price * orderItem.quantity}
              </p>
              <div className="flex-1">
                <FiTrash2
                  size={22}
                  className="ml-auto cursor-pointer text-gray-600 hover:text-primaryred"
                  onClick={() => handleDeleteItem(orderItem)}
                />
              </div>
            </div>
            {/* for smaller screens */}
            <div className="flex gap-8 xs:hidden">
              <div className="">{getQuantityButton(orderItem)}</div>
              <p className="">
                Rs. {orderItem.item.price * orderItem.quantity}
              </p>
            </div>
          </div>
          <Divider className="last:hidden" />
        </>
      ))}
    </div>
  );
}
