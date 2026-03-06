import type { NewsItem, SourceID } from "@shared/types"

export interface RSSInfo {
  title: string
  description: string
  link: string
  image: string
  updatedTime: string
  items: RSSItem[]
}
export interface RSSItem {
  title: string
  description: string
  link: string
  created?: string
}

export interface ParsedRSSItem extends RSSItem {
  id?: string
  author?: string
  category?: string | string[]
  content?: string
  enclosures?: any[]
  media?: Record<string, any>
  content_encoded?: string
  podcast_transcript?: string
  itunes_summary?: string
  itunes_author?: string
  itunes_explicit?: string
  itunes_duration?: string
  itunes_season?: string
  itunes_episode?: string
  itunes_episodeType?: string
  itunes_image?: string
  [key: string]: any
}

export interface CacheInfo {
  id: SourceID
  items: NewsItem[]
  updated: number
}

export interface CacheRow {
  id: SourceID
  data: string
  updated: number
}

export interface RSSHubInfo {
  title: string
  home_page_url: string
  description: string
  items: RSSHubItem[]
}

export interface RSSHubItem {
  id: string
  url: string
  title: string
  content_html: string
  date_published: string
}

export interface UserInfo {
  id: string
  email: string
  type: "github"
  data: string
  created: number
  updated: number
}

export interface RSSHubOption {
  // default: true
  sorted?: boolean
  // default: 20
  limit?: number
}

export interface SourceOption {
  // default: false
  hiddenDate?: boolean
}

export type SourceGetter = () => Promise<NewsItem[]>
