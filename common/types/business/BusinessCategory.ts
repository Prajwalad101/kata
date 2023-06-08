export const businessCategories = [
  {
    name: "food and drinks",
    subcategories: [
      "resturant",
      "cafe",
      "fast food",
      "hotel",
      "bakery",
    ] as string[],
    features: [
      { value: "outdoors", tag: "suggested" },
      { value: "homedelivery", tag: "suggested" },
      { value: "finedining", tag: "suggested" },
      { value: "kids friendly", tag: "suggested" },
      { value: "takeout", tag: "popular" },
      { value: "good parking", tag: "popular" },
      { value: "authentic", tag: "trending" },
      { value: "LGBTQ friendly", tag: "trending" },
      { value: "24 hr service", tag: "trending" },
    ],
  },
  {
    name: "sports and fitness",
    subcategories: ["gym", "futsal", "tennis", "zumba", "swimming"] as string[],
    features: [
      { value: "good parking", tag: "suggested" },
      { value: "memberships", tag: "suggested" },
      { value: "allows refunds", tag: "suggested" },
      { value: "open on weekends", tag: "popular" },
      { value: "peaceful environment", tag: "popular" },
    ],
  },
  {
    name: "home services",
    subcategories: [
      "plumbing",
      "electricity",
      "cleaning",
      "repairs",
    ] as string[],
    features: [
      { value: "timely service", tag: "suggested" },
      { value: "resonable price", tag: "suggested" },
    ],
  },
  {
    name: "others",
    subcategories: [
      "entertainment",
      "shopping",
      "essential",
      "vehicles",
    ] as string[],
    features: [
      { value: "feature3", tag: "suggested" },
      { value: "feature4", tag: "suggested" },
    ],
  },
];

export type BusinessCategories = typeof businessCategories;

export type BusinessCategory = BusinessCategories[number]["name"];
