export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function getYouTubeThumbnail(url: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string {
  const videoId = getYouTubeVideoId(url);
  
  if (!videoId) {
    return '/api/placeholder/640/360';
  }

  const qualityMap = {
    'default': 'default',
    'mq': 'mqdefault',
    'hq': 'hqdefault',
    'sd': 'sddefault',
    'maxres': 'maxresdefault',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}
