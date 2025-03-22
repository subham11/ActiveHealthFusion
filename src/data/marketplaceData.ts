// marketplaceData.ts

export interface SubCategory {
    id: string;
    name: string;
    image: any;  // local require(...) or { uri: string } for network images
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
        },
        {
          id: '2',
          name: 'Spring Summer',
          image: require('../assets/images/HealthAndNutrition.jpeg'),
        },
        {
          id: '3',
          name: 'Weddings Diaries',
          image: require('../assets/images/HealthAndNutrition.jpeg'),
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
        },
        {
          id: '2',
          name: 'Shirts',
          image: require('../assets/images/HealthAndNutrition.jpeg'),
        },
        {
          id: '3',
          name: 'Tshirts',
          image: require('../assets/images/HealthAndNutrition.jpeg'),
        },
        {
          id: '4',
          name: 'Jeans',
          image: require('../assets/images/HealthAndNutrition.jpeg'),
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
        },
        {
          id: '2',
          name: 'Dresses',
          image: require('../assets/images/HealthAndNutrition.jpeg'),
        },
        {
          id: '3',
          name: 'Tops',
          image: require('../assets/images/HealthAndNutrition.jpeg'),
        },
        // etc...
      ],
    },
    // Additional categories (Kids Wear, Footwear, Beauty & Grooming, Home & Living, etc.)
  ];
  