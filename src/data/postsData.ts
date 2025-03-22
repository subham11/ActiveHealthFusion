// postsData.ts
export interface User {
    name: string;
    avatar: any; // or string if using network images
  }
  
  export interface Comment {
    user: User;
    text: string;
  }
  
  export interface Post {
    id: string;
    user: User;
    images: any[];       // array of local or network images
    content: string;
    reactions: {
      like: number;
      haha: number;
      sad: number;
      support: number;
      dislike: number;
      hearts: number;
      angry: number;
    };
    comments: Comment[];
    createdAt: string;   // e.g. '2 hours ago'
  }
  
  export const posts: Post[] = [
    {
      id: '1',
      user: {
        name: 'Mike Johnson',
        avatar: require('../assets/images/users/UserProfile.jpg'),
      },
      images: [
        require('../assets/images/users/UserProfile.jpg'),
        require('../assets/images/users/UserProfile.jpg'),
      ],
      content: 'Beautiful sunset today! \u{1F307}', // 🌇
      reactions: {
        like: 1234,
        haha: 50,
        sad: 2,
        support: 15,
        dislike: 3,
        hearts: 125,
        angry: 1,
      },
      comments: [
        {
          user: {
            name: 'Emma',
            avatar: require('../assets/images/users/UserProfile.jpg'),
          },
          text: 'This is absolutely stunning!',
        },
      ],
      createdAt: '2 hours ago',
    },
    {
      id: '2',
      user: {
        name: 'Lisa Chen',
        avatar: require('../assets/images/Image_02.jpeg'),
      },
      images: [
        require('../assets/images/Image_03.jpeg'),
      ],
      content: 'Perfect spot for working remotely',
      reactions: {
        like: 892,
        haha: 4,
        sad: 0,
        support: 20,
        dislike: 1,
        hearts: 99,
        angry: 0,
      },
      comments: [
        {
          user: {
            name: 'Mike Johnson',
            avatar: require('../assets/images/users/UserProfile.jpg'),
          },
          text: 'Looks super cozy!',
        },
      ],
      createdAt: '5 hours ago',
    },
    {
      id: '3',
      user: {
        name: 'Lisa Chen',
        avatar: require('../assets/images/users/UserProfile.jpg'),
      },
      images: [
        require('../assets/images/Image_01.jpeg'),
      ],
      content: 'Perfect spot for working remotely',
      reactions: {
        like: 892,
        haha: 4,
        sad: 0,
        support: 20,
        dislike: 1,
        hearts: 99,
        angry: 0,
      },
      comments: [
        {
          user: {
            name: 'Mike Johnson',
            avatar: require('../assets/images/users/UserProfile.jpg'),
          },
          text: 'Looks super cozy!',
        },
      ],
      createdAt: '5 hours ago',
    },
  ];
  