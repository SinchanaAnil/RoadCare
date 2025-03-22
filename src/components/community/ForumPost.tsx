
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ThumbsUp,
  Send,
  User,
  MapPin,
} from 'lucide-react';
import { ForumPost, ForumComment, BadgeType } from '@/types';

interface ForumPostProps {
  post: ForumPost;
  onLikePost: (postId: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

const getBadgeColorClass = (badge: BadgeType) => {
  switch (badge) {
    case 'platinum':
      return 'bg-slate-300 text-slate-900';
    case 'gold':
      return 'bg-amber-400 text-amber-900';
    case 'silver':
      return 'bg-gray-300 text-gray-800';
    case 'bronze':
      return 'bg-amber-700 text-amber-50';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const ForumPostComponent = ({ post, onLikePost, onLikeComment, onAddComment }: ForumPostProps) => {
  const [commentText, setCommentText] = useState('');
  const [selectedPost, setSelectedPost] = useState<boolean>(false);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <Card key={post.id} className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#3498DB]/10 flex items-center justify-center">
            <User className="h-5 w-5 text-[#3498DB]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.author.name}</span>
              {post.author.badge && (
                <Badge 
                  className={`text-xs ${getBadgeColorClass(post.author.badge)}`}
                >
                  {post.author.badge.charAt(0).toUpperCase() + post.author.badge.slice(1)}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-[#3498DB]"
            onClick={() => onLikePost(post.id)}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {post.likes}
          </Button>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
      <p className="text-sm mb-3">{post.content}</p>
      
      {post.location && (
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{post.location}</span>
        </div>
      )}
      
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <img 
            src={post.images[0]} 
            alt={post.title}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">
            Comments ({post.comments.length})
          </h4>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => setSelectedPost(!selectedPost)}
          >
            {selectedPost ? 'Hide Comments' : 'View All Comments'}
          </Button>
        </div>
        
        {selectedPost && post.comments.length > 0 && (
          <div className="space-y-3 mb-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-[#F4F4F4] p-3 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{comment.author.name}</span>
                    {comment.author.badge && (
                      <Badge 
                        className={`text-xs ${getBadgeColorClass(comment.author.badge)}`}
                      >
                        {comment.author.badge.charAt(0).toUpperCase() + comment.author.badge.slice(1)}
                      </Badge>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-[#3498DB]"
                    onClick={() => onLikeComment(post.id, comment.id)}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span className="ml-1 text-xs">{comment.likes}</span>
                  </Button>
                </div>
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(comment.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <Input 
            placeholder="Add a comment..." 
            className="text-sm"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
          />
          <Button 
            size="icon" 
            className="bg-[#3498DB] hover:bg-[#3498DB]/90"
            onClick={handleAddComment}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ForumPostComponent;
export { getBadgeColorClass };
