import { getVideoItems } from "@/services/videos"
import { useQuery } from "@tanstack/react-query"

export function useVideos() {
  const { data, isLoading } = useQuery({ queryKey: ['videos'], queryFn: getVideoItems })

  return { videos: data, isLoading };
}
