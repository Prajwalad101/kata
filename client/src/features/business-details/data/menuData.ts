export interface IMenuCategory {
  id: number;
  name: string;
  items: { id: number; name: string; info: string; price: number }[];
}

export type MenuItem = IMenuCategory['items'][number];

export const menuData: IMenuCategory[] = [
  {
    id: 1,
    name: 'breakfast',
    items: [
      {
        id: 2,
        name: 'buttermilk or buckwheat pancakes',
        info: 'comes with bacon or maple sausage',
        price: 250,
      },
      {
        id: 3,
        name: 'french toast',
        info: 'with bacon or maple sausage',
        price: 300,
      },
      {
        id: 4,
        name: 'the scrambler',
        info: 'three eggs scrambled with onion, green peppers, mushrooms, dice chicken and apple sauce',
        price: 350,
      },
      {
        id: 5,
        name: 'good morning parfait',
        info: "layers of Nancy's yogurt, house granola and berries",
        price: 150,
      },
    ],
  },
  {
    id: 6,
    name: 'appetizers',
    items: [
      {
        id: 7,
        name: 'chicken chilli',
        info: 'boneless chicken sauteed with green chillies and spring onions',
        price: 300,
      },
      {
        id: 8,
        name: 'chicken 65',
        info: 'chicken pieces marinated in a spicy sauce blend and deep fried',
        price: 280,
      },
      {
        id: 9,
        name: 'chicken manchurian',
        info: 'An Indo-Chinese dish of tender chicken coated in spices and saluteed with spring onions',
        price: 500,
      },
    ],
  },
  {
    id: 10,
    name: 'soups',
    items: [
      {
        id: 11,
        name: 'lentil soup',
        info: 'a delicious mixture of yellow lentils seasoned with spices and blended smooth',
        price: 150,
      },
      {
        id: 12,
        name: 'mango corn soup',
        info: 'a midly spiced soup made from the cream of mango and corn',
        price: 150,
      },
    ],
  },
  {
    id: 13,
    name: 'kathmandu specials',
    items: [
      {
        id: 14,
        name: 'fried vegetable momo',
        info: 'fried vegetable dumplings stuffed with cabbage, cilantro and red onions',
        price: 120,
      },
      {
        id: 15,
        name: 'chicked chow mein',
        info: 'Stir fried noodles cooked with chicken and spiced vegetables in a spicy & savory sauce',
        price: 200,
      },
      {
        id: 16,
        name: 'shrimp chow mein',
        info: 'Stir fried noodles cooked with shrimp and spiced vegetables in a spicy & savory sauce',
        price: 400,
      },
      {
        id: 17,
        name: 'vegetable thukpa soup',
        info: 'Traditional Nepali style vegetable noodle soup',
        price: 200,
      },
    ],
  },
];
