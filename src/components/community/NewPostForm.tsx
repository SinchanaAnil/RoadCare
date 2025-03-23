
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { ForumPost } from '@/types';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface NewPostFormProps {
  onAddPost: (post: ForumPost) => void;
}

const NewPostForm = ({ onAddPost }: NewPostFormProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your post",
        variant: "destructive",
      });
      return;
    }

    // Create new post
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      location: location || 'Not specified',
      date: new Date().toISOString(),
      author: {
        id: user?.id || 'guest',
        name: user?.name || 'Anonymous User',
        badge: 'bronze',
      },
      likes: 0,
      comments: []
    };

    onAddPost(newPost);
    
    // Clear form and close dialog
    setTitle('');
    setContent('');
    setLocation('');
    setOpen(false);
    
    toast({
      title: "Post created",
      description: "Your post has been successfully published",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3498DB] hover:bg-[#3498DB]/90">
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Share your concerns or questions about road issues in your area
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="post-title" className="text-sm font-medium">Title</label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question or concern about?"
              className="w-full"
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="post-content" className="text-sm font-medium">Content</label>
            <Textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your issue or question in detail..."
              className="min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="post-location" className="text-sm font-medium">Location (Optional)</label>
            <Input
              id="post-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. MG Road, Indiranagar, etc."
              className="w-full"
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#3498DB] hover:bg-[#3498DB]/90">
              Publish Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostForm;
