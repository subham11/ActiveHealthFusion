// marketplaceData.ts
export interface ProductItem {
    id: string;
    title: string;
    image: any;
    price?: number;
}

export interface SubCategory {
    id: string;
    name: string;
    image: any;  // local require(...) or { uri: string } for network images
    items?: ProductItem[];
}

export interface MainCategory {
    id: string;
    name: string;
    icon: any;   // icon or small image for left sidebar
    subCategories: SubCategory[];
}

export const MARKETPLACE_CATEGORIES: MainCategory[] = [
    {
        id: 'trending',
        name: 'Trending Now',
        icon: require('../assets/images/HealthAndNutrition.jpeg'),
        subCategories: [
            {
                id: '1',
                name: 'New On Myntra',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp1', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp2', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            {
                id: '2',
                name: 'Spring Summer',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp3', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp4', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            {
                id: '3',
                name: 'Weddings Diaries',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp5', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp6', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            // etc...
        ],
    },
    {
        id: 'men',
        name: "Men's Wear",
        icon: require('../assets/images/HealthAndNutrition.jpeg'),
        subCategories: [
            {
                id: '1',
                name: 'Men’s Fashion Store',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp7', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 10.00 },
                    { id: 'pp8', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            {
                id: '2',
                name: 'Shirts',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp9', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp10', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            {
                id: '3',
                name: 'Tshirts',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp11', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp12', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            {
                id: '4',
                name: 'Jeans',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp12', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp14', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            // etc...
        ],
    },
    {
        id: 'women',
        name: "Women’s Wear",
        icon: require('../assets/images/HealthAndNutrition.jpeg'),
        subCategories: [
            {
                id: '1',
                name: 'Women’s Fashion Store',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp15', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp16', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            {
                id: '2',
                name: 'Dresses',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp17', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp18', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            {
                id: '3',
                name: 'Tops',
                image: require('../assets/images/HealthAndNutrition.jpeg'),
                items: [
                    { id: 'pp19', title: 'Protein Powder A', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                    { id: 'pp20', title: 'Protein Powder B', image: require('../assets/images/HealthAndNutrition.jpeg'), price: 12.23 },
                  ],
            },
            // etc...
        ],
    },
    // Additional categories (Kids Wear, Footwear, Beauty & Grooming, Home & Living, etc.)
];
