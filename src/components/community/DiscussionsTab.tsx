
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ForumPost } from '@/types';
import ForumPostComponent from './ForumPost';

interface DiscussionsTabProps {
  initialPosts: ForumPost[];
}

const DiscussionsTab = ({ initialPosts }: DiscussionsTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setPosts(initialPosts);
    } else {
      const filtered = initialPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPosts(filtered);
    }
  }, [searchQuery, initialPosts]);

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => 
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `new-${Date.now()}`,
          author: {
            id: 'current-user',
            name: 'Current User',
            badge: 'bronze' as const,
          },
          content: commentText,
          date: new Date().toISOString(),
          likes: 0,
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-[#3498DB] hover:bg-[#3498DB]/90">
          New Post
        </Button>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <ForumPostComponent 
              key={post.id}
              post={post}
              onLikePost={handleLikePost}
              onLikeComment={handleLikeComment}
              onAddComment={handleAddComment}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No discussions found. Be the first to start a conversation!
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionsTab;
