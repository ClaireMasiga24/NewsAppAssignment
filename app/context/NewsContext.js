'use client'

import { createContext, useState, useEffect } from 'react'

export const NewsContext = createContext()

  const DEMO_ARTICLES = [
    {
      id: 'demo-1',
      title: 'Latest Technology Updates',
      description: 'Stay informed with the newest tech developments',
      url: '#',
      urlToImage: null,
      source: { name: 'Tech News' },
      publishedAt: new Date().toISOString()
    },
    {
      id: 'demo-2', 
      title: 'Business Market Trends',
      description: 'Analysis of current market conditions and forecasts',
      url: '#',
      urlToImage: null,
      source: { name: 'Finance Daily' },
      publishedAt: new Date().toISOString()
    },
    {
      id: 'demo-3',
      title: 'Health and Wellness',
      description: 'Tips for maintaining a healthy lifestyle',
      url: '#',
      urlToImage: null,
      source: { name: 'Wellness Journal' },
      publishedAt: new Date().toISOString()
    }
  ]

export function NewsProvider({ children }) {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    async function fetchNews() {
      try {
        // Try loading from localStorage first
        const cachedNews = localStorage.getItem('cachedNews')
        if (cachedNews) {
          setNews(JSON.parse(cachedNews))
          setLoading(false)
        }

        const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=4811cccd5ef1dff23ef9cbd7e0d8f84f&lang=en`)
        
        if (!response.ok) {
          if (response.status === 403) {
            // If API fails, use demo data but don't throw error
            setNews(DEMO_ARTICLES)
            return
          }
          throw new Error(`News API error: ${response.status}`)
        }

        const data = await response.json()
        const articlesWithIds = (data.articles || []).map((article, index) => ({
          ...article,
          id: `article-${index}`,
          urlToImage: article.image || null,
          description: article.description || article.content?.substring(0, 100) || 'No description available',
          source: { name: article.source?.name || 'Unknown' },
          publishedAt: article.publishedAt || new Date().toISOString(),
          url: article.url || '#'
        }))

        // Cache to localStorage
        localStorage.setItem('cachedNews', JSON.stringify(articlesWithIds))
        setNews(articlesWithIds)
      } catch (error) {
        console.error('News fetch error:', error)
        setNews(DEMO_ARTICLES) // Fallback to demo data
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark', !darkMode)
  }

  const addArticle = (article) => {
    const updatedNews = [article, ...news]
    setNews(updatedNews)
    localStorage.setItem('cachedNews', JSON.stringify(updatedNews))
  }

  const updateArticle = (id, updatedArticle) => {
    const updatedNews = news.map(article => 
      article.id === id ? updatedArticle : article
    )
    setNews(updatedNews)
    localStorage.setItem('cachedNews', JSON.stringify(updatedNews))
  }

  const deleteArticle = (id) => {
    const updatedNews = news.filter(article => article.id !== id)
    setNews(updatedNews)
    localStorage.setItem('cachedNews', JSON.stringify(updatedNews))
  }

  return (
    <NewsContext.Provider value={{ 
      news, 
      loading, 
      error,
      darkMode,
      toggleDarkMode,
      addArticle,
      updateArticle, 
      deleteArticle
    }}>
      {children}
    </NewsContext.Provider>
  )
}
