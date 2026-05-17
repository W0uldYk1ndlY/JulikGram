import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ExternalLink } from 'lucide-react';
import { mockCandidates, mockAds } from '../data';
import { useState, useMemo } from 'react';

export default function Feed() {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  // Flatten posts from all candidates into a single feed, insert ads
  const feedItems = useMemo(() => {
    const posts = mockCandidates.flatMap(candidate => 
      candidate.posts.map(post => ({ type: 'post' as const, data: { ...post, candidate } }))
    ).sort(() => Math.random() - 0.5);

    // Insert ads into random places
    const ads = mockAds.map(ad => ({ type: 'ad' as const, data: ad }));
    
    // Insert Ad 1 after 2nd post
    if (posts.length > 2) posts.splice(2, 0, ads[0]);
    // Insert Ad 2 after 5th item
    if (posts.length > 5) posts.splice(5, 0, ads[1]);

    return posts;
  }, []);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  return (
    <div className="pb-8">
      {/* Stories mock */}
      <div className="flex gap-4 p-4 overflow-x-auto border-b border-gray-100 scrollbar-hide">
        {mockCandidates.map(candidate => (
          <div key={candidate.id} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => navigate(`/profile/${candidate.id}`)}>
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
              <img src={candidate.avatarUrl} alt={candidate.username} className="w-full h-full rounded-full object-cover border-2 border-white" />
            </div>
            <span className="text-[10px] truncate w-16 text-center">{candidate.username}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 pt-4">
        {feedItems.map((item, idx) => {
          if (item.type === 'ad') {
            const ad = item.data;
            return (
              <article key={`ad-${ad.id}`} className="bg-white border-y border-gray-100 py-2">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase font-bold text-gray-400">Рекламная запись</span>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden group">
                  <img src={ad.imageUrl} alt="ad" className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-blue-600">{ad.sponsorInfo}</span>
                  </div>
                  <p className="text-sm mb-3">{ad.text}</p>
                  <button className="w-full bg-blue-50 text-blue-600 font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-100">
                    <ExternalLink className="w-4 h-4" />
                    {ad.actionText}
                  </button>
                </div>
              </article>
            )
          }

          const post = item.data;
          const isLiked = likedPosts.has(post.id);
          return (
            <article key={post.id} className="bg-white">
              {/* Post Header */}
              <div className="flex items-center justify-between p-3">
                <div 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => navigate(`/profile/${post.candidate.id}`)}
                >
                  <img src={post.candidate.avatarUrl} alt={post.candidate.username} className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-semibold text-sm group-hover:text-gray-500">{post.candidate.username}</span>
                </div>
                <button className="text-gray-500"><MoreHorizontal className="w-5 h-5" /></button>
              </div>

              {/* Post Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden group">
                <img src={post.imageUrl} alt="post" className="w-full h-full object-cover" />
                
                {/* Visual joke "hint" for the friend (Security Officer) */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-red-500/90 text-white text-xs p-2 rounded inline-block font-mono font-bold animate-pulse">
                    ⚠️ СБ АНАЛИЗ: Обратите внимание на детали фото и комментарии
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="p-3">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(post.id)}>
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-800" />
                    <Send className="w-6 h-6 text-gray-800" />
                  </div>
                  <Bookmark className="w-6 h-6 text-gray-800" />
                </div>
                
                <p className="font-semibold text-sm mb-1">{post.likes + (isLiked ? 1 : 0)} лайков</p>
                
                <p className="text-sm mb-2">
                  <span className="font-semibold mr-2">{post.candidate.username}</span>
                  {post.caption}
                </p>

                {/* Comments */}
                <div className="space-y-1">
                  {post.comments.map(comment => (
                    <p key={comment.id} className="text-sm">
                      <span className="font-semibold mr-2">{comment.username}</span>
                      {comment.text}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 uppercase">2 часа назад</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
