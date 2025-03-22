// PostCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Post } from '../data/postsData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faSmile, faSadCry, faHandPointLeft, faThumbsDown, faHeart, faAsterisk } from '@fortawesome/free-solid-svg-icons';

const { width: screenWidth } = Dimensions.get('window');

// Example color palette
const COLORS = {
  mainBackground: '#FFFFFF',
  cardBackground: '#FFF',
  orange: '#FFA500',
  orangeRed: '#FF4500',
  red: '#FF0000',
  green: '#006400', // bottle green
  textPrimary: '#333',
  textSecondary: '#777',
};

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Example of mapping your reaction counts to icons and colors
  const reactionIcons = [
    { type: 'like', icon: 'thumbs-up', color: COLORS.orangeRed },
    { type: 'haha', icon: 'happy', color: COLORS.orange },
    { type: 'sad', icon: 'sad', color: COLORS.green },
    { type: 'support', icon: 'hand-left', color: COLORS.orange },
    { type: 'dislike', icon: 'thumbs-down', color: COLORS.orangeRed },
    { type: 'hearts', icon: 'heart', color: COLORS.red },
    { type: 'angry', icon: 'alert-circle', color: COLORS.green },
  ];

  const renderImages = ({ item }: { item: any }) => (
    <Image source={item} style={styles.postImage} resizeMode="cover" />
  );

  return (
    <View style={styles.card}>
      {/* User Info */}
      <View style={styles.userRow}>
        <Image source={post.user.avatar} style={styles.avatar} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.timeText}>{post.createdAt}</Text>
        </View>
      </View>

      {/* Image Slider */}
      <FlatList
        data={post.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderImages}
        keyExtractor={(_, index) => index.toString()}
        style={styles.imageList}
      />

      {/* Post Content */}
      <Text style={styles.contentText}>{post.content}</Text>

      {/* Reaction Icons */}
      <View style={styles.reactionsRow}>
        {reactionIcons.map((reaction) => {
          const count = (post.reactions as any)[reaction.type];
          if (count > 0) {
            return (
              <View style={styles.reactionItem} key={reaction.type}>
                <FontAwesomeIcon
                  icon={
                    reaction.type === 'like' ? faThumbsUp :
                    reaction.type === 'haha' ? faSmile :
                    reaction.type === 'sad' ? faSadCry :
                    reaction.type === 'support' ? faHandPointLeft :
                    reaction.type === 'dislike' ? faThumbsDown :
                    reaction.type === 'hearts' ? faHeart :
                    faAsterisk
                  }
                  //name={reaction.icon}
                  size={18}
                  color={reaction.color}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.reactionCount}>{count}</Text>
              </View>
            );
          } else {
            return null;
          }
        })}
      </View>

      {/* Comments */}
      {post.comments.length > 0 && (
        <View style={styles.commentSection}>
          {/* Show the first comment */}
          <View style={styles.commentRow}>
            <Text style={styles.commentUser}>{post.comments[0].user.name}</Text>
            <Text style={styles.commentText}> {post.comments[0].text}</Text>
          </View>
          {/* View all X comments */}
          {post.comments.length > 1 && (
            <TouchableOpacity>
              <Text style={styles.viewAllComments}>
                View all {post.comments.length} comments
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  imageList: {
    width: screenWidth - 32, // approximate
    height: 200,
    marginBottom: 8,
  },
  postImage: {
    width: screenWidth - 32, // approximate
    height: 200,
    marginRight: 2,
    borderRadius: 8,
  },
  contentText: {
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  reactionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  reactionCount: {
    color: COLORS.textPrimary,
  },
  commentSection: {
    marginTop: 4,
  },
  commentRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  commentUser: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  commentText: {
    color: COLORS.textPrimary,
  },
  viewAllComments: {
    color: COLORS.orangeRed,
    marginTop: 2,
  },
});
