export const filters = [
    {
        id:"color",
        name: "Color",
        options: [
            { value: "red", label: "Red" },
            { value: "blue", label: "Blue" },
            { value: "green", label: "Green" },
            { value: "black", label: "Black" },
            { value: "white", label: "White" },
            { value: "yellow", label: "Yellow" },
            { value: "purple", label: "Purple" },
            { value: "orange", label: "Orange" },
            { value: "beige", label: "Beige" },
            { value: "brown", label: "Brown" }
        ]
    },

    {
        id: "size",
        name: "Size",
        options: [
            { value: "xs", label: "XS" },
            { value: "s", label: "S" },
            { value: "m", label: "M" },
            { value: "l", label: "L" },
            { value: "xl", label: "XL" },
            { value: "xxl", label: "XXL" }
        ]
    },
];

export const singleFilter = [
    {
      id: "price",
      name: "Price",
      options: [
        { value: "159-399", label: "₹159 - ₹399" },
        { value: "399-999", label: "₹399 - ₹999" },
        { value: "999-1999", label: "₹999 - ₹1999" },
        { value: "1999-2999", label: "₹1999 - ₹2999" },
        { value: "2999-3999", label: "₹2999 - ₹3999" },
        { value: "3999-4999", label: "₹3999 - ₹4999" },
        { value: "4999-5999", label: "₹4999 - ₹5999" },
        { value: "5999-6999", label: "₹5999 - ₹6999" },
        { value: "6999-7999", label: "₹6999 - ₹7999" },
        { value: "7999-8999", label: "₹7999 - ₹8999" }
      ],
    },

    {
        id: "discount",
        name: "DISCOUNT RANGE",
        options: [
            { value: "10", label: "10% And Above"},
            { value: "20", label: "20% And Above"},
            { value: "30", label: "30% And Above"},
            { value: "40", label: "40% And Above"},
            { value: "50", label: "50% And Above"},
            { value: "60", label: "60% And Above"},
            { value: "70", label: "70% And Above"},
            { value: "80", label: "80% And Above"},
            { value: "90", label: "90% And Above"}
        ],
    },

    {
        id: "stock",
        name: "Availability",
        options: [
            { value: "in_stock", label: "In Stock" },
            { value: "out_of_stock", label: "Out of Stock" },

        ],
    },
]

export const sortOptions = []