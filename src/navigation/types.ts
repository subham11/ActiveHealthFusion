// src/navigation/types.ts
export type DrawerParamList = {
  HomeTabs: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  UserProfile: {
    user: {
      id: string;
      name: string;
      image: any;
      profileDetails: string;
      profilePrice: string;
      profileReviews: string;
      description: string;
    }
  };
};